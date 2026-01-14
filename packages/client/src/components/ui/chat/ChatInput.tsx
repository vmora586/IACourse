import { useForm } from 'react-hook-form';
import { Button } from '../button'
import { FaArrowUp } from 'react-icons/fa'

export type ChatFormData = {
    prompt: string;
}

type Props = {
    onSubmit: (data: ChatFormData) => void;
}

const ChatInput = ({ onSubmit }: Props) => {
    const { register, handleSubmit, reset, formState } = useForm<ChatFormData>();

    const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleFormSubmit();
        }
    };

    const handleFormSubmit = handleSubmit(data => {
        reset({ prompt: "" });
        onSubmit(data);
    });

    return (
        <form
            onSubmit={handleFormSubmit}
            onKeyDown={handleKeyDown}
            className="flex flex-col gap-2 items-end border-2 p-4 rounded-3xl">
            <textarea
                {...register('prompt',
                    {
                        required: true,
                        validate: (data) => data.trim().length > 0
                    }
                )}
                autoFocus
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
    )
}

export default ChatInput