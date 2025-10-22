import React from 'react';
import { Chat } from '../types';
import { CheckIcon, DoubleCheckIcon } from './Icons';

interface ChatItemProps {
    chat: Chat;
    isSelected: boolean;
    onSelect: () => void;
}

const ReadStatus: React.FC<{ status: 'sent' | 'delivered' | 'read' }> = ({ status }) => {
    const baseClasses = "w-4 h-4";
    if (status === 'read') {
        return <DoubleCheckIcon className={`${baseClasses} text-purple-500 dark:text-purple-400`} />;
    }
    if (status === 'delivered') {
        return <DoubleCheckIcon className={`${baseClasses} text-gray-400 dark:text-gray-400`} />;
    }
    return <CheckIcon className={`${baseClasses} text-gray-400 dark:text-gray-400`} />;
};

const ChatItem: React.FC<ChatItemProps> = ({ chat, isSelected, onSelect }) => {
    return (
        <div
            onClick={onSelect}
            className={`flex items-center p-3 rounded-2xl cursor-pointer transition-colors duration-200 ${isSelected ? 'bg-gray-200 dark:bg-[#2D2D2D]' : 'hover:bg-gray-100 dark:hover:bg-[#252525]'}`}
        >
            <img src={chat.otherUser.avatar} alt={chat.otherUser.name} className="w-14 h-14 rounded-full mr-4" />
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                    <p className="font-semibold truncate text-gray-900 dark:text-white">{chat.otherUser.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{chat.timestamp}</p>
                </div>
                <div className="flex justify-between items-center mt-1">
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{chat.lastMessage}</p>
                    <div className="flex items-center space-x-1.5">
                       <ReadStatus status={chat.status} />
                       {chat.unreadCount > 0 && (
                            <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatItem;