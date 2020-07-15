const Pdf = require('../models/Pdf');

module.exports = {
  async listAll(request, response) {
    const pdfs = await Pdf.findAll();

    return response.json(pdfs);
  },

  async searchPdf(request, response) {
    const { title, author } = request.body;

    const pdf = Pdf.findOne({
      where: {
        title,
        author
      }
    });

    if(!pdf) {
      response.json({
        message: 'Pdf not found.'
      });
    }

    return response.json(pdf);
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