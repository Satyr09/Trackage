import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import styles from '../public/style.css'



if(typeof window !== 'undefined'){
ReactDOM.render(
  <App testProp={[]} />,
  document.getElementById('root')


);}