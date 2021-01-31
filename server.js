const dotenv = require('dotenv');

dotenv.config({
    path: './config.env'
});

process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION!!! shutting down...');
    console.log(err.name, err.message);
    console.log(err)
    process.exit(1);
});

const port = process.env.API_PORT;

const app = require('./app');
app.listen(port, () => {
    console.log(`Application is running on port ${port}`);
});


process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION!!!  shutting down ...');
    console.log(err.name, err.message);
    console.log(err)
    server.close(() => {
        process.exit(1);
    });
});