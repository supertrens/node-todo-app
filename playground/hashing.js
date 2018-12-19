const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const password = '123abc';
// bcrypt.genSalt(10 , (err , salt) => {
//   bcrypt.hash(password, salt, (err , hash) => {
//     console.log(hash);
//   }) 
// });

const hashedPassword = '$2a$10$5/8Sgg2IESG.6iM3SGuiIuY5ANWO9vznMVb0NjmnRD7x0MSk5jZNC';
// const hashedPassword = '$2a$10$L3qzxJTuc/jF97HVBe.XE.Qg30ME.AByOukePrg9jQeXHTYX1Z6MC';


bcrypt.compare(password, hashedPassword , (err, res) => {
  console.log(res)
});


// const data ={ id: 10};
// const token = jwt.sign(data, '123abc');
// console.log(token);

// const decoded = jwt.verify(token, '123abc');
// console.log(decoded);

// const hash = SHA256('I am user number 3').toString();

// console.log(hash)