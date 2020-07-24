const Pdf = require('../models/Pdf');

const Op = require('sequelize').Op;

module.exports = {
  async listAll(request, response) {
    const pdfs = await Pdf.findAll();

    return response.json(pdfs);
  },

  async upload(request, response) {
    const { title, author } = request.body;
    const { size, key, url } = request.file;
    
    const pdf = await Pdf.create({
      title, 
      author, 
      size, 
      key, 
      url
    }); 

    console.log('Body', request.body);
    console.log('File', request.file);

    return response.json(pdf);
  }
}