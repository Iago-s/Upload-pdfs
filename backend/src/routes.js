const express = require('express');

const multer = require('multer');
const multerConfig = require('./config/multer');

const PdfController = require('./controllers/PdfController');

const routes = express.Router();

routes.get('/', PdfController.listAll);
routes.post('/', multer(multerConfig).single('pdf'), PdfController.upload);

module.exports = routes;