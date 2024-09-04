import { inject, injectable } from "tsyringe";
import { APIGatewayProxyEvent } from "aws-lambda";
import { UserUseCase } from "../../../domain/model/user.usecase";
import { User } from '../../../domain/model/user.schema';
import { headers } from "../../../application/config/headers";

@injectable()
export class UserController {
  constructor(@inject("UserUseCase") private userUseCase: UserUseCase) {}

  // must analize the event and return the correct response
  analyzePath = async (event: APIGatewayProxyEvent) => {
    try{
      if (event.httpMethod === "GET") {
        if (!event.queryStringParameters) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({
              messageDev: "The email is required in query parameters",
              messageUser: "Contacte a soporte para más información sobre este error",
            }),
          };
        }
        if (!event.queryStringParameters.email) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({
              messageDev: "The email is required in query parameters",
              messageUser: "Contacte a soporte para más información sobre este error",
            }),
          };
        }
        const email: string = event.queryStringParameters.email;
        const data = await this.userUseCase.getUser(email);
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(data),
        };
      }
      if (event.httpMethod === "DELETE") {
        if (!event.queryStringParameters) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({
              messageDev: "The email is required",
              messageUser: "Contacte a soporte para más información sobre este error",
            }),
          };
        }
        if (!event.queryStringParameters.email) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({
              messageDev: "The email is required",
              messageUser: "Contacte a soporte para más información sobre este error",
            }),
          };
        }
        const email: string = event.queryStringParameters.email;
        const data = await this.userUseCase.deleteUser(email);
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(data),
        };
      }
      if (event.httpMethod === "POST") {
        const stringData = JSON.parse(event.body!);
        const email: string = stringData.email ? stringData.email : "";
        const userExist = await this.userUseCase.getUser(email);
        if (userExist?.name !== '' && userExist?.name !== undefined) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({
              messageDev: "The user already exist",
              messageUser: "Contacte a soporte para más información sobre este error",
            }),
          }
        }
        const data = await this.userUseCase.createUser(stringData);
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(data),
        };
      }
      if (event.httpMethod === "PUT") {
        const stringData = JSON.parse(event.body!);
        const email: string = stringData.email ? stringData.email : "";
        const userExist = await this.userUseCase.getUser(email);
        if (userExist?.name === '' || userExist?.name === undefined) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({
              messageDev: "The user does not exist",
              messageUser: "Contacte a soporte para más información sobre este error",
            }),
          }
        }
        const userUpdated: User = {
          ...stringData,
          createdAt: userExist.createdAt,
        }
        const data = await this.userUseCase.updateUser(userUpdated);
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(data),
        };
      }
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          messageDev: "The method that you are trying to access does not exist",
          messageUser: "Contacte a soporte para más información sobre este error",
        }),
      };
    } catch (error: any) {
      const errorString = JSON.parse(event.body!);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          messageDev: "Review your body request or path parameters in request and try again " + error.message+ " " + typeof errorString + " " + event.body,
          messageUser: "Contacte a soporte para más información sobre este error",
        }),
      };
    }
  };
}
