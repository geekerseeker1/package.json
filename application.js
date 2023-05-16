const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database',
});


app.set('view engine', 'ejs');


app.use(express.urlencoded({ extended: true }));


app.use(express.static('public'));


app.get('/register', (req, res) => {
  res.render('registration');
});


app.post('/register', (req, res) => {
  const { firstname, lastname, username, profilePicture } = req.body;

 
  const sql = 'INSERT INTO users (firstname, lastname, username, profile_picture) VALUES (?, ?, ?, ?)';
  connection.query(sql, [firstname, lastname, username, profilePicture], (err, result) => {
    if (err) throw err;
    res.redirect('/details/' + result.insertId);
  });
});


app.get('/details/:id', (req, res) => {
  const userId = req.params.id;


  const sql = 'SELECT * FROM users WHERE id = ?';
  connection.query(sql, [userId], (err, result) => {
    if (err) throw err;
    const user = result[0];
    res.render('userdetails', { user });
  });
});


app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

  