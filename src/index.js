import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(document.getElementById('root'));

const allFishes=[
  {x:500,y:65,speed:50,direction:'ltr',power:3, key:1},
  {x:315,y:455,speed:80,direction:'ltr',power:4, key:2},
  {x:150,y:-3,speed:180,direction:'ltr',power:15, key:3},
  {x:1045,y:340,speed:10,direction:'ltr',power:5, key:4},
  {x:380,y:246,speed:18,direction:'rtl',power:4, key:5},
  {x:660,y:130,speed:50,direction:'rtl',power:5, key:6},
  {x:860,y:130,speed:70,direction:'rtl',power:5, key:7},
  {x:1160,y:330,speed:60,direction:'rtl',power:5, key:8},
  {x:160,y:330,speed:40,direction:'rtl',power:5, key:8},
];

root.render(
  <React.StrictMode>
    <App allFishes={allFishes}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
