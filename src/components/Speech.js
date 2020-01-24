import React, { Component } from "react"; 

import Translation from './translation';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const recognition = new SpeechRecognition()

recognition.continous = true
recognition.interimResults = true
recognition.lang = 'en-US'

class Speech extends Component {
  constructor(props) {
      super(props)
      this.state = {
        listening: false,
        buttonWord: 'Translate',
        lang: props.lang,
        data: ['Translating...']
      }
      this.toggleListen = this.toggleListen.bind(this)
      this.handleListen = this.handleListen.bind(this)
  }

  toggleListen() {
    if(this.state.buttonWord === 'Translate') {
      this.setState({
        buttonWord: 'Stop Translate'
      })
    } else {
      this.setState({
        buttonWord: 'Translate'
      })
    }
    this.setState({
      listening: !this.state.listening, 
    }, this.handleListen)
  }

  handleListen() {
    console.log('listening?', this.state.listening)
    if (this.state.listening) {
      recognition.start()
      recognition.onend = () => {
        console.log("...continue listening...")
        recognition.start()
      }

    } else {
      recognition.stop()
      recognition.onend = () => {
        console.log("Stopped listening per click")
      }
    }

    recognition.onstart = () => {
      console.log("Listening!")
    }

    let finalTranscript = ''
    recognition.onresult = event => {
      let interimTranscript = ''
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) finalTranscript += transcript + ' ';
        else interimTranscript += transcript;
      }

      const transcriptArr = finalTranscript.split(' ')
      const stopCmd = transcriptArr.slice(-3, -1)
      console.log('stopCmd', stopCmd)
      this.setState({
        data: transcriptArr
      })
      if (stopCmd[0] === 'stop' && stopCmd[1] === 'listening'){
        recognition.stop()
        recognition.onend = () => {
          console.log('Stopped listening per command')
          const finalText = transcriptArr.slice(0, -3).join(' ')
          document.getElementById('final').innerHTML = finalText
        }
      }
    }
    recognition.onerror = event => {
      console.log("Error occurred in recognition: " + event.error)
    }
  }

  render() {
    return (
      <div className="speech">
        <button id='microphone-btn' onClick={this.toggleListen}>{this.state.buttonWord}</button>
        <Translation data={this.state.data} lang={this.state.lang}/>
      </div>
    )
  }
}

export default Speech; 