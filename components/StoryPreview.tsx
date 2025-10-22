import React from 'react';
import { Story } from '../types';
import { PlusIcon } from './Icons';

interface StoryPreviewProps {
    story?: Story;
    isAddStory?: boolean;
}

const StoryPreview: React.FC<StoryPreviewProps> = ({ story, isAddStory }) => {
    if (isAddStory) {
        return (
            <div className="flex flex-col items-center space-y-2 flex-shrink-0 w-20">
                <button className="w-16 h-16 bg-gray-200 dark:bg-[#2D2D2D] rounded-full flex items-center justify-center">
                    <PlusIcon className="w-8 h-8 text-gray-500 dark:text-gray-400" />
                </button>
                <p className="text-sm text-gray-500 dark:text-gray-400">Add Story</p>
            </div>
        );
    }

    if (!story) return null;

    return (
        <div className="flex flex-col items-center space-y-2 flex-shrink-0 w-20">
            <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500">
                <div className="bg-gray-50 dark:bg-black p-0.5 rounded-full">
                    <img src={story.user.avatar} alt={story.user.name} className="w-full h-full rounded-full" />
                </div>
            </div>
            <p className="text-sm truncate w-full text-center">{story.user.name}</p>
        </div>
    );
};

export default StoryPreview;