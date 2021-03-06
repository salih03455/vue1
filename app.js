const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');

const app = express();

// Routes:
const labels = require('./routes/labels');
const home = require('./routes/home');

// Veritabanı bağlantısı:
mongoose.connect(config.db);
const mngConn = mongoose.connection;
mngConn.on('error', console.error.bind(console, 'connection error: '));
mngConn.once('open', function (){
	console.log('Veritabanına bağlanıldı');
});

// Middleware:
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use('/', home);
app.use('/labels', labels);






// Server'ı başlat:
const port =  process.env.PORT || 3000;
app.listen(port, () => console.log(`Server şu portta çalışıyor: ${port}`));