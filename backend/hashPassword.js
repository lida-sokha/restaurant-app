// hashPassword.js
const bcrypt = require('bcryptjs');

const passwordToHash = 'admin1234';  // The plaintext password you want to hash
const saltRounds = 12;                // Recommended salt rounds for bcrypt

bcrypt.hash(passwordToHash, saltRounds, (err, hash) => {
  if (err) {
    console.error('Error hashing password:', err);
    return;
  }
  console.log('Hashed password:', hash);
});
