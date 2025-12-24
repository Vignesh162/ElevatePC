// CREATE TABLE build_products (
//     id SERIAL PRIMARY KEY,
//     build_id INT REFERENCES builds(id) ON DELETE CASCADE,
//     product_id INT REFERENCES products(id) ON DELETE CASCADE,
//     category VARCHAR(50) NOT NULL DEFAULT 'others',   -- e.g. 'cpu', 'gpu', 'ram', 'storage'
//     quantity INT DEFAULT 1,                -- in case multiple RAM sticks, fans, etc.
//     added_at TIMESTAMP DEFAULT NOW(),
//     UNIQUE(build_id, component_type, product_id) -- avoid duplicates
// );
