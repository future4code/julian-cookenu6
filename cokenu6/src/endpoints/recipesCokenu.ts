import { Request, Response } from 'express';
import { usersCokenu } from '../data/usersCokenu';
import { IdGenerator } from '../services/IdGenerator';
import { Authenticator } from '../services/Authenticator';
import moment from "moment"
import {recipesCokenu} from "../data/recipesCokenu"


export const createRecipeEndpoint = async (req: Request, res: Response) => {
    try {
        
        const token = req.headers.authorization as string;
  
        const authenticator = new Authenticator();
        const authenticationData = authenticator.getData(token);

      if (!req.body.title || !req.body.description) {
        throw new Error("Parâmetros inválidos");
      }

      const date = moment(moment.now(), "DD/MM/YYYY");
  
      const recipeData = {
        title: req.body.title,
        description: req.body.description,
      };
  
      const idGenerator = new IdGenerator();
      const id = idGenerator.generate();
  
      const recipesDb = new recipesCokenu()
      await recipesDb.createRecipe(id, recipeData.title, recipeData.description, date);

      res.status(200).send();

    } catch (err) {
      res.status(400).send({
        message: err.message,
      });
    }
}      