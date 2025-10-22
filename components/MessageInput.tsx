import React, { useState } from 'react';
import { MicIcon, SendIcon } from './Icons';

interface MessageInputProps {
    onSendMessage: (text: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
    const [message, setMessage] = useState('');

    const handleSend = () => {
        if (message.trim()) {
            onSendMessage(message);
            setMessage('');
        }
    };
    
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    const hasText = message.trim().length > 0;

    return (
        <div className="p-4 bg-gray-100 dark:bg-black/30 border-t border-gray-200 dark:border-transparent">
            <div className="bg-gray-200 dark:bg-[#2D2D2D] rounded-full flex items-center px-2 py-1">
                <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors">
                    <MicIcon className="w-6 h-6" />
                </button>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Message..."
                    className="flex-1 bg-transparent outline-none px-2 text-gray-900 dark:text-white placeholder-gray-500"
                />
                <button
                    onClick={handleSend}
                    className={`p-3 rounded-full text-white transition-colors duration-200 ${
                        hasText ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-300 dark:bg-[#3A3A3A]'
                    }`}
                >
                    <SendIcon className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default MessageInput;