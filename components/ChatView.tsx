import React from 'react';
import { Chat, Message, User } from '../types';
import ChatHeader from './ChatHeader';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';

interface ChatViewProps {
    chat: Chat;
    messages: Message[];
    onSendMessage: (text: string) => void;
    currentUser: User;
}

const ChatView: React.FC<ChatViewProps> = ({ chat, messages, onSendMessage, currentUser }) => {
    return (
        <div className="flex flex-col h-full bg-white dark:bg-[#1E1E1E] rounded-tr-3xl rounded-br-3xl">
            <ChatHeader user={chat.otherUser} />
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <div className="flex justify-center">
                  <span className="bg-purple-100 dark:bg-[#5B21B6] text-purple-700 dark:text-white text-xs px-3 py-1 rounded-full">Today</span>
                </div>
                {messages.map((msg) => (
                    <MessageBubble key={msg.id} message={msg} isSender={msg.senderId === currentUser.id} />
                ))}
            </div>
            <MessageInput onSendMessage={onSendMessage} />
        </div>
    );
};

export default ChatView;