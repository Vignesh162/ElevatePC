import pool from "../config/db.js";

/* -------------------- helpers -------------------- */

function deriveCompatibilityStatus(blockers = [], warnings = []) {
  if (blockers.length) return "blocked";
  if (warnings.length) return "warning";
  return "ok";
}

/* -------------------- GET ALL (admin) -------------------- */

export const getAllBuilds = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        b.id AS build_id,
        b.name AS build_name,
        b.user_id,
        b.status AS build_status,

        bc.status AS compatibility_status,
        bc.blockers AS blockers,
        bc.warnings AS warnings,

        bi.category AS component_category,
        p.id AS product_id,
        p.name AS product_name,
        p.price,
        p.images,
        p.details
      FROM builds b
      LEFT JOIN build_compatibility bc ON bc.build_id = b.id
      LEFT JOIN build_items bi ON bi.build_id = b.id
      LEFT JOIN products p ON p.id = bi.product_id
      ORDER BY b.id
    `);

    const map = new Map();

    result.rows.forEach(row => {
      if (!map.has(row.build_id)) {
        map.set(row.build_id, {
          id: row.build_id,
          name: row.build_name,
          user_id: row.user_id,
          status: row.build_status,
          compatibility: {
            status: row.compatibility_status || "ok",
            blockers: row.blockers || [],
            warnings: row.warnings || []
          },
          components: []
        });
      }

      if (row.product_id) {
        map.get(row.build_id).components.push({
          id: row.product_id,
          name: row.product_name,
          category: row.component_category,
          price: row.price,
          images: row.images,
          details: row.details
        });
      }
    });

    res.json(Array.from(map.values()));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

/* -------------------- GET USER BUILDS -------------------- */

export const getUserBuilds = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        b.id AS build_id,
        b.name AS build_name,
        b.status AS build_status,

        bc.status AS compatibility_status,
        bc.blockers AS blockers,
        bc.warnings AS warnings,
        bi.category AS component_category,
        p.id AS product_id,
        p.name AS product_name,
        p.price,
        p.images,
        p.details
      FROM builds b
      LEFT JOIN build_compatibility bc ON bc.build_id = b.id
      LEFT JOIN build_items bi ON bi.build_id = b.id
      LEFT JOIN products p ON p.id = bi.product_id
      WHERE b.user_id = $1
      ORDER BY b.updated_at DESC
    `, [req.user.id]);

    const map = new Map();

    result.rows.forEach(row => {
      if (!map.has(row.build_id)) {
        map.set(row.build_id, {
          id: row.build_id,
          name: row.build_name,
          status: row.build_status,
          compatibility: {
            status: row.compatibility_status || "ok",
            blockers: row.blockers || [],
            warnings: row.warnings || []
          },
          components: []
        });
      }

      if (row.product_id) {
        map.get(row.build_id).components.push({
          id: row.product_id,
          name: row.product_name,
          category: row.component_category,
          price: row.price,
          images: row.images,
          details: row.details
        });
      }
    });

    res.json(Array.from(map.values()));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

/* -------------------- GET BUILD BY ID -------------------- */

export const getBuildById = async (req, res) => {
  try {
    const buildId = Number(req.params.id);
    if (isNaN(buildId)) {
      return res.status(400).json({ error: "Invalid build ID" });
    }

    const result = await pool.query(`
      SELECT
        b.id AS build_id,
        b.name AS build_name,
        b.user_id,
        b.status AS build_status,

        bc.status AS compatibility_status,
        bc.blockers,
        bc.warnings,

        bi.category AS component_category,
        p.id AS product_id,
        p.name AS product_name,
        p.price,
        p.images,
        p.details
      FROM builds b
      LEFT JOIN build_compatibility bc ON bc.build_id = b.id
      LEFT JOIN build_items bi ON bi.build_id = b.id
      LEFT JOIN products p ON p.id = bi.product_id
      WHERE b.id = $1
    `, [buildId]);

    if (!result.rows.length) {
      return res.status(404).json({ error: "Build not found" });
    }

    const first = result.rows[0];

    if (first.user_id !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ error: "Forbidden" });
    }

    const build = {
      id: first.build_id,
      name: first.build_name,
      status: first.build_status,
      components: [],
      compatibility: {
        status: first.compatibility_status || "ok",
        blockers: first.blockers || [],
        warnings: first.warnings || []
      }
    };

    result.rows.forEach(row => {
      if (row.product_id) {
        build.components.push({
          id: row.product_id,
          name: row.product_name,
          category: row.component_category,
          price: row.price,
          images: row.images,
          details: row.details
        });
      }
    });

    res.json(build);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

/* -------------------- CREATE BUILD -------------------- */

export const createBuild = async (req, res) => {
  const client = await pool.connect();
  try {
    const { name, components = [] } = req.body;
    const { blockers = [], warnings = [] } = req.compatibility || {};

    const compatibilityStatus = deriveCompatibilityStatus(blockers, warnings);

    await client.query("BEGIN");

    const buildRes = await client.query(
      `INSERT INTO builds (name, user_id, status)
       VALUES ($1, $2, 'draft')
       RETURNING id`,
      [name, req.user.id]
    );

    const buildId = buildRes.rows[0].id;

    for (const c of components) {
      await client.query(
        `INSERT INTO build_items (build_id, product_id, category)
         VALUES ($1, $2, $3)`,
        [buildId, c.product_id, c.category]
      );
    }

    await client.query(
      `
      INSERT INTO build_compatibility (build_id, status, blockers, warnings)
      VALUES ($1, $2, $3::jsonb, $4::jsonb)
      `,
      [buildId, compatibilityStatus, JSON.stringify(blockers), JSON.stringify(warnings)]
    );

    await client.query("COMMIT");

    res.status(201).json({
      build_id: buildId,
      compatibility: { status: compatibilityStatus, blockers, warnings }
    });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    client.release();
  }
};

/* -------------------- UPDATE BUILD -------------------- */

export const updateBuild = async (req, res) => {
  const client = await pool.connect();
  try {
    const buildId = Number(req.params.id);
    if (isNaN(buildId)) {
      return res.status(400).json({ error: "Invalid build ID" });
    }

    const { name, components = [], status: lifecycleStatus } = req.body;
    const { blockers = [], warnings = [] } = req.compatibility || {};
    const compatibilityStatus = deriveCompatibilityStatus(blockers, warnings);

    await client.query("BEGIN");

    const check = await client.query(
      `SELECT * FROM builds WHERE id = $1`,
      [buildId]
    );

    if (!check.rows.length) {
      return res.status(404).json({ error: "Build not found" });
    }

    const build = check.rows[0];
    if (build.user_id !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ error: "Forbidden" });
    }

    await client.query(
      `
      UPDATE builds
      SET name = COALESCE($1, name),
          status = COALESCE($2, status)
      WHERE id = $3
      `,
      [name, lifecycleStatus, buildId]
    );

    await client.query(`DELETE FROM build_items WHERE build_id = $1`, [buildId]);

    for (const c of components) {
      await client.query(
        `INSERT INTO build_items (build_id, product_id, category)
         VALUES ($1, $2, $3)`,
        [buildId, c.product_id, c.category]
      );
    }
    await client.query(
      `
      INSERT INTO build_compatibility (build_id, status, blockers, warnings)
      VALUES ($1, $2, $3::jsonb, $4::jsonb)
      ON CONFLICT (build_id)
      DO UPDATE SET
        status = EXCLUDED.status,
        blockers = EXCLUDED.blockers,
        warnings = EXCLUDED.warnings,
        calculated_at = NOW()
      `,
      [buildId, compatibilityStatus, JSON.stringify(blockers), JSON.stringify(warnings)]
    );

    await client.query("COMMIT");

    res.json({
      build_id: buildId,
      compatibility: { status: compatibilityStatus, blockers, warnings }
    });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    client.release();
  }
};

// -----------------Update Build Metadata-------------------
export const updateBuildMeta = async (req, res) => {
  try {
    const buildId = parseInt(req.params.id, 10);
    if (isNaN(buildId)) {
      return res.status(400).json({ error: "INVALID_BUILD_ID" });
    }

    const { name, status } = req.body;

    if (!name && !status) {
      return res.status(400).json({
        error: "NO_FIELDS_TO_UPDATE"
      });
    }

    const result = await pool.query(
      `
      UPDATE builds
      SET
        name = COALESCE($1, name),
        status = COALESCE($2, status)
      WHERE id = $3
      RETURNING id, name, status
      `,
      [name, status, buildId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "BUILD_NOT_FOUND" });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
  }
};

/* -------------------- DELETE BUILD -------------------- */

export const deleteBuild = async (req, res) => {
  const client = await pool.connect();
  try {
    const buildId = Number(req.params.id);
    if (isNaN(buildId)) {
      return res.status(400).json({ error: "Invalid build ID" });
    }

    await client.query("BEGIN");

    const check = await client.query(
      `SELECT * FROM builds WHERE id = $1`,
      [buildId]
    );

    if (!check.rows.length) {
      return res.status(404).json({ error: "Build not found" });
    }

    const build = check.rows[0];
    if (build.user_id !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ error: "Forbidden" });
    }

    await client.query(`DELETE FROM build_items WHERE build_id = $1`, [buildId]);
    await client.query(`DELETE FROM build_compatibility WHERE build_id = $1`, [buildId]);
    await client.query(`DELETE FROM builds WHERE id = $1`, [buildId]);

    await client.query("COMMIT");
    res.json({ message: "Build deleted" });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    client.release();
  }
};
