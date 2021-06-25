import { Request, Response } from "express";
import { ListUserReceivedComplimentsService } from "../services/ListUserReceivedComplimentsService";
import { ListUserSendComplimentsService } from "../services/ListUserSendComplimentsService";


class ListUserReceivedComplimentsController {
    async handle(request: Request, response: Response) {
        const { user_id} = request;
       
        const listUserReceivedComplimentService = new ListUserReceivedComplimentsService;
        const compliments = await listUserReceivedComplimentService.execute(user_id);

        return response.json(compliments);
    }
}

export { ListUserReceivedComplimentsController };