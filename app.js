const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const jwt = require('jsonwebtoken')
const routesNavigation = require('./src/routesNavigation')

const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header(
        'Access-Control-Allow-Origin', 
        'Origin, X-Request-With, Content-Type, Accept, Authorization'
    );
    next();
});
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use("/", routesNavigation);

app.get('*', (request, response) => {
    response.status(404).send('path not found!');
});

// app.post('/login', verifyToken, (req, res) => {
//     jwt.verify(req.token, 'secretkey', (err, authData) => {
//         if(err) {
//             res.sendStatus(403);
//         } else {
//             res.json({
//                 message: 'Post created...',
//                 authData
//             });
//         }
//     });
// });

// app.post('/login', (req, res) => {
//     const user = {
//         id:
//         email:
//     }
    
//     jwt.sign({user},'secretkey', {expiresIn: '60s'}, (err, token)
//     =>{
//         res.json({
//             token
//         });
//     });
// });
// authorization: Bearer <access_token>

// verify token
// function verifyToken(req, res, next) {
//     // get auth header value
//     const bearerHeader = req.header['authorization'];
//     // check if bearer is undefined
//     if(typeof bearerHeader !== 'undefined') {
//         // split at the space
//         const bearer = bearerHeader.split(' ');
//         // get token from array
//         const bearerToken = bearer[1];
//         // set the token
//         req.token = bearerToken;
//         // next middleware
//         next();
//     } else {
//         // forbidden
//         res.sendStatus(403)
//     }
// }

app.listen(3000, () => {
    console.log(`Express is listening on port 3000`);
});