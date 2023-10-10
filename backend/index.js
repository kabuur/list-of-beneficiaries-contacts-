//importing express freamwork
const express = require ('express');
// importing contacts data json
const  contacts = require( "./contacts.json");
// importing core middleware
const  cors  = require ('cors')

//port of the server
const port = 9000
const app = express();
//midewares
app.use(express.json())
app.use(cors())


// Api Displaying All Contacts
app.get('/contacts', (req, res) => {
    res.json(contacts)
});


// listenig port
app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})