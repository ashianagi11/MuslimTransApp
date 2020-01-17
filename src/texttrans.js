import React from 'react'; 
import axios from 'axios'; 

class TextTrans extends React.Component {
    constructor(props) {
        super(props); 
        this.state= {
            selectedLang: props.lang,
            translatedText: ''
        }; 
    }

    //as soon as this comp is launched, this will call the fetchTrans function with the input selected lang.
    async componentDidMount() {
        this.fetchTranslation(this.state.selectedLang); 
    }
    
    fetchTranslation = async lang => {
        try {
            const res = await axios.get(`/${lang}`); 
            console.log(res.data); 
            this.setState({
                translatedText: res.data
            }); 
        } catch(err) {
            console.log(err); 
        }
    }; 
    
    render() {
        return (
            <div>
                {this.state.translatedText}
            </div>
        )
    }
}

export default TextTrans; 