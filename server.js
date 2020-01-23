const express = require('express'); 
const app = express(); 
const port = 4001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const {Translate} = require('@google-cloud/translate').v2;  
let text = 'Thank you for using our application. Please click \'translate\' when you are ready to start recording speaker'; 

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
app.get('/:lang', async (req,res) => {
    const results = await translateText(text, req.params.lang); 
    res.send(results); 
}); 

app.get('/:trans', async (req,res) => {
    trans = req.params.trans;
    const results = await translation(trans, 'ar');
    res.send(results); 
}) 

app.listen(port, () => 
console.log(`Hello world app listening on port ${port}!`)
);
