import React,{useState} from 'react';
import axios from 'axios'; 

import Texttrans from '../texttrans';
import Speech from '../components/testing2';  

const TranslationPage = (props) => {
    let obj = props.location.aboutProps || {};  
    return (
        <div className="translationPage">
            <div>
                <Texttrans lang={obj.lang}/>   
            </div> 
            <div> 
                <Speech lang={obj.lang}/>
            </div>
        </div>
    )
}

export default TranslationPage; 