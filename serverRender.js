import config from './config';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import fetch from 'isomorphic-fetch';
import App from './src/components/App';

const serverRender=() =>
  fetch('http://localhost:7010/api/getDbData')
    .then(response=>response.json())
    .then(data=>{
      return ReactDOMServer.renderToString(
        <App  testProp={data}/>)})
    .catch(error=>console.log('Error in SSR:'+error));


export default serverRender;
