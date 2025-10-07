import pool from "../config/db.js";

/**
 * Get all builds (admin access)
 */
export const getAllBuilds = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
        b.id AS build_id,
        b.name AS build_name,
        b.user_id,
        b.status,
        bp.category AS component_category,
        p.id AS product_id,
        p.name AS product_name,
        p.price,
        p.images,
        p.details
       FROM builds b
       LEFT JOIN build_products bp ON b.id = bp.build_id
       LEFT JOIN products p ON bp.product_id = p.id
       ORDER BY b.id`
    );

    // Group builds by build_id
    const buildsMap = new Map();
    result.rows.forEach(row => {
      if (!buildsMap.has(row.build_id)) {
        buildsMap.set(row.build_id, {
          id: row.build_id,
          name: row.build_name,
          user_id: row.user_id,
          status: row.status,
          components: []
        });
      }

      if (row.product_id) {
        buildsMap.get(row.build_id).components.push({
          id: row.product_id,
          name: row.product_name,
          price: row.price,
          images: row.images,
          details: row.details,
          category: row.component_category
        });
      }
    });

    const builds = Array.from(buildsMap.values());
    res.status(200).json(builds);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Get builds of logged-in user
 */
export const getUserBuilds = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      `SELECT 
        b.id AS build_id,
        b.name AS build_name,
        b.status,
        b.updated_at,
        bp.category AS component_category,
        p.id AS product_id,
        p.name AS product_name,
        p.price,
        p.images,
        p.details
       FROM builds b
       LEFT JOIN build_products bp ON b.id = bp.build_id
       LEFT JOIN products p ON bp.product_id = p.id
       WHERE b.user_id = $1
       ORDER BY b.updated_at`,
      [userId]
    );

    const buildsMap = new Map();
    result.rows.forEach(row => {
      if (!buildsMap.has(row.build_id)) {
        buildsMap.set(row.build_id, {
          id: row.build_id,
          name: row.build_name,
          status: row.status,
          components: []
        });
      }

      if (row.product_id) {
        buildsMap.get(row.build_id).components.push({
          id: row.product_id,
          name: row.product_name,
          price: row.price,
          images: row.images,
          details: row.details,
          category: row.component_category
        });
      }
    });

    const builds = Array.from(buildsMap.values());
    res.status(200).json(builds);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Get a single build by ID
 */
export const getBuildById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT 
        b.id AS build_id,
        b.name AS build_name,
        b.user_id,
        b.status,
        bp.category AS component_category,
        p.id AS product_id,
        p.name AS product_name,
        p.price,
        p.images,
        p.details
       FROM builds b
       LEFT JOIN build_products bp ON b.id = bp.build_id
       LEFT JOIN products p ON bp.product_id = p.id
       WHERE b.id = $1`,
      [id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ error: "Build not found" });

    const buildMap = {
      id: result.rows[0].build_id,
      name: result.rows[0].build_name,
      user_id: result.rows[0].user_id,
      status: result.rows[0].status,
      components: []
    };

    result.rows.forEach(row => {
      if (row.product_id) {
        buildMap.components.push({
          id: row.product_id,
          name: row.product_name,
          price: row.price,
          images: row.images,
          details: row.details,
          category: row.component_category
        });
      }
    });

    res.status(200).json(buildMap);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Create a new build
 */
export const createBuild = async (req, res) => {
  try {
    const { name, components } = req.body;
    const userId = req.user.id;

    const buildResult = await pool.query(
      `INSERT INTO builds (name, user_id, status)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [name, userId, "draft"]
    );

    const buildId = buildResult.rows[0].id;

    // Insert components into build_products table
    if (components && components.length > 0) {
      const insertPromises = components.map(c =>
        pool.query(
          `INSERT INTO build_products (build_id, product_id, category)
           VALUES ($1, $2, $3)`,
          [buildId, c.product_id, c.category]
        )
      );
      await Promise.all(insertPromises);
    }

    res.status(201).json({ message: "Build created", build_id: buildId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Update a build
 */
export const updateBuild = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, components, status } = req.body;

    const result = await pool.query(
      `UPDATE builds
       SET name = COALESCE($1, name),
           status = COALESCE($2, status)
       WHERE id = $3
       RETURNING *`,
      [name, status, id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ error: "Build not found" });

    // Update components if provided
    if (components && components.length > 0) {
      // Delete existing components
      await pool.query(`DELETE FROM build_products WHERE build_id = $1`, [id]);

      // Insert new components
      const insertPromises = components.map(c =>
        pool.query(
          `INSERT INTO build_products (build_id, product_id, category)
           VALUES ($1, $2, $3)`,
          [id, c.product_id, c.category]
        )
      );
      await Promise.all(insertPromises);
    }

    res.status(200).json({ message: "Build updated", build: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Delete a build
 */
export const deleteBuild = async (req, res) => {
  try {
    const { id } = req.params;

    // Delete related build_products first
    await pool.query(`DELETE FROM build_products WHERE build_id = $1`, [id]);

    const result = await pool.query(`DELETE FROM builds WHERE id = $1 RETURNING *`, [id]);

    if (result.rows.length === 0)
      return res.status(404).json({ error: "Build not found" });

    res.status(200).json({ message: "Build deleted", build: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
