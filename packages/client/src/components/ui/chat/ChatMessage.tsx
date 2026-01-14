import { useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown"

export type Message = {
    content: string;
    role: "user" | "bot"
}

type ChatMessageProps = {
    messages: Message[];
}

const ChatMessage = ({ messages }: ChatMessageProps) => {
    const lastMessageRef = useRef<HTMLDivElement | null>(null);

    const onCopy = (e: React.ClipboardEvent<HTMLParagraphElement>): void => {
        const selection = window.getSelection()?.toString().trim();
        if (selection) {
            e.preventDefault();
            e.clipboardData.setData("text/plain", selection);
        }
    };

    useEffect(() => {
        lastMessageRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages]);

    return (
        <div className="flex flex-col gap-3">
            {
                messages.map((message, index) => (
                    <div
                        key={index}
                        onCopy={onCopy}
                        className={`px-3 py-1 rounded-xl ${message.role === 'user' ? 'bg-blue-600 text-white self-end' : 'bg-gray-100 text-black self-start'}`}
                        ref={index === messages.length - 1 ? lastMessageRef : null}
                    >
                        <ReactMarkdown>
                            {message.content}
                        </ReactMarkdown>
                    </div>
                ))
            }
        </div>
    )
}

export default ChatMessage