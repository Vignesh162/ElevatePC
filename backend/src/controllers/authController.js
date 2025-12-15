import pool from "../config/db.js";

export const register = async(req,res) => {
    try {
        // Check if user exists
        const existingUser = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
        if (existingUser.rows.length > 0) {
        return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Insert user
    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, role',
      [name, email, hashedPassword]
    );

    res.json(result.rows[0]);
  } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Registration failed' });
  }
};

export const login = async (req,res) =>{
    try {
    // Fetch user
    const result = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
    const user = result.rows[0];

    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    // Compare password
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: 'Invalid credentials' });

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, role: user.role, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Login failed' });
  }
}

export const getMe = async(req,res)=>{
    router.get('/me', async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'No token provided' });

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Fetch user data
        const result = await pool.query('SELECT id, name, email, role FROM users WHERE id=$1', [decoded.id]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(401).json({ error: 'Invalid token' });
    }
    });
}