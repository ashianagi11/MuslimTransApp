import React, {useState} from 'react';
import { googleTranslate } from '../utils/googleTranslate';

const Translation = (props) => { 
  const [transText, setTransText] = useState(''); 
  
  let text = props.data.join(' ');
  let lang = props.lang; 
  
  googleTranslate.translate(text, lang, function(err, translation) {
    setTransText(translation.translatedText);
  });

  return (
      <h1>{transText}</h1>
  )
}

export default Translation; 