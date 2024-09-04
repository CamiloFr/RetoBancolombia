import { inject, injectable } from "tsyringe";
import { APIGatewayProxyEvent } from "aws-lambda";
import { UserController } from "./user.controller";

@injectable()
export class IndexController {
  constructor(@inject("UserController") private userController: UserController) {}
  analyzePath = async (event: APIGatewayProxyEvent) => {
    // must analize the event and return the correct response
    if (event.path.indexOf("/user") >= 0) {
      return await this.userController.analyzePath(event);
    }

    if (event.path.indexOf("/health") >= 0) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          messageDev: "The service is working correctly",
          messageUser: "El servicio está funcionando correctamente",
        }),
      };
    }

    return {
      statusCode: 400,
      body: JSON.stringify({
        messageDev: "The path that you are trying to access does not exist",
        messageUser: "Contacte a soporte para más información sobre este error",
      }),
    };
  };
}
