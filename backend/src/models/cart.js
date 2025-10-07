// CREATE TABLE cart (
//     id SERIAL PRIMARY KEY,
//     user_id INT REFERENCES users(id) ON DELETE CASCADE,
//     created_at TIMESTAMP DEFAULT NOW(),
//     updated_at TIMESTAMP DEFAULT NOW()
// );
// ALTER TABLE cart_items
// ADD CONSTRAINT unique_cart_product UNIQUE (cart_id, product_id);

