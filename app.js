const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');

const app = express();

// Veritabanı bağlantısı:
mongoose.connect(config.db);
const mngConn = mongoose.connection;
mngConn.on('error', console.error.bind(console, 'connection error: '));
mngConn.once('open', function (){
	console.log('Veritabanına bağlanıldı');
});

// Router:
app.get('/', (req, res) => {
	res.send('Merhaba dünyalılar!');
});






// Server'ı başlat:
const port =  process.env.PORT || 3000;
app.listen(port, () => console.log(`Server şu portta çalışıyor: ${port}`));