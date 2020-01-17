import React from 'react';

// import Languages from './languages'; 
import Translation from './translation';
import Texttrans from '../texttrans'; 

const TranslationPage = (props) => {
    let obj = props.location.aboutProps || {}; 
    console.log(obj);
    let lang = obj.lang; 

    function translateLive(lang) {
        console.log(lang, 'button works')
    }

    return (
        <div>
            <div>
                <Texttrans lang={obj.lang}/>   
                <button onClick={()=>translateLive(lang)}>translate</button>
            </div>
            <div> 
                <Translation lang={obj.lang}/>
            </div>
        </div>
    )
}

export default TranslationPage; 