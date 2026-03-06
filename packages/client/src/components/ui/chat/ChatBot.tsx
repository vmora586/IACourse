import axios from "axios";
import { useRef, useState } from "react";
import TypingIndicator from "./TypingIndicator";
import type { Message } from "./ChatMessage";
import ChatMessage from "./ChatMessage";
import ChatInput, { type ChatFormData } from "./ChatInput";
import popSound  from "@/assets/sounds/pop.mp3";
import notificationSound  from "@/assets/sounds/notification.mp3";

const popAudio = new Audio(popSound);
popAudio.volume = 0.2;

const notificationAudio = new Audio(notificationSound);
notificationAudio.volume = 0.2;

type ChatResponse = {
    message: string;
}

const ChatBot = () => {
    const coversationId = useRef(crypto.randomUUID());
    const [messages, setMessages] = useState<Message[]>([]);
    const [isBotTyping, setIsBotTyping] = useState(false);
    const [error, setError] = useState('');
    

    const onSubmit = async ({ prompt: message }: ChatFormData) => {
        try {
            setError('');
            popAudio.play();
            setIsBotTyping(true);
            setMessages(prev => [...prev, { role: "user", content: message }]);
            
            const { data } = await axios.post<ChatResponse>("http://localhost:5232/api/chat", {
                message,
                conversationId: coversationId.current
            });

            setMessages(prev => [...prev, { role: "bot", content: data.message }]);
            notificationAudio.play();
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