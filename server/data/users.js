import bcrypt from 'bcryptjs';

const users = [
  {
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@zaloza.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    firstName: 'Juan',
    lastName: 'Dela Cruz',
    email: 'jdc@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;
