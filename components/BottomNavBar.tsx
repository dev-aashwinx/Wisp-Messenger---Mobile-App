import React from 'react';
import { MessageCircleIcon, UsersIcon, UserIcon, PhoneIcon } from './Icons';

interface BottomNavBarProps {
    activeView: 'chats' | 'contacts' | 'calls';
    onTabChange: (view: 'chats' | 'contacts' | 'calls') => void;
    onLogout: () => void;
}

const TabButton: React.FC<{
    isActive: boolean;
    onClick: () => void;
    'aria-label': string;
    children: React.ReactNode;
}> = ({ isActive, onClick, 'aria-label': ariaLabel, children }) => {
    const baseClasses = 'p-3 rounded-full transition-colors';
    const activeClasses = 'bg-black dark:bg-white text-white dark:text-black shadow-lg';
    const inactiveClasses = 'text-gray-500 dark:text-white';
    
    return (
        <button
            onClick={onClick}
            className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
            aria-label={ariaLabel}
            aria-current={isActive}
        >
            {children}
        </button>
    );
}

const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeView, onTabChange, onLogout }) => {
    return (
        <div className="flex-shrink-0 px-8 py-4">
             <div className="bg-white dark:bg-[#1C1C1C] flex justify-around items-center p-2 rounded-full shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),_0_8px_10px_-6px_rgba(0,0,0,0.1)] dark:shadow-none">
                <TabButton 
                    onClick={() => onTabChange('chats')}
                    isActive={activeView === 'chats'}
                    aria-label="Chats"
                >
                    <MessageCircleIcon className="w-7 h-7" />
                </TabButton>
                <TabButton 
                    onClick={() => onTabChange('contacts')}
                    isActive={activeView === 'contacts'}
                    aria-label="Contacts"
                >
                    <UsersIcon className="w-7 h-7" />
                </TabButton>
                <TabButton 
                    onClick={() => onTabChange('calls')}
                    isActive={activeView === 'calls'}
                    aria-label="Calls"
                >
                    <PhoneIcon className="w-7 h-7" />
                </TabButton>
                <button 
                    onClick={onLogout}
                    className="p-3 text-gray-500 dark:text-white"
                    aria-label="Logout"
                >
                    <UserIcon className="w-7 h-7" />
                </button>
            </div>
        </div>
    );
};

export default BottomNavBar;