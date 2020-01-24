import React from 'react';

import Texttrans from '../texttrans';
import Speech from '../components/Speech';  

const TranslationPage = (props) => {
    let obj = props.location.aboutProps || {};  
    return (
        <div className="translationPage">
            <div className='description'>
                <Texttrans lang={obj.lang}/>   
            </div> 
            <div> 
                <Speech lang={obj.lang}/>
            </div>
        </div>
    )
}

export default TranslationPage; 