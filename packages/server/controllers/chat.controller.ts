import z from "zod";
import type { Request, Response } from 'express';
import { chatService } from "../services/chat.service";

const chatSchema = z.object({
    prompt: z.string()
        .trim()
        .min(1, "Prompt is required")
        .max(1000, "The prompt is too long"),
    conversationId: z.uuid(),
});

export const chatController = {
    async sendMessage(req: Request, resp: Response) {
        const parsedInput = chatSchema.safeParse(req.body); //validate the incoming input

        if (!parsedInput.success) {
            return resp.status(400).json({
                message: 'Invalid request body',
                errors: parsedInput.error.issues,
            });
        }
        try {
            const { prompt, conversationId } = req.body; //this is not gonna work unless we tell 'express server' to automatically parse json body from the request. Let's add a middleware
            const response = await chatService.sendMessage(prompt, conversationId);
            resp.json({ message: response.message, conversationId: conversationId }); // send the response to the client
        } catch (error) {
            resp.status(500).json("Unable to generate a response");
        }
    }
}