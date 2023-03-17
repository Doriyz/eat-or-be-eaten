import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import Game from './Game';
import Example from './example/Example';

const root = ReactDOM.createRoot(document.getElementById('root'));

const allFishes=[
  {x:0,y:0,speed:5,direction:'ltr',power:5, key:1},
  {x:80,y:0,speed:8,direction:'ltr',power:15, key:2},
  {x:0,y:5,speed:25,direction:'ltr',power:15, key:3},
  {x:85,y:10,speed:10,direction:'ltr',power:5, key:4},
  {x:10,y:50,speed:10,direction:'rtl',power:5, key:5},
];

root.render(
  <React.StrictMode>
    <App allFishes={allFishes}/>
    {/* <Game/> */}
    {/* <Example/> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
