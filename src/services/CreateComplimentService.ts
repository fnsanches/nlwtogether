import { getCustomRepository } from 'typeorm';
import { ComplimentsRepositories } from '../repositories/ComplimentsRepositories';
import { UserRepositories } from '../repositories/UserRepositories';


interface IComplimenteRequest {
    tag_id: string;
    user_sender: string;
    user_receiver: string;
    message: string;
}

class CreateComplimentService {
    async execute ( { tag_id, user_sender, user_receiver, message} : IComplimenteRequest) {
        const complimenteRepositories = getCustomRepository(ComplimentsRepositories);

        const usersRepositories = getCustomRepository(UserRepositories);

        if(user_sender === user_receiver) {
            throw new Error("Incorrect User Receiver")
        }

        const userReceiverExists = await usersRepositories.findOne(user_receiver);

        if (!userReceiverExists) {
            throw new Error("User Receiver does not exist!");
        }

        const compliment = complimenteRepositories.create({
            tag_id,
            user_receiver,
            user_sender,
            message
        });

        await complimenteRepositories.save(compliment);
        
        return compliment;


    }
}

export { CreateComplimentService };