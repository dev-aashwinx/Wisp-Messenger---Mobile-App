import React from 'react';
import { Chat, Story, Theme } from '../types';
import StoryPreview from './StoryPreview';
import ChatItem from './ChatItem';
import { ArchiveIcon } from './Icons';
import ThemeToggle from './ThemeToggle';

interface ChatListProps {
    stories: Story[];
    chats: Chat[];
    onSelectChat: (chatId: string) => void;
    selectedChatId: string | null;
    theme: Theme;
    onToggleTheme: () => void;
}

const ChatList: React.FC<ChatListProps> = ({ stories, chats, onSelectChat, selectedChatId, theme, onToggleTheme }) => {
    return (
        <div className="p-6">
            {/* Stories Section */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Story</h2>
                    <button className="text-sm text-gray-500 dark:text-gray-400">See All</button>
                </div>
                <div className="flex space-x-4 overflow-x-auto pb-2 -mx-6 px-6">
                    <StoryPreview isAddStory />
                    {stories.map(story => (
                        <StoryPreview key={story.id} story={story} />
                    ))}
                </div>
            </div>

            {/* Recent Chat Section */}
            <div className="space-y-2">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Recent Chat</h2>
                     <div className="flex items-center space-x-2">
                         <ThemeToggle theme={theme} onToggle={onToggleTheme} />
                        <button className="flex items-center space-x-2 text-sm bg-gray-200 dark:bg-[#2D2D2D] text-gray-600 dark:text-gray-300 px-3 py-1.5 rounded-full">
                            <ArchiveIcon className="w-4 h-4" />
                            <span>Archive</span>
                        </button>
                    </div>
                </div>
                {chats.map(chat => (
                    <ChatItem
                        key={chat.id}
                        chat={chat}
                        isSelected={selectedChatId === chat.id}
                        onSelect={() => onSelectChat(chat.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ChatList;