import knex from "knex"
import { BaseDatabase } from "./BaseDatabase";

export class usersCokenu extends BaseDatabase {
  private tableName = "CokenuUsers";
    
  createUser = async (id: string, email: string, name: string, password: string) => {
    await this.getConnection()
    .insert({
      id,
      email,
      name,
      password,
    })
    .into(this.tableName);
  }
  
  public async getUserByEmail(email: string): Promise<any> {
    const result = await this.getConnection()
      .select("*")
      .from(this.tableName)
      .where({ email });

    return result[0];
  }

  public async getUserById(id: string): Promise<any> {
    const result = await this.getConnection()
      .select("*")
      .from(this.tableName)
      .where({ id });

    return result[0];
  }
}






