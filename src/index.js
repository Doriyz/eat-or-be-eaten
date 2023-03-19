import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import Game from './Game';
import Example from './example/Example';

const root = ReactDOM.createRoot(document.getElementById('root'));

const allFishes=[
  {x:500,y:65,speed:5,direction:'ltr',power:3, key:1},
  {x:315,y:455,speed:8,direction:'ltr',power:4, key:2},
  {x:150,y:-3,speed:18,direction:'ltr',power:15, key:3},
  {x:45,y:340,speed:10,direction:'ltr',power:5, key:4},
  {x:380,y:246,speed:18,direction:'rtl',power:20, key:5},
  {x:660,y:130,speed:10,direction:'rtl',power:5, key:6},
  {x:860,y:130,speed:10,direction:'rtl',power:5, key:7},
  {x:1160,y:330,speed:10,direction:'rtl',power:5, key:8},
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
