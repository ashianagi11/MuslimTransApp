import React, {Component} from 'react'; 
import { Link } from 'react-router-dom';  


class WelcomePage extends Component {
    constructor() {
        super(); 
        this.state = {
            welcomeTexts: ['Welcome', 'أهلا بك','خوش آمدید', 'স্বাগত', 'Soo Dhawow'], 
            textIndex: 0,
            languages: ['en','ar','bn','ur','so'],
            selectedLang: 'en', 
            placeholder: ['Select Your Language','اختر لغتك','اپنی زبان کا انتخاب کریں','আপনার ভাষা নির্বাচন করুন','Dooro Luqaddaada']
        }; 
    }

    //todo: add a dictionary that translates user input "english to en"

    //shuffling function 
    componentDidMount(){
        this.timeout = setInterval(()=> {
            let currIndex = this.state.textIndex; 
            this.setState({ textIndex: currIndex+1})
        }, 3000); 
    }

    //once left the page, shuffling text stops. 
    componentWillUnmount(){
        clearInterval(this.timeout); 
    }

    // updates the state every time user inputs a char
    handleChange = (e) => {
        this.setState({
            selectedLang: e.target.value
        }); 
    }; 

    //stores selected language
    handleEnterKey = (e) => {
        if(e.key === 'Enter') {
            this.setState({
                selectedLang: e.target.selectedLang
            })
        }
        console.log(this.state.selectedLang)
    }

    render() {
        const {welcomeTexts} = this.state; 
        const {placeholder} = this.state; 

        let textChanged = welcomeTexts[this.state.textIndex % welcomeTexts.length];
        let changePlaceHolder = placeholder[this.state.textIndex % placeholder.length];
        return (
            <div>
                <div>
                   <span>{textChanged}</span>
                </div> 
                <div>
                <input 
                    type='text'
                    placeholder={changePlaceHolder}
                    selectedLang={this.state.selectedLang}
                    onChange={this.handleChange}
                    onKeyDown={(e) => this.handleEnterKey(e)}
                />
                </div>
                <Link to ={{
                        pathname: '/translate', 
                        aboutProps: {
                            temp: 'hello',
                            lang: this.state.selectedLang
                        }
                }}> Start! </Link>
            </div>
        )
    }
}

export default WelcomePage; 