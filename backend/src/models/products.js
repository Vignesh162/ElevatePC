// CREATE TABLE products (
//     id SERIAL PRIMARY KEY,
//     name VARCHAR(200) NOT NULL,
//     price NUMERIC(10,2) NOT NULL,
//     images TEXT[] DEFAULT ARRAY[]::TEXT[], -- array of image URLs
//     rating NUMERIC(2,1),                   -- e.g. 4.5
//     reviews INT DEFAULT 0,                 -- number of reviews
//     category VARCHAR(50),                  -- CPU, GPU, Monitor, etc.
//     brand VARCHAR(100),
//     details JSONB,                         -- flexible product details/specs
//     created_at TIMESTAMP DEFAULT NOW()
// );
