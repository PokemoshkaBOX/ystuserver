require('dotenv').config(); // Импорт файла .env
const express = require('express'); // Импорт express
const sequelize = require('./db.js'); // Импорт модели базы данных
const models = require('./model/models');
const app = express();
const cors = require('cors');
const router = require('./routes/indexRouter');
const path = require('path');
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')))
app.use('/api', router);

// Подключение к базе данных и запуск сервера
const start = async () => {
    try{
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    }
    catch(e){
        console.log(e)
    }
};

start();
