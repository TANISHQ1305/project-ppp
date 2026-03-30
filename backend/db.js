const mysql = require('mysql2');

// Configure the database connection pool
// Note: We use a connection pool to manage multiple connections efficiently
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root', // As requested
    password: 'tanishq', // Ensure this matches your local MySQL config
    database: 'portfolio_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Convert the pool interface to use Promises for cleaner async/await
const promisePool = pool.promise();

// Initial connection test
promisePool.getConnection()
    .then(connection => {
        console.log('Successfully connected to the MySQL database.');
        connection.release();
    })
    .catch(err => {
        console.error('Error connecting to the database. Ensure MySQL is running and credentials are correct.');
        console.error('Error details:', err.message);
    });

module.exports = promisePool;
