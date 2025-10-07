// CREATE TABLE builds (
//     id SERIAL PRIMARY KEY,
//     user_id INT REFERENCES users(id) ON DELETE CASCADE,
//     name VARCHAR(150) NOT NULL,
//     status build_status DEFAULT 'draft',
//     created_at TIMESTAMP DEFAULT NOW(),
//     updated_at TIMESTAMP DEFAULT NOW()
// );
