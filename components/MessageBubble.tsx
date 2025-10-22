import React from 'react';
import { Message } from '../types';

interface MessageBubbleProps {
    message: Message;
    isSender: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isSender }) => {
    const senderClasses = 'bg-purple-600 dark:bg-gradient-to-br from-purple-600 to-purple-800 text-white self-end rounded-bl-2xl rounded-tr-2xl rounded-tl-2xl';
    const receiverClasses = 'bg-gray-200 dark:bg-gradient-to-br from-gray-700 to-gray-800 text-gray-900 dark:text-white self-start rounded-br-2xl rounded-tl-2xl rounded-tr-2xl';
    const bubbleClasses = isSender ? senderClasses : receiverClasses;

    const timeClasses = isSender ? 'text-right' : 'text-left';

    if (message.isTyping) {
         return (
             <div className={`flex flex-col items-start`}>
                <div className={`px-4 py-3.5 max-w-md md:max-w-lg ${receiverClasses}`}>
                    <div className="flex items-center justify-center space-x-1">
                        <span className="w-2 h-2 bg-gray-400 dark:bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0s' }}></span>
                        <span className="w-2 h-2 bg-gray-400 dark:bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></span>
                        <span className="w-2 h-2 bg-gray-400 dark:bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></span>
                    </div>
                </div>
            </div>
         );
    }

    return (
        <div className={`flex flex-col ${isSender ? 'items-end' : 'items-start'}`}>
            <div className={`px-4 py-2.5 max-w-md md:max-w-lg ${bubbleClasses}`}>
                <p>{message.text}</p>
            </div>
            <p className={`text-xs text-gray-500 mt-1 px-1 ${timeClasses}`}>{message.timestamp}</p>
        </div>
    );
};

export default MessageBubble;