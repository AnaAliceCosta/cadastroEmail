const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
app.use(bodyParser());


const rotas = require('../app/rotas/rotas');
rotas(app);

module.exports = app;