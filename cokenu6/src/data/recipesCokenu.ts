import knex from "knex"
import { BaseDatabase } from "./BaseDatabase";
import moment from "moment"

export class recipesCokenu extends BaseDatabase {
    private tableName = "CokenuRecipes";

    createRecipe = async (id: string, title: string, description: string, createdAt: moment.Moment) => {

        await this.getConnection()
        .insert({
          id,
          title,
          description,
        })
        .into(this.tableName);
    }
}