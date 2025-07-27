const { User } = require('./models'); // adjust path if needed
const bcrypt = require('bcrypt');
async function createAdminUser() {
  try {
    const hashedPassword = await bcrypt.hash('admin1234', 12); // use a secure password

    const adminUser = await User.create({
      email: 'admin@gmail.com',
      password_hash: hashedPassword,
      first_name: 'Admin',
      last_name: 'User',
      phone: '987654321',
      is_admin: true
    });

    console.log('Admin user created:', adminUser.email);
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
}

createAdminUser();
