import React, { useState, useEffect } from 'react';
//import { Link } from 'react-router-dom';

import { FiSearch, FiDownload, FiUpload } from 'react-icons/fi';
import { FaFilePdf } from 'react-icons/fa';

import api from '../services/api';

import './styles.css'

function WelcomePage() {
  const [pdfs, setPdfs] = useState([]);

  const [title, setTitle] = useState([]);
  const [author, setAuthor] = useState('');

  const [pdf, setPdf] = useState({});

  const styleIcon = {
    color: "red",
    size: 20,
    marginTop: "25%",
    marginLeft: "112px",
    position: "absolute",
    backgroundColor: "transparent",
  }

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
        <input 
          type="search"
          placeholder="Search pdf"
        />  
      </header>

      <hr></hr>

      <ul>
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
            className="upload"
            onChange={e => setPdf(e.target.files[0])}
          />
          <FaFilePdf 
            size={20} 
            style={styleIcon}
          /> 
          <button type="submit"> 
            <FiUpload
              size={20}
              color="red"
            /> 
          </button>
        </form>

        {
          pdfs.length === 0 ? 
            <h1>Não tem nenhum pdf disponivel</h1> :
            pdfs.map(pdf => (
              <li key={pdf.id}>
                <p><span>Titulo: </span>{pdf.title}</p>
                <p><span>Autor: </span>{pdf.author}</p>
                <a 
                  href={pdf.url} 
                  target="_blank" >
                    <FiDownload size={20} />
                </a>
              </li> 
            ))
        }
      </ul>
    </div>
  );
}

export default WelcomePage;