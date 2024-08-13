const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const jwtPassword = 'secret';
const app = express();
const z = require('zod');



app.use(bodyParser.json());


const userSchema = z.object({
    username: z.string().email(),
    password: z.string().min(5)
})

const users = [
    {
        id: 1,
        username: "sankalp@gmail.com",
        password: "sankalp",
        name: "Sankalp"
    },
    {
        id: 2,
        username: "aniket@gmail.com",
        password: "aniket",
        name: "Aniket"
    },
    {
        id: 3,
        username: "anmol@gmail.com",
        password: "anmol",
        name: "Anmol"
    },
    {
        id: 4,
        username: "devyani@gmail.com",
        password : "devyani",
        name: "Devyani"
    }
];


function userExists(username, password) {
    //do something
    for(let i = 0; i< users.length; i++){
        if(users[i].username === username && users[i].password === password){
            return true;
        }
    }
    return false;
};


app.get('/', (req, res) => {
    res.send('Hello World');
});


app.post("/signin", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if(!userExists(username, password)) {
        
        return res.status(403).json({
            message: "Invalid username or password"
        });
    }

    let token = jwt.sign({username: username}, jwtPassword);
    return res.json({
        token: token
    });

})

app.get("/users", (req, res) => {
    const token = req.headers.authorization;
    try{
        const decoded = jwt.verify(token, jwtPassword);
        const username = decoded.username;

    }catch{
        return res.status(403).json({
            message: "Invalid token"
        });
    }
})




app.listen(3000, () => {
    console.log('Server is running on port 3000');
});