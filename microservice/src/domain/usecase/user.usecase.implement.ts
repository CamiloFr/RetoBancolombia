import { inject, injectable } from "tsyringe";
import { UserUseCase } from "../model/user.usecase";
import { UserRepository } from "../model/user.repository";
import { User } from "../model/user.schema";

@injectable()
export class UserImplementUseCase implements UserUseCase {
  constructor(@inject("UserRepository") private userRepository: UserRepository) {}

  getUser(email: string) {
    return this.userRepository.getUser(email);
  }

  createUser(user: User) {
    return this.userRepository.createUser(user);
  }

  updateUser(user: User) {
    return this.userRepository.updateUser(user);
  }

  deleteUser(email: string) {
    return this.userRepository.deleteUser(email);
  }
}
