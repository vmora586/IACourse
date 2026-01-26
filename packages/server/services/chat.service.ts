import OpenAI from "openai";
import fs from "fs";
import path from "path";
import { conversationRepository } from "../repositories/conversation.respository";
import template from "../prompts/chatbot.txt";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

interface ChatResponse {
    id: string;
    message: string;
}

const parkInfo = fs.readFileSync(path.join(__dirname, '..', 'prompts', 'WonderWorld.md'), 'utf-8');
const instructions = template.replace("{{parkInfo}}", parkInfo);

export const chatService = {

    async sendMessage(prompt: string, conversationId: string): Promise<ChatResponse> {
        const response = await client.responses.create({
            model: 'gpt-4.1-nano',
            instructions: instructions,
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