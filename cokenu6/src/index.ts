import dotenv from 'dotenv';
import express from 'express';
import { createUserCokenuEndpoint, loginEndpoint, getUserEndpoint, getOtherUserEndpoint } from './endpoints/userCokenu';
import { createRecipeEndpoint } from './endpoints/recipesCokenu';
import { IdGenerator } from './services/IdGenerator';
import { profile } from 'console';

const idGenerator = new IdGenerator();
const id = idGenerator.generate();

dotenv.config();

const app = express();

app.use(express.json());

app.post('/signup', createUserCokenuEndpoint );

app.post('/login', loginEndpoint );

app.get('/user/profile', getUserEndpoint );

app.get('/user/:id', getOtherUserEndpoint);

app.post('/recipe', createRecipeEndpoint );


const server = app.listen('3000', () =>{
    if (server) {
        console.log('Server running on http://localhost:3000')
    } else {
        console.log('Failuure on running server')
    }
});

