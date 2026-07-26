import express from 'express';
import bcrypt from 'bcrypt';

import {
  login,
  register,
  getMe } from '../controllers/authController.js';

const router = express.Router();
const SALT_ROUNDS = 10;

// ---------------------
// REGISTER
// ---------------------
router.post('/register', register);

// ---------------------
// LOGIN
// ---------------------
router.post('/login', login);

// ---------------------
// PROTECTED ROUTE 
// ---------------------
router.get('/me', getMe);

export default router;
