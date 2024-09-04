import { DeleteCommand, GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { UserRepository } from "../../../domain/model/user.repository";
import { dynamo, tableNameUsers } from "./config";
import { Util } from "../../../domain/usecase/util";
import { injectable } from "tsyringe";
import { User } from "../../../domain/model/user.schema";

@injectable()
export class UserImplementRepository implements UserRepository {
  constructor(private util: Util) {}

  getUser = async (email: string): Promise<User> => {
    try {
      const query = await dynamo.send(
        new GetCommand({
          TableName: tableNameUsers,
          Key: {
            partitionKey: `USER#${email}`,
            sortKey: "TYPE#USER",
          },
        })
      );
      return {
        email: query.Item?.partitionKey.split("#")[1],
        name: query.Item?.name,
        phone: query.Item?.phone,
        country: query.Item?.country,
        city: query.Item?.city,
        password: query.Item?.password,
        type: query.Item?.sortKey.split("#")[1],
        createdAt: query.Item?.createdAt,
        updatedAt: query.Item?.updatedAt,
      };
    } catch (error: any) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          messageDev: "Problems with connection to database " + error.message,
          messageUser: "Contacte a soporte para más información sobre este error",
        }),
      };
    }
  };

  createUser = async (user: User): Promise<User> => {
    try {
      const createdAt = this.util.getDate();
      await dynamo.send(
        new PutCommand({
          TableName: tableNameUsers,
          Item: {
            partitionKey: `USER#${user.email}`,
            sortKey: `TYPE#${user.type}`,
            name: user.name,
            phone: user.phone,
            country: user.country,
            city: user.city,
            password: user.password,
            createdAt: createdAt,
            updatedAt: "",
          },
        })
      );
      return user;
    } catch (error: any) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          messageDev: "Problems with connection to database " + error.message,
          messageUser: "Contacte a soporte para más información sobre este error",
        }),
      };
    }
  };

  updateUser = async (user: User): Promise<User> => {
    try {
      const updatedAt = this.util.getDate();
      await dynamo.send(
        new PutCommand({
          TableName: tableNameUsers,
          Item: {
            partitionKey: `USER#${user.email}`,
            sortKey: `TYPE#${user.type}`,
            name: user.name,
            phone: user.phone,
            country: user.country,
            city: user.city,
            password: user.password,
            createdAt: user.createdAt,
            updatedAt: updatedAt,
          },
        })
      );
      return {
        ...user,
        updatedAt,
      };
    } catch (error: any) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          messageDev: "Problems with connection to database " + error.message,
          messageUser: "Contacte a soporte para más información sobre este error",
        }),
      };
    }
  };

  deleteUser = async (email: string): Promise<void | { statusCode: number; body: string }> => {
    try {
      await dynamo.send(
        new DeleteCommand({
          TableName: tableNameUsers,
          Key: {
            partitionKey: `USER#${email}`,
            sortKey: "TYPE#USER",
          },
        })
      );
    } catch (error: any) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          messageDev: "Problems with connection to database " + error.message,
          messageUser: "Contacte a soporte para más información sobre este error",
        }),
      };
    }
  };
}
