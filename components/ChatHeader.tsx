import React from 'react';
import { User } from '../types';
import { ChevronLeftIcon, MoreVerticalIcon } from './Icons';

interface ChatHeaderProps {
    user: User;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ user }) => {
    return (
        <div className="flex items-center p-4 bg-white/80 dark:bg-black/30 backdrop-blur-sm rounded-tr-3xl border-b border-gray-200 dark:border-gray-800">
            <button className="text-gray-500 dark:text-gray-400 mr-4">
                <ChevronLeftIcon className="w-6 h-6" />
            </button>
            <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full mr-3" />
            <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{user.name}</h3>
                {user.online && <p className="text-xs text-gray-500 dark:text-gray-400">Online</p>}
            </div>
            <div className="flex-grow"></div>
            <button className="text-gray-500 dark:text-gray-400">
                <MoreVerticalIcon className="w-6 h-6" />
            </button>
        </div>
    );
};

export default ChatHeader;