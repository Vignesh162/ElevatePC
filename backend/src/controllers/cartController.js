import pool from "../config/db.js";

export const getCart = async (req, res) => {
    const userId = req.user.id;
    if (!userId || isNaN(userId)) {
        return res.status(400).json({ error: "Invalid user ID" });
    }

    try {
        // Ensure user has a cart
        let cartRes = await pool.query("SELECT id FROM cart WHERE user_id = $1", [userId]);
        let cartId;

        if (cartRes.rows.length === 0) {
            // create new cart for user
            cartRes = await pool.query(
                "INSERT INTO cart (user_id) VALUES ($1) RETURNING id",
                [userId]
            );
        }

        cartId = cartRes.rows[0].id;

        // Get cart items with product details
        const itemsRes = await pool.query(
            `SELECT ci.product_id, ci.quantity,
                p.name, p.price, p.images, p.brand, p.category
        FROM cart_items ci
        JOIN products p ON ci.product_id = p.id
        WHERE ci.cart_id = $1`,
            [cartId]
        );

        const items = itemsRes.rows;
        const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

        res.json({ cartId, cart: items, total });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const updateCart = async (req, res) => {
    const { cartItems } = req.body; // [{ product_id, quantity }]
    const userId = req.user.id;

    if (!userId || isNaN(userId)) {
        return res.status(400).json({ error: "Invalid user ID" });
    }

    try {
        // Ensure user has a cart
        let cartRes = await pool.query("SELECT id FROM cart WHERE user_id = $1", [userId]);
        let cartId;
        if (cartRes.rows.length === 0) {
            cartRes = await pool.query("INSERT INTO cart (user_id) VALUES ($1) RETURNING id", [userId]);
        }
        cartId = cartRes.rows[0].id;

        // Remove items not in request
        const productIds = cartItems.map(i => i.product_id);
        if (productIds.length > 0) {
            await pool.query(
                `DELETE FROM cart_items 
         WHERE cart_id = $1 AND product_id NOT IN (${productIds.map((_, i) => `$${i + 2}`).join(",")})`,
                [cartId, ...productIds]
            );
        } else {
            await pool.query("DELETE FROM cart_items WHERE cart_id = $1", [cartId]);
        }

        // Upsert new items
        for (const item of cartItems) {
            await pool.query(
                `INSERT INTO cart_items (cart_id, product_id, quantity)
         VALUES ($1, $2, $3)
         ON CONFLICT (cart_id, product_id)
         DO UPDATE SET quantity = EXCLUDED.quantity`,
                [cartId, item.product_id, item.quantity]
            );
        }

        res.json({ message: "Cart updated successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const addCartItem = async (req, res) => {
  const { product_id, quantity } = req.body;
  const userId = req.user.id;

  if (!userId || isNaN(userId)) return res.status(400).json({ error: "Invalid user ID" });

  try {
    // Ensure cart exists
    let cartRes = await pool.query("SELECT id FROM cart WHERE user_id = $1", [userId]);
    if (cartRes.rows.length === 0) {
      cartRes = await pool.query("INSERT INTO cart (user_id) VALUES ($1) RETURNING id", [userId]);
    }
    const cartId = cartRes.rows[0].id;

    // Insert or update
    await pool.query(
      `INSERT INTO cart_items (cart_id, product_id, quantity)
       VALUES ($1, $2, $3)
       ON CONFLICT (cart_id, product_id)
       DO UPDATE SET quantity = cart_items.quantity + EXCLUDED.quantity`,
      [cartId, product_id, quantity]
    );

    res.json({ message: "Product added to cart" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}

export const removeCartItem = async (req, res) => {
  const userId = req.user.id;
  const productId = parseInt(req.params.productId, 10);

  if (!userId || isNaN(userId) || !productId || isNaN(productId)) {
    return res.status(400).json({ error: "Invalid ID(s)" });
  }

  try {
    const cartRes = await pool.query("SELECT id FROM cart WHERE user_id = $1", [userId]);
    if (cartRes.rows.length === 0) return res.status(404).json({ error: "Cart not found" });

    const cartId = cartRes.rows[0].id;

    const delRes = await pool.query("DELETE FROM cart_items WHERE cart_id = $1 AND product_id = $2 RETURNING *", [cartId, productId]);

    if (delRes.rows.length === 0) return res.status(404).json({ error: "Product not in cart" });

    res.json({ message: "Product removed from cart" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}

export const funtion_name = async (req, res) => {

}