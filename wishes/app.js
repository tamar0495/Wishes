const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const OpenAIAPI = require('openai');
const openai = new OpenAIAPI();

const app = express()
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs');

app.post('/prompts', (req, res) => {

    const runPrompt = async () => {
        const userInput = req.body['options'];
        const prompt =
            f`hi, please write me 3 options for a
        ${userInput.mood} ${userInput.wishType} 
        for ${userInput.person}'s ${userInput.event},
        `;


        const response = await openai.createCompletion({
            
            model: "gpt-3.5-turbo",
            prompt: prompt,
            maxToken: 400
        })
        debugger;
        const parsableResponse = response.data.choices[0];
        console.log('res test:', parsableResponse);
        let parsedResponse;
        try {
            parsedResponse = JSON.parse(parsableResponse)
        }
        catch (error) {
            console.error('error: parsing JSON response: ', error)
            return {};
        }

        return { parsedResponse };

    }
    runPrompt().then(({ parsedResponse }) => {
        if (Object.keys(parsedResponse).length > 0)
            console.log("parse respone", parsedResponse);
        else
        console.log("i dont have response");
    })
})
app.listen(8989, (req, res) => {
    console.log('app running')
});
