import React, {Component} from 'react'; 
import { Link } from 'react-router-dom';  


class WelcomePage extends Component {
    constructor() {
        super(); 
        this.state = {
            welcomeTexts: ['Welcome', 'أهلا بك','خوش آمدید', 'স্বাগত', 'Soo Dhawow', 'Bienvenido'], 
            textIndex: 0,
            languages: ['en','ar','bn','ur','so', 'es'],
            selectedLang: 'en', 
        }; 
    }

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

    render() {
        const {welcomeTexts} = this.state; 
        let textChanged = welcomeTexts[this.state.textIndex % welcomeTexts.length];

        return (
            <div className="home">
                <div>
                   <h1 id="welcome">{textChanged}</h1>
                </div> 
                <div id="langButtons">
                    <button onClick={()=>this.setState({selectedLang: 'ar'})}>
                        عربى    
                    </button>
                    <button onClick={()=>this.setState({selectedLang: 'ur'})}> 
                        اردو    
                    </button>
                    <button onClick={()=>this.setState({selectedLang: 'bn'})}>
                        বাংলা 
                    </button>
                    <button onClick={()=>this.setState({selectedLang: 'so'})}> 
                        Somali
                    </button>
                    <button onClick={()=>this.setState({selectedLang: 'es'})}> 
                        Espanol 
                    </button>
                </div>
                <Link id="btn-start" to ={{
                        pathname: '/translate', 
                        aboutProps: {
                            temp: 'hello',
                            lang: this.state.selectedLang
                        }
                }}>START</Link>
            </div>
        )
    }
    
}
  
export default WelcomePage; 