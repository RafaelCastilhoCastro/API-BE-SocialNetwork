import { UserData } from "../data/UserData"
import { User } from "../model/User"
import { createUserDTO } from "../model/userDTO"
import { generateId } from "../services/idGenerator"
import {
    EmailNotProvided, InvalidEmail,
    NameNotProvided, PasswordNotProvided
} from "../error/UserError"
import { CustomError } from "../error/CustomError"

export class UserBusiness {
    async create(input: createUserDTO): Promise<void> {
        try {
            const { name, email, password } = input

            if (!name) {
                throw new NameNotProvided
            }

            if (!email) {
                throw new EmailNotProvided
            }

            if (!password) {
                throw new PasswordNotProvided
            }

            if (!email.includes('@')) {
                throw new InvalidEmail
            }

            const id = generateId()

            const newUser = new User(
                id,
                name,
                email,
                password
            )

            const userData = new UserData()
            await userData.create(newUser)

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }

    async getUsers(): Promise<User[]> {
        const userData = new UserData()
        return userData.getUsers()
    }
}