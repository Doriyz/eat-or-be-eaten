import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import Game from './Game';
import Example from './example/Example';

const root = ReactDOM.createRoot(document.getElementById('root'));

const allFishes=[
  {x:10,y:40,speed:5,direction:'ltr', key:1},
  {x:15,y:30,speed:8,direction:'ltr', key:2},
  {x:5,y:50,speed:25,direction:'ltr', key:2},
  {x:20,y:43,speed:10,direction:'ltr', key:2},
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
