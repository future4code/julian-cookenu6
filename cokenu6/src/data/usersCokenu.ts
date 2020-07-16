import { db } from './dataSetup';
import {IdGenerator} from "../idGenerator/IdGenerator"

const idGenerator = new IdGenerator()

export const userCokenu = 'CokenuUsers'

export const createUser = async(
    email: string,
    name: string,
    password: string
):Promise<void> => {
    const id = idGenerator.generate()

    await db().insert({
        id,
        email,
        name,
        password
    }).into(userCokenu)
};

export const getUserById = async (id: string):Promise<any> => {
    const result = await db()
    .select("*")
    .from(userCokenu)
    .where({id})

    return result[0];
}

export const updateUserCokenu = async(id: string, email?: string, name?: string, password?: string):Promise<void> =>{
    await db().update({
        id,
        email,
        name, 
        password
    })
    .where({ id })
    .into(userCokenu);
};