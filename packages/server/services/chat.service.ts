import OpenAI from "openai";
import { conversationRepository } from "../repositories/conversation.respository";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

interface ChatResponse {
    id: string;
    message: string;
}

export const chatService = {

    async sendMessage(prompt: string, conversationId: string): Promise<ChatResponse> {
        const response = await client.responses.create({
            model: 'gpt-4.1-nano',
            input: prompt,
            temperature: 0.2,
            max_output_tokens: 200,
            previous_response_id: conversationRepository.getConversation(conversationId)
        });

        conversationRepository.addConversation(conversationId, response.id);

        return {
            message: response.output_text,
            id: response.id
        };
    }
}