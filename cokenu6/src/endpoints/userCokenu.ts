import { Request, Response } from 'express';
import { createUser, getUserById, updateUserCokenu } from '../data/usersCokenu';


export const createUserCokenuEndpoint = async(
    req: Request,
    res: Response
):Promise<void> => {
    try{

        if(
            !req.body.email || !req.body.name || !req.body.password
        ){
            throw new Error("Parâmetros inválidos")
        }
        await createUser(
            req.body.email,
            req.body.name,
            req.body.password
            
        )

        res.sendStatus(200);
    } catch (err){
        res.status(400).send({
            message: err.message
        })
    }
}

export const getUserByIdEndpoint = async (
    req: Request,
    res: Response
) => {
    try {
        const id = req.params.id

        const user = await getUserById(id);
        
        if(!user) {
            throw new Error("Usuário não encontrado")
        }

        res.status(200).send({
            id:user.id,
            name: user.name
        })
    } catch (err){
        res.status(400).send({
            message:err.message
        })
    }
}

export const updateUserEndpoint = async (req: Request, res: Response) => {
    try {
        if(req.body.email === "" || req.body.name === "" || req.body.password === "" || !req.body.id) {
            
            throw new Error("Parâmtros inválidos");
        }
        
        await updateUserCokenu (
            req.body.email,
            req.body.name,
            req.body.password
        )

        res.sendStatus(200);
     
    }   catch (err) {
        res.status(400).send({
            message: err.message,
        })
    }
}