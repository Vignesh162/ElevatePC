// -- ENUM for role
// CREATE TYPE user_role AS ENUM ('user', 'admin');

// CREATE TABLE users (
//     id SERIAL PRIMARY KEY,
//     name VARCHAR(100) NOT NULL,
//     email VARCHAR(150) UNIQUE NOT NULL,
//     password TEXT NOT NULL,
//     role user_role DEFAULT 'user',
//     cart JSONB DEFAULT '[]'::jsonb,         -- user’s shopping cart
//     saved_items JSONB DEFAULT '[]'::jsonb, -- wishlist or saved items
//     created_at TIMESTAMP DEFAULT NOW()
// );
