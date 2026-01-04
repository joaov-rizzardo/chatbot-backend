import { CreateUserDto } from "src/application/dtos/user/create-user-dto";
import { User } from "../entities/user";

export abstract class UserRepository {
    abstract create(user: CreateUserDto): Promise<User>
    abstract findByEmail(email: string): Promise<User | null>
    abstract findById(id: string): Promise<User | null>
}