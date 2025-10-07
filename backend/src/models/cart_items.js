// CREATE TABLE cart_items (
//     id SERIAL PRIMARY KEY,
//     cart_id INT REFERENCES cart(id) ON DELETE CASCADE,
//     product_id INT REFERENCES products(id),
//     quantity INT NOT NULL DEFAULT 1,
//     added_at TIMESTAMP DEFAULT NOW()
// );
// ALTER TABLE cart_items
// ADD CONSTRAINT unique_cart_product UNIQUE (cart_id, product_id);
