import { FaArrowUp } from "react-icons/fa";
import axios from "axios";
import { Button } from "./button"
import { useForm } from 'react-hook-form';
import type React from "react";
import { useRef, useState } from "react";

type FormData = {
    prompt: string;
}
type ChatResponse = {
    message: string;
}

const ChatBot = () => {
    const coversationId = useRef(crypto.randomUUID());
    const [messages, setMessages] = useState<string[]>([]);
    const { register, handleSubmit, reset, formState } = useForm<FormData>();

    const onSubmit = async ({ prompt }: FormData) => {
        setMessages(prev => [...prev, prompt]);
        reset();

        const { data } = await axios.post<ChatResponse>("/api/chat", {
            prompt,
            conversationId: coversationId.current
        });

        setMessages(prev => [...prev, data.message]);
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(onSubmit)();
        }
    };

    return (
        <div>
            <div>
                {messages.map((message, index) => <p key={index}>{message}</p>)}
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                onKeyDown={onKeyDown}
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