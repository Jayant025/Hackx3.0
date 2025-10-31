// backend/services/userService.js
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
// lightweight id generator avoiding extra dependency
function generateId() { return 'u_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2,8); }

const DB_DIR = path.join(__dirname, '..', 'db');
const USERS_FILE = path.join(DB_DIR, 'users.json');

function ensureDb() {
  try {
    if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true });
    if (!fs.existsSync(USERS_FILE)) fs.writeFileSync(USERS_FILE, '[]', 'utf8');
  } catch (err) {
    console.error('Failed to ensure DB files', err);
    throw err;
  }
}

function readUsers() {
  ensureDb();
  try {
    const raw = fs.readFileSync(USERS_FILE, 'utf8');
    return JSON.parse(raw || '[]');
  } catch (err) {
    console.error('readUsers error', err);
    return [];
  }
}

function writeUsers(users) {
  ensureDb();
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf8');
}

function findByEmail(email) {
  const users = readUsers();
  return users.find(u => u.email.toLowerCase() === (email || '').toLowerCase());
}

function createUser({ name, email, password }) {
  const users = readUsers();
  const id = generateId();
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  const user = { id, name: name || '', email, passwordHash: hash, createdAt: new Date().toISOString() };
  users.push(user);
  writeUsers(users);
  return { id: user.id, name: user.name, email: user.email };
}

function verifyPassword(user, password) {
  try {
    return bcrypt.compareSync(password, user.passwordHash);
  } catch (err) {
    return false;
  }
}

module.exports = { findByEmail, createUser, verifyPassword, readUsers };
