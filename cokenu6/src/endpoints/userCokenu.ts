import { Request, Response } from 'express';
import { usersCokenu } from '../data/usersCokenu';
import { IdGenerator } from '../services/IdGenerator';
import { Authenticator } from '../services/Authenticator';


export const createUserCokenuEndpoint = async (req: Request, res: Response) => {
    try {
      
      if (!req.body.email || req.body.email.indexOf("@") === -1) {
        throw new Error("Invalid email");
      }
  
   
      if (!req.body.password || req.body.password.length < 6) {
        throw new Error("Invalid password");
      }
  
      const userData = {
        email: req.body.email,
        name: req.body.name ,
        password: req.body.password
      };
  
      const idGenerator = new IdGenerator();
      const id = idGenerator.generate();
  
      const userDb = new usersCokenu()
      await userDb.createUser(id, userData.email, userData.name, userData.password);
  
      const authenticator = new Authenticator();
      const token = authenticator.generateToken({
        id,
      });
  
      res.status(200).send({
        token,
      });
    } catch (err) {
      res.status(400).send({
        message: err.message,
      });
    }
}

export const loginEndpoint = async (req: Request, res: Response) => {
    try {
      // Item Validação do email
      if (!req.body.email || req.body.email.indexOf("@") === -1) {
        throw new Error("Invalid email");
      }
  
      const userData = {
        email: req.body.email,
        password: req.body.password,
      };
  
      const userDatabase = new usersCokenu();
      const user = await userDatabase.getUserByEmail(userData.email);
  
      if (user.password !== userData.password) {
        throw new Error("Invalid password");
      }
  
      const authenticator = new Authenticator();
      const token = authenticator.generateToken({
        id: user.id,
      });
  
      res.status(200).send({
        token,
      });
    } catch (err) {
      res.status(400).send({
        message: err.message,
      });
    }
  }

    export const getUserEndpoint =  async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization as string;
  
      const authenticator = new Authenticator();
      const authenticationData = authenticator.getData(token);
  
      const userDb = new usersCokenu();
      const user = await userDb.getUserById(authenticationData.id);
  
      res.status(200).send({
        id: user.id,
        name: user.name,
        email: user.email,
  
      });
    } catch (err) {
      res.status(400).send({
        message: err.message,
      });
    }
  };
    
    export const getOtherUserEndpoint =  async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization as string;
  
      const authenticator = new Authenticator();
      const authenticationData = authenticator.getData(token);
  
      const userDb = new usersCokenu();
      const user = await userDb.getUserById(req.params.id);
  
      res.status(200).send({
        id: user.id,
        name: user.name,
        email: user.email,
  
      });
    } catch (err) {
      res.status(400).send({
        message: err.message,
      });
    }
  };

// export const getUserByIdEndpoint = async (
//     req: Request,
//     res: Response
// ) => {
//     try {
//         const id = req.params.id

//         const user = await getUserById(id);
        
//         if(!user) {
//             throw new Error("Usuário não encontrado")
//         }

//         res.status(200).send({
//             id:user.id,
//             name: user.name
//         })
//     } catch (err){
//         res.status(400).send({
//             message:err.message
//         })
//     }
// }

// export const updateUserEndpoint = async (req: Request, res: Response) => {
//     try {
//         if(req.body.email === "" || req.body.name === "" || req.body.password === "" || !req.body.id) {
            
//             throw new Error("Parâmtros inválidos");
//         }
        
//         await updateUserCokenu (
//             req.body.email,
//             req.body.name,
//             req.body.password
//         )

//         res.sendStatus(200);
     
//     }   catch (err) {
//         res.status(400).send({
//             message: err.message,
//         })
//     }
// }