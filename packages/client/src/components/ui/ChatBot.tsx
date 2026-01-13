import { FaArrowUp } from "react-icons/fa";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { Button } from "./button"
import { useForm } from 'react-hook-form';
import type React from "react";
import { useEffect, useRef, useState } from "react";

type FormData = {
    prompt: string;
}
type ChatResponse = {
    message: string;
}
type Message = {
    content: string;
    role: "user" | "bot"
}

const ChatBot = () => {
    const coversationId = useRef(crypto.randomUUID());
    const [messages, setMessages] = useState<Message[]>([]);
    const { register, handleSubmit, reset, formState } = useForm<FormData>();
    const [isBotTyping, setIsBotTyping] = useState(false);
    const formRef = useRef<HTMLFormElement | null>(null);

    useEffect(() => {
        formRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages]);

    const onSubmit = async ({ prompt }: FormData) => {
        setIsBotTyping(true);
        setMessages(prev => [...prev, { role: 'user', content: prompt }]);
        reset();

        const { data } = await axios.post<ChatResponse>("/api/chat", {
            prompt,
            conversationId: coversationId.current
        });

        setIsBotTyping(false);
        setMessages(prev => [...prev, { role: 'bot', content: data.message }]);
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(onSubmit)();
        }
    };

    const onCopy = (e: React.ClipboardEvent<HTMLParagraphElement>): void => {
        const selection = window.getSelection()?.toString().trim();
        if (selection) {
            e.preventDefault();
            e.clipboardData.setData('text/plain', selection);
        }
    };
    
    return (
        <div>
            <div className="flex flex-col gap-3 mb-10">
                {messages.map((message, index) => (
                    <p
                        key={index}
                        onCopy={onCopy}
                        className={`px-3 py-1 rounded-xl ${message.role === 'user' ? 'bg-blue-600 text-white self-end' : 'bg-gray-100 text-black self-start'}`}
                    >
                        <ReactMarkdown>
                            {message.content}
                        </ReactMarkdown>
                    </p>
                ))}
                {isBotTyping && (
                    <div className="flex self-start gap-1 px-3 py-3 bg-gray-200 rounded-xl">
                        <div className="w-2 h-2 rounded-full bg-gray-800 animate-pulse"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-800 animate-pulse [animation-delay: 0.2s]"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-800 animate-pulse [animation-delay: 0.4s]"></div>
                    </div>
                )}
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                onKeyDown={onKeyDown}
                ref={formRef}
                className="flex flex-col gap-2 items-end border-2 p-4 rounded-3xl">
                <textarea
                    {...register('prompt',
                        {
                            required: true,
                            validate: (data) => data.trim().length > 0
                        }
                    )}
                    placeholder="Ask anything"
                    className="w-full border-0 focus:outline-0 resize-none"
                    maxLength={1000}
                >
                </textarea>
                <Button
                    disabled={!formState.isValid}
                    className="rounded-full h-9 w-9"
                >
                    <FaArrowUp />
                </Button>
            </form>
        </div>
    )
}

export default ChatBot