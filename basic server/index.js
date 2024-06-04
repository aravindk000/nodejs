const express = require('express');
const app = express();
const port = 4000;

// Set the views directory
app.set('views', './views');

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Route to render the index.ejs template with dynamic data
app.get('/', (req, res) => {
    const name = 'Aravind'; // Replace with your dynamic data source (e.g., database)
    res.render('index', { name }); // Pass the data to the template
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
