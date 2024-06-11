import React from 'react';
import ReactDOM from 'react-dom/client';
import Homepage from './home.jsx';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Homepage />
  </React.StrictMode>
);

Homepage();