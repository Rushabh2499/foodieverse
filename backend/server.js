const express = require('express'),
app = express(),
cors = require('cors'),
mongoose = require('mongoose'),
dadiKeNuske = require('./models/dadiKeNuske.js'),
PORT = 8080;

const dotenv = require('dotenv');
const result = dotenv.config();
if (result.error) {
    throw result.error;
}

app.use(express.json())
app.use(cors());

const uri = "mongodb+srv://root:root@ingredient2recipe.uoh3o.mongodb.net/recipe-app?retryWrites=true&w=majority";
mongoose.connect(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
}).then(() => console.log("Database Connected Successfully"))
.catch(err => console.log(err));;

app.get('/home-remedies',(req,res) => {
dadiKeNuske.find(function(err,dKNFound)
{
    if(err) console.log(err);
    else {
    res.json(dKNFound);
    }
});
});


app.listen(PORT, ()=> console.log(`Listening on port ${PORT}`));