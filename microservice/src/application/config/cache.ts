import { container } from "tsyringe";
import { UserController } from "../../infrastructure/entry-points/controllers/user.controller";
import { UserImplementUseCase } from "../../domain/usecase/user.usecase.implement";
import { IndexController } from "../../infrastructure/entry-points/controllers/index.controller";
import { UserImplementRepository } from "../../infrastructure/driven-adapters/dynamoDB/user.repository.implement";

container.register("UserRepository", UserImplementRepository);
container.register("UserUseCase", UserImplementUseCase);
container.register("UserController", UserController);
container.register("IndexController", IndexController);

export const cache = container;