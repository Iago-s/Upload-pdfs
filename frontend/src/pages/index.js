import React, { useState, useEffect } from 'react';
//import { Link } from 'react-router-dom';

import api from '../services/api';

import './styles.css'

function WelcomePage() {
  const [pdfs, setPdfs] = useState([]);

  const [title, setTitle] = useState([]);
  const [author, setAuthor] = useState('');

  const [pdf, setPdf] = useState({});

  useEffect(() => {
    api.get('http://localhost:3333/')
      .then((response) => {
        setPdfs(response.data)
      });
  },[pdfs.id]);

  async function uploadPdf(e) {
    e.preventDefault();

    const data = new FormData();

    data.append('pdf', pdf);

    data.append('title', title);
    data.append('author', author);

    try {
      const response = await api.post('http://localhost:3333/', data);

      console.log(response);
      
      pdfs.push(response.data);

      console.log('pdfs', pdfs);
      alert('Pdf compartilhado com sucesso');
    } catch(err) {
      alert('Erro ao fazer o upload, tente novamente.');
    }
  }

  return (
    <div className="container">

      <header>
        <span>Bem vindo, livros </span>

        <a href="#">Teste</a>
      </header>

      <form onSubmit={uploadPdf}>
        <input 
          placeholder="Titulo do pdf"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input 
          placeholder="Author"
          value={author}
          onChange={e => setAuthor(e.target.value)}
        />
        <input 
          name="pdf"
          type="file"
          onChange={e => setPdf(e.target.files[0])}
        /> 
        <button type="submit">Compartilhar</button>
      </form>
      
      <ul>
        {
          pdfs.length === 0 ? 
            <p>Não tem nenhum pdf disponivel</p> :
            pdfs.map(pdf => (
              <li key={pdf.id}>
                <p>{pdf.title}</p>
                <p>{pdf.author}</p>
                <a 
                  href={pdf.url} 
                  target="_blank" >
                  Baixar
                </a>
              </li> 
            ))
        }
      </ul>
    </div>
  );
}

export default WelcomePage;