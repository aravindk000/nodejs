const express = require('express');
const path = require('path'); // To handle static files
const bodyParser = require('body-parser'); // To parse form data
const mysql = require('mysql'); // For MySQL connection

const app = express();
const port = 4000;

//connect db
const connection = mysql.createConnection({
    host: 'localhost', // Replace with your MySQL host
    user: 'aravindk', // Replace with your MySQL username
    password: 'aravind', // Replace with your MySQL password
    database: 'nodejs' // Replace with your MySQL database name
  });
  
  // Connect to MySQL database
  connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
  });

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Parse form data (URL encoded format)
app.use(bodyParser.urlencoded({ extended: true }));

// Route to render the contact form
app.get('/', (req, res) => {
  res.render('contact');
});

// Route to handle form submission (replace with your email sending logic)
app.post('/send', (req, res) => {
  const { name, email, mobile, message } = req.body;

  // Simulate email sending (replace with actual email sending logic)
  console.log(`Name: ${name}`);
  console.log(`Email: ${email}`);
  console.log(`Mobile: ${mobile}`);
  console.log(`Message: ${message}`);

  // connect mysql db and insert data to db
  const sql = 'INSERT INTO contacts (name, email, mobile, message) VALUES (?, ?, ?, ?)';

    // Insert data into the database
    connection.query(sql, [name, email, mobile, message], (err, result) => {
        if (err) throw err;
    
        // Send success or error message based on insertion status
        res.render('contact', { msg: "form submitted !" }); // Assuming successful insertion
        // res.render('contact', { error: 'Error saving data' }); // If insertion fails
      });


    });

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
