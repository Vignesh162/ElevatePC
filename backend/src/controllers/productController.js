import pool from "../config/db.js"
// export const getAllProducts = async(req,res)=>{
//     try{
//         const result = await pool.query(" SELECT * FROM products");
//         const products = result.rows;
//         if(products.length === 0)return res.status(404).json({ error:"No Products  found!"});
//         return res.status(200).json(products);
//     }catch(err){
//         console.error(err);
//         res.status(500).json({ error:"Internal server error"})
//     }
// };

export const getAllProducts = async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 20, 100);
    const offset = parseInt(req.query.offset) || 0;

    const { category, brand } = req.query;

    const conditions = [];
    const values = [];
    let index = 1;

    if (category) {
      conditions.push(`category = $${index++}`);
      values.push(category);
    }

    if (brand) {
      conditions.push(`brand = $${index++}`);
      values.push(brand);
    }

    const whereClause =
      conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    const productsQuery = `
      SELECT *
      FROM products
      ${whereClause}
      ORDER BY created_at DESC
      LIMIT $${index++}
      OFFSET $${index}
    `;

    values.push(limit, offset);

    const productsResult = await pool.query(productsQuery, values);

    const countQuery = `
      SELECT COUNT(*) AS total
      FROM products
      ${whereClause}
    `;

    const countResult = await pool.query(
      countQuery,
      values.slice(0, values.length - 2)
    );

    res.status(200).json({
      meta: {
        limit,
        offset,
        total: parseInt(countResult.rows[0].total),
        hasMore: offset + limit < countResult.rows[0].total
      },
      products: productsResult.rows
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getProductByID = async(req,res) =>{
    try{
    const productID = parseInt(req.params.id,10);
    if(isNaN(productID) )return res.status(400).json({error:"Invalid product ID"});
    const result = await pool.query(" SELECT * FROM products WHERE id = $1", [productID]);
    const product = result.rows[0];
    return res.status(200).json(product);
    }catch(err){
        console.error(err);
        res.status(500).json({ error: "Internal server error", details: err.message });
    }
};

export const addProduct = async (req, res) => {
    try {
        const { name, price, images = [], rating , category, brand, details } = req.body; // from body
        const result = await pool.query(
            `INSERT INTO products (name, price, images, rating, category, brand, details)
             VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [name, price, images, rating, category, brand, details]
        );
        return res.status(201).json({
            message: "Product added successfully",
            product: result.rows[0],
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error", message: err.message });
    }
};

// Update a product
export const updateProduct = async (req, res) => {
  try {
    const productID = parseInt(req.params.id, 10);
    const { name, price, images, rating, category, brand, details } = req.body;

    if (isNaN(productID)) return res.status(400).json({ error: "Invalid product ID" });

    const result = await pool.query(
      `UPDATE products
       SET name = COALESCE($1, name),
           price = COALESCE($2, price),
           images = COALESCE($3, images),
           rating = COALESCE($4, rating),
           category = COALESCE($5, category),
           brand = COALESCE($6, brand),
           details = COALESCE($7, details)
       WHERE id = $8
       RETURNING *`,
      [name, price, images, rating, category, brand, details, productID]
    );

    if (result.rows.length === 0) return res.status(404).json({ error: "Product not found" });

    res.status(200).json({ message: "Product updated", product: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  try {
    const productID = parseInt(req.params.id, 10);
    if (isNaN(productID)) return res.status(400).json({ error: "Invalid product ID" });

    const result = await pool.query("DELETE FROM products WHERE id = $1 RETURNING *", [productID]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Product not found" });

    res.status(200).json({ message: "Product deleted", product: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};