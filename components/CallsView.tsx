import React from 'react';
import { Call } from '../types';
import { PhoneIncomingIcon, PhoneOutgoingIcon, PhoneMissedIcon, VideoIcon, PhoneIcon } from './Icons';

const CallItem: React.FC<{ call: Call }> = ({ call }) => {
    const DirectionIcon = () => {
        switch(call.direction) {
            case 'incoming': return <PhoneIncomingIcon className="w-4 h-4 text-green-500 transform -rotate-45" />;
            case 'outgoing': return <PhoneOutgoingIcon className="w-4 h-4 text-blue-500 transform -rotate-45" />;
            case 'missed': return <PhoneIncomingIcon className="w-4 h-4 text-red-500 transform -rotate-45" />;
            default: return null;
        }
    };

    return (
        <div className="flex items-center p-3 rounded-2xl hover:bg-gray-100 dark:hover:bg-[#252525] transition-colors cursor-pointer">
            <img src={call.user.avatar} alt={call.user.name} className="w-14 h-14 rounded-full mr-4" />
            <div className="flex-1 min-w-0">
                <p className={`font-semibold truncate ${call.direction === 'missed' ? 'text-red-500' : 'text-gray-900 dark:text-white'}`}>{call.user.name}</p>
                <div className="flex items-center space-x-1.5 mt-1">
                    <DirectionIcon />
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{call.timestamp}</p>
                </div>
            </div>
            <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white">
                {call.type === 'video' ? <VideoIcon className="w-6 h-6" /> : <PhoneIcon className="w-6 h-6" />}
            </button>
        </div>
    );
};

const CallsView: React.FC<{ calls: Call[] }> = ({ calls }) => {
    if (calls.length === 0) {
        return (
             <div className="flex flex-col items-center justify-center h-full text-center p-6 text-gray-500 dark:text-gray-400">
                <PhoneIcon className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Recent Calls</h2>
                <p className="max-w-xs">You haven't made or received any calls through Wisp yet.</p>
            </div>
        );
    }

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Calls</h2>
            <div className="space-y-2">
                {calls.map(call => <CallItem key={call.id} call={call} />)}
            </div>
        </div>
    );
};

export default CallsView;