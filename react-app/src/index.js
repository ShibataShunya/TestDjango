import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <nav className="navbar fixed-top navbar-expand navbar-light bg-light">
         <ul className="navbar-nav mr-auto" style={{width: "100%"}}>
             <li className="nav-item">
                 <a className="nav-link" href="/">とっぷ</a>
             </li>
             <li className="nav-item">
                 <a className="nav-link" href="/post">ぽすと</a>
             </li>
             <li className="nav-item">
                 <a className="nav-link" href="/goods">ぐっど</a>
             </li>
         </ul>
     </nav>

   <div className='container'>
     <App />
     <div className='my-3 text-center'>
       <span className='font-weight-bold'>
         <a href='/admin/logout?next=/sns/'>
           [ LOGOUT ]
         </a>
       </span>
       <span className='float-start'>
         copyright 2024
       </span>
     </div>
   </div>
</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
