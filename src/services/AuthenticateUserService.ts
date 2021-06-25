import { getCustomRepository } from 'typeorm';
import { UserRepositories } from '../repositories/UserRepositories';
import { compare } from "bcryptjs";
import { sign } from 'jsonwebtoken';

interface IAuthenticateUserService {
    email: string;
    password: string;
}

class AuthenticateUserService {
    async execute({email,password}: IAuthenticateUserService) {
        const userRepositories = getCustomRepository(UserRepositories);

        const user = await userRepositories.findOne({
            email
        });
        if (!user) {
            throw new Error("Email/Password Incorrect")
        }

        const passwordMatch = await compare(password, user.password)
        if (!passwordMatch) {
            throw new Error("Email/Password Incorrect");
        }

        const token  = sign({
            email: user.email
        }, "fb5012b76afa06f6a577fa67af1ca11c", {
            subject: user.id,
            expiresIn: "1d"
        });

        return token;
    }

}

export {AuthenticateUserService};