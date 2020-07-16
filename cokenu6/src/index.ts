import dotenv from 'dotenv';
import express from 'express';
import { createUserCokenuEndpoint } from './endpoints/userCokenu';
import { IdGenerator } from './idGenerator/IdGenerator';

const idGenerator = new IdGenerator();
const id = idGenerator.generate();

dotenv.config();

const app = express();

app.use(express.json());

app.post('/signup', createUserCokenuEndpoint )

const server = app.listen('3000', () =>{
    if (server) {
        console.log('Server running on http://localhost:3000')
    } else {
        console.log('Failuure on running server')
    }
});

