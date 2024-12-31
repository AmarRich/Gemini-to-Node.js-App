const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();
// for making api below content 
const express=require('express')
// for data transfer 

const bodyParser = require('body-parser')
const app = express()
app.use(express.json())
app.use(bodyParser.json())

app.get('/',(req,res)=>{
    res.send("Hello World! Gemini")
})

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// const prompt = "WHAT IS THE VALUE OF PIE largest value of pie calculated till now";

const generate = async (prompt) => {
    try {
        const result = await model.generateContent(prompt);
        console.log(result.response.text());
        return result.response.text()
    } catch (err) {
        console.log(err);
    }
}
// generate()

app.get('/api/content', async(req,res)=>{
    try {
        const data =  req.body.question
        const result =  await generate(data)
        res.send({
            "result": result
        })
    } catch (err) {
        res.send("error: "+err)
    }
})

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})