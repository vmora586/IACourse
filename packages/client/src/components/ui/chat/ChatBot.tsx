import axios from "axios";
import { useRef, useState } from "react";
import TypingIndicator from "./TypingIndicator";
import type { Message } from "./ChatMessage";
import ChatMessage from "./ChatMessage";
import ChatInput, { type ChatFormData } from "./ChatInput";

type ChatResponse = {
    message: string;
}

const ChatBot = () => {
    const coversationId = useRef(crypto.randomUUID());
    const [messages, setMessages] = useState<Message[]>([]);
    const [isBotTyping, setIsBotTyping] = useState(false);
    const [error, setError] = useState('');
    

    const onSubmit = async ({ prompt }: ChatFormData) => {
        try {
            setError('');
            setIsBotTyping(true);
            setMessages(prev => [...prev, { role: "user", content: prompt }]);
            
            const { data } = await axios.post<ChatResponse>("/api/chat", {
                prompt,
                conversationId: coversationId.current
            });

            setMessages(prev => [...prev, { role: "bot", content: data.message }]);
        } catch (error) {
            console.error(error);
            setError("Something went wrong, please try again!!");
        }
        finally {
            setIsBotTyping(false);
        }
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex flex-col flex-1 gap-3 mb-10 overflow-y-auto">
                <ChatMessage messages={messages}/>
                {isBotTyping && <TypingIndicator />}
                {error && <p className="text-red-500">{error}</p>}
            </div>
            <ChatInput onSubmit={onSubmit}/>
        </div>
    )
}

export default ChatBot