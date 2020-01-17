const express = require('express'); 
const app = express(); 
const port = 4001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const {Translate} = require('@google-cloud/translate').v2; 
let text = 'This text will be translated.'; 

async function translateText(text, target) {
    try {
        const translate = new Translate();
        let [translations] = await translate.translate(text, target);
        translations = Array.isArray(translations) ? translations : [translations];
        let trans = ''; 
        trans += translations; 
        return trans;   
    } catch(err) {
        console.log(err); 
    }
}; 

const recorder = require('node-record-lpcm16');
const speech = require('@google-cloud/speech');

async function transcription() {
    try{
        const client = new speech.SpeechClient();
        const encoding = 'LINEAR16';
        const sampleRateHertz = 16000;
        const languageCode = 'en-US'; 
        
        const request = {
            config: {
            encoding: encoding,
            sampleRateHertz: sampleRateHertz,
            languageCode: languageCode,
        },
        interimResults: false, 
        };

        let transText = '';
        const recognizeStream = client
        .streamingRecognize(request)
        .on('error', console.error) 
        .on('data', data => {
            transText += data.results[0].alternatives[0].transcript; 
            console.log(transText); 
            return transText; 
        });
        
        recorder
            .record({
                sampleRateHertz: sampleRateHertz,
                threshold: 0,
                verbose: false,
                recordProgram: 'rec', 
                silence: '10.0',
            })
            .stream()
            .on('error', console.error)
            .pipe(recognizeStream);
        return transText;         
    }catch(err) {
        console.log(err);
    }
}

app.get('/:lang', async (req,res) => {
    const results = await translateText(text, req.params.lang); 
    res.send(results); 
}); 

app.get('/trans', async (req,res) => {
    const results = await transcription();
    console.log(results); 
    res.send('results'); 
}) 

app.listen(port, () => 
console.log(`Hello world app listening on port ${port}!`)
);
