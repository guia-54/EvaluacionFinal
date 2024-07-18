import React from 'react';
import ReactDOM from 'react-dom';
import Titulo from './Titulo';
import BasePrincipal from './BasePrincipal';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <div className='container mt-4'>
        <Titulo></Titulo>
        <BasePrincipal></BasePrincipal>
    </div>
)
