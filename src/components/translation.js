import React from 'react';
import { googleTranslate } from '../utils/googleTranslate';


const Translation = (props) => { 
  let text = props.data.join(' ');
  let lang = props.lang; 
  let transText = ''; 
  
  googleTranslate.translate(text, lang, function(err, translation) {
    transText = translation.translatedText; 
    console.log(transText);
  });

  return (
    <div>
      <h1>{transText}</h1>
    </div>
  )
}

export default Translation; 