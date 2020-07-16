import React, { useState, useEffect } from 'react';

import api from '../services/api';

function WelcomePage() {
  //const [title, setTitle] = useState('');
  const [pdfs, setPdfs] = useState([]);

  useEffect(() => {
    api.get('http://localhost:3333')
      .then((response) => {
        setPdfs(response.data)
      });
  },[pdfs.id]);

  return (
    <div>
      <ul>
        {
          pdfs.length === 0 ? 
            <p>Não tem nenhum pdf disponivel</p> :
            pdfs.map(pdf => (
              <li key={pdf.id}>
                <p>{pdf.title}</p>
                <p>{pdf.author}</p>
              </li> 
            ))
        }
      </ul>
      
    </div>
  );
}

export default WelcomePage;