const dotenv = require('dotenv');
const mongoose = require('mongoose');

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

const db = process.env.DATABASE
                        .replace('<USER>', process.env.DATABASE_USER)
                        .replace('<PASSWORD>', process.env.DATABASE_PASSWORD)
                        .replace('<HOST>', process.env.DATABASE_HOST)
                        .replace('<PORT>', process.env.DATABASE_PORT);


mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(con => {
    console.log('DB connection Successfully!');
    const app = require('./app');
    app.listen(port, () => {
        console.log(`Application is running on port ${port}`);
    });
});


process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION!!!  shutting down ...');
    console.log(err.name, err.message);
    console.log(err)
    server.close(() => {
        process.exit(1);
    });
});