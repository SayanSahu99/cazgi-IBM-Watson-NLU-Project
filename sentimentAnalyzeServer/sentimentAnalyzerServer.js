const express = require('express');
const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
const app = new express();
const dotenv = require('dotenv');
dotenv.config();

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

let apikey = process.env.API_KEY;
let url = process.env.API_URL;

const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
    version: '2020-08-01',
    authenticator: new IamAuthenticator({
        apikey: apikey,
    }),
    serviceUrl: url,
});


app.get("/url/emotion", (req, res) => {

    const analyzeParams = {
        'url': `${req.query.url}`,
        'features': {
            'emotion': {}
        }
    };

    naturalLanguageUnderstanding.analyze(analyzeParams)
        .then(analysisResults => {
            console.log(JSON.stringify(analysisResults, null, 2));
            return res.send(analysisResults.result.emotion.document.emotion);
        })
        .catch(err => {
            console.log('error:', err);
        });

});

app.get("/url/sentiment", (req, res) => {
    const analyzeParams = {
        'url': `${req.query.url}`,
        'features': {
            'sentiment': {}
        }
    };

    naturalLanguageUnderstanding.analyze(analyzeParams)
        .then(analysisResults => {
            console.log(JSON.stringify(analysisResults, null, 2));
            return res.send(analysisResults.result.sentiment.document.label);
        })
        .catch(err => {
            console.log('error:', err);
        });
});

app.get("/text/emotion", (req, res) => {

    const analyzeParams = {
        'text': `${req.query.text}`,
        'features': {
            'emotion': {}
        }
    };

    naturalLanguageUnderstanding.analyze(analyzeParams)
        .then(analysisResults => {
            console.log(JSON.stringify(analysisResults, null, 2));
            return res.send(analysisResults.result.emotion.document.emotion);
        })
        .catch(err => {
            console.log('error:', err);
        });



});

app.get("/text/sentiment", (req, res) => {
    const analyzeParams = {
        'text': `${req.query.text}`,
        'features': {
            'sentiment': {}
        }
    };

    naturalLanguageUnderstanding.analyze(analyzeParams)
        .then(analysisResults => {
            console.log(JSON.stringify(analysisResults, null, 2));
            return res.send(analysisResults.result.sentiment.document.label);
        })
        .catch(err => {
            console.log('error:', err);
        });
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

