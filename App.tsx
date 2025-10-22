import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Chat, Message, Story, User, Contact, Call, Theme } from './types';
import ChatList from './components/ChatList';
import ChatView from './components/ChatView';
import Welcome from './components/Welcome';
import BottomNavBar from './components/BottomNavBar';
import ContactsView from './components/ContactsView';
import CallsView from './components/CallsView';
import LoginScreen from './components/LoginScreen';
import OTPScreen from './components/OTPScreen';
import OnboardingScreen from './components/OnboardingScreen';

// IMPORTANT: This is a placeholder for the API key.
// In a real application, manage this securely.
const apiKey = process.env.API_KEY;
if (!apiKey) {
  console.warn("API key not found. Please set the API_KEY environment variable.");
}
const ai = new GoogleGenAI({ apiKey });


const users: Record<string, User> = {
    'gemini-bot': { id: 'gemini-bot', name: 'Gemini Bot', avatar: 'https://seeklogo.com/images/G/google-gemini-logo-2757652291-seeklogo.com.png', online: true },
    'user1': { id: 'user1', name: 'You', avatar: 'https://picsum.photos/seed/you/100/100', phone: '+15555550000' },
    'user2': { id: 'user2', name: 'Berikbay Nuray', avatar: 'https://picsum.photos/seed/nuray/100/100', online: true, phone: '+15555551111' },
    'user3': { id: 'user3', name: 'Beßpai Malika', avatar: 'https://picsum.photos/seed/malika/100/100', online: false, phone: '+15555552222' },
    'user4': { id: 'user4', name: 'Asankul Nurbek', avatar: 'https://picsum.photos/seed/nurbek/100/100', online: false, phone: '+15555553333' },
    'user5': { id: 'user5', name: 'Sabit Zhaniya', avatar: 'https://picsum.photos/seed/zhaniya/100/100', online: false, phone: '+15555554444' },
    'user6': { id: 'user6', name: 'Kamalova Sofiya', avatar: 'https://picsum.photos/seed/sofiya/100/100', online: false, phone: '+15555555555' },
};

const stories: Story[] = [
    { id: 'story1', user: { id: 'user2', name: 'Nuray', avatar: users['user2'].avatar } },
    { id: 'story2', user: { id: 'user3', name: 'Malika', avatar: users['user3'].avatar } },
    { id: 'story3', user: { id: 'user5', name: 'Zhaniya', avatar: users['user5'].avatar } },
    { id: 'story4', user: { id: 'user4', name: 'Nurbek', avatar: users['user4'].avatar } },
];

const messages: Record<string, Message[]> = {
    'chat-bot': [
        { id: 'm-bot-init', senderId: 'gemini-bot', text: "Hello! I'm a bot powered by Gemini. Ask me anything!", timestamp: '13:37' }
    ],
    'chat1': [
        { id: 'm1', senderId: 'user2', text: 'Salem, bugin tarbieshiler kuni ma?', timestamp: '13:01' },
        { id: 'm2', senderId: 'user2', text: 'Kashan jasaimyz?', timestamp: '13:01' },
        { id: 'm3', senderId: 'user1', text: 'Ya, bugin', timestamp: '13:10' },
        { id: 'm4', senderId: 'user1', text: 'Bugin keshke 18:00 de akt zalda isteik', timestamp: '13:10' },
        { id: 'm5', senderId: 'user2', text: 'Davai', timestamp: '13:10' },
        { id: 'm6', senderId: 'user1', text: 'Okay, see you then!', timestamp: '13:11' },
        { id: 'm7', senderId: 'user2', text: 'See you!', timestamp: '13:12' },
    ],
    'chat2': [{ id: 'm8', senderId: 'user3', text: 'Kalaisyń kardesh?', timestamp: '22:30' }],
    'chat3': [{ id: 'm9', senderId: 'user4', text: 'Nice to meet u!', timestamp: '20:10' }],
    'chat4': [{ id: 'm10', senderId: 'user5', text: 'Salem Zhoni', timestamp: '19:01' }],
    'chat5': [{ id: 'm11', senderId: 'user6', text: 'Bugin sabak bolama?', timestamp: '17:20' }],
};

const chats: Chat[] = [
    { id: 'chat-bot', otherUser: users['gemini-bot'], lastMessage: 'Ask me anything!', timestamp: 'Now', unreadCount: 0, status: 'read' },
    { id: 'chat1', otherUser: users['user2'], lastMessage: 'Hello, how are u?', timestamp: '23:01', unreadCount: 1, status: 'delivered' },
    { id: 'chat2', otherUser: users['user3'], lastMessage: 'Kalaisyń kardesh?', timestamp: '22:30', unreadCount: 0, status: 'read' },
    { id: 'chat3', otherUser: users['user4'], lastMessage: 'Nice to meet u!', timestamp: '20:10', unreadCount: 0, status: 'read' },
    { id: 'chat4', otherUser: users['user5'], lastMessage: 'Salem Zhoni', timestamp: '19:01', unreadCount: 0, status: 'read' },
    { id: 'chat5', otherUser: users['user6'], lastMessage: 'Bugin sabak bolama?', timestamp: '17:20', unreadCount: 0, status: 'read' },
];

const calls: Call[] = [
    { id: 'call1', user: users['user3'], direction: 'missed', timestamp: 'Yesterday, 20:45', type: 'video' },
    { id: 'call2', user: users['user5'], direction: 'outgoing', timestamp: 'Yesterday, 18:30', type: 'audio' },
    { id: 'call3', user: users['user2'], direction: 'incoming', timestamp: '2 days ago, 09:15', type: 'audio' },
    { id: 'call4', user: users['user6'], direction: 'incoming', timestamp: '2 days ago, 11:40', type: 'video' },
];


export default function App() {
    const [onboardingComplete, setOnboardingComplete] = useState<boolean>(() => {
        try {
            return localStorage.getItem('wispOnboardingComplete') === 'true';
        } catch {
            return false;
        }
    });

    const [currentUser, setCurrentUser] = useState<User | null>(() => {
        try {
            const savedUser = localStorage.getItem('wispUser');
            return savedUser ? JSON.parse(savedUser) : null;
        } catch {
            return null;
        }
    });
    const [loginStep, setLoginStep] = useState<'phone' | 'otp'>('phone');
    const [loginPhoneNumber, setLoginPhoneNumber] = useState('');

    const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
    const [allMessages, setAllMessages] = useState(messages);
    const [activeView, setActiveView] = useState<'chats' | 'contacts' | 'calls'>('chats');
    const [syncedContacts, setSyncedContacts] = useState<Contact[] | null>(null);
    const [theme, setTheme] = useState<Theme>(() => {
        const savedTheme = localStorage.getItem('theme') as Theme;
        if (savedTheme) return savedTheme;
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        return systemPrefersDark ? 'dark' : 'light';
    });

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const handleOnboardingComplete = () => {
        localStorage.setItem('wispOnboardingComplete', 'true');
        setOnboardingComplete(true);
    };

    const handleGetOtp = (phone: string) => {
        console.log(`Simulating OTP for ${phone}. Use 1234 to verify.`);
        setLoginPhoneNumber(phone);
        setLoginStep('otp');
    };

    const handleVerifyOtp = (otp: string) => {
        if (otp === '1234') {
            const user = Object.values(users).find(u => u.phone === loginPhoneNumber);
            const userToLogin = user || users['user1']; // Fallback to user1 for demo
            
            if (!user) {
                alert("Phone number not registered. Logging in as default user for demo.");
            }

            localStorage.setItem('wispUser', JSON.stringify(userToLogin));
            setCurrentUser(userToLogin);
        } else {
            alert('Invalid OTP. Please try again.');
        }
    };
    
    const handleLogout = () => {
        if (window.confirm("Are you sure you want to log out?")) {
            localStorage.removeItem('wispUser');
            setCurrentUser(null);
            setLoginStep('phone');
        }
    };


    const selectedChat = chats.find(c => c.id === selectedChatId);

    const handleSendMessage = async (text: string) => {
        if (!selectedChatId || !currentUser) return;

        const newMessage: Message = {
            id: `m${Date.now()}`,
            senderId: currentUser.id,
            text,
            timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
        };

        setAllMessages(prevMessages => ({
            ...prevMessages,
            [selectedChatId]: [...(prevMessages[selectedChatId] || []), newMessage],
        }));

        if (selectedChatId === 'chat-bot') {
            const typingMessage: Message = {
                id: `m${Date.now()}-typing`,
                senderId: 'gemini-bot',
                text: '',
                timestamp: '',
                isTyping: true,
            };

            setAllMessages(prev => ({
                ...prev,
                [selectedChatId]: [...(prev[selectedChatId] || []), typingMessage],
            }));

            try {
                 if (!apiKey) throw new Error("API Key is missing.");
                const response = await ai.models.generateContent({
                    model: 'gemini-2.5-flash',
                    contents: text,
                });
                
                const botResponse: Message = {
                     id: `m${Date.now()}`,
                     senderId: 'gemini-bot',
                     text: response.text,
                     timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
                };

                 setAllMessages(prev => ({
                    ...prev,
                    [selectedChatId]: [
                        ...(prev[selectedChatId] || []).filter(m => !m.isTyping),
                        botResponse
                    ],
                }));

            } catch (error) {
                console.error("Gemini API call failed", error);
                const errorMessage: Message = {
                     id: `m${Date.now()}-error`,
                     senderId: 'gemini-bot',
                     text: "Sorry, I couldn't connect to my brain right now.",
                     timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
                };
                 setAllMessages(prev => ({
                    ...prev,
                    [selectedChatId]: [
                        ...(prev[selectedChatId] || []).filter(m => !m.isTyping),
                        errorMessage
                    ],
                }));
            }
        }
    };

    const handleSyncContacts = () => {
        if (window.confirm("Wisp Messenger would like to access your contacts.")) {
            const mockPhoneContacts: Contact[] = [
                { name: 'Berikbay Nuray', phone: '+15555551111' },
                { name: 'Mom', phone: '+15555559999' },
                { name: 'Asankul Nurbek', phone: '+15555553333' },
                { name: 'Dr. Anya Forger', phone: '+15555558888' },
                { name: 'Kamalova Sofiya', phone: '+15555555555' },
            ];
            setSyncedContacts(mockPhoneContacts);
            alert("Contacts synced!");
        } else {
            alert("Permission denied. Cannot sync contacts.");
        }
    };

    const handleViewChange = (view: 'chats' | 'contacts' | 'calls') => {
        setActiveView(view);
        if (view !== 'chats') {
            setSelectedChatId(null);
        }
    };

    const renderContent = () => {
        if (!onboardingComplete) {
            return <OnboardingScreen onComplete={handleOnboardingComplete} />;
        }
        if (!currentUser) {
            return (
                <>
                    {loginStep === 'phone' && <LoginScreen onGetOtp={handleGetOtp} />}
                    {loginStep === 'otp' && (
                        <OTPScreen
                            phoneNumber={loginPhoneNumber}
                            onVerifyOtp={handleVerifyOtp}
                            onBack={() => setLoginStep('phone')}
                        />
                    )}
                </>
            );
        }
        return (
            <main className="w-full max-w-5xl h-[95vh] max-h-[900px] flex bg-white dark:bg-[#1E1E1E] rounded-3xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800">
                <div className="w-full md:w-1/3 lg:w-[360px] flex-shrink-0 bg-gray-50 dark:bg-black flex flex-col">
                    <div className="flex-grow overflow-y-auto">
                        {activeView === 'chats' && (
                            <ChatList
                                stories={stories}
                                chats={chats}
                                onSelectChat={setSelectedChatId}
                                selectedChatId={selectedChatId}
                                theme={theme}
                                onToggleTheme={toggleTheme}
                            />
                        )}
                        {activeView === 'contacts' && (
                            <ContactsView
                                syncedContacts={syncedContacts}
                                wispUsers={Object.values(users)}
                                onSyncContacts={handleSyncContacts}
                                theme={theme}
                            />
                        )}
                        {activeView === 'calls' && (
                            <CallsView calls={calls} />
                        )}
                    </div>
                    <BottomNavBar activeView={activeView} onTabChange={handleViewChange} onLogout={handleLogout} />
                </div>
                <div className="hidden md:flex flex-1 flex-col bg-white dark:bg-[#1E1E1E]">
                    {selectedChat ? (
                        <ChatView
                            chat={selectedChat}
                            messages={allMessages[selectedChat.id] || []}
                            onSendMessage={handleSendMessage}
                            currentUser={currentUser}
                        />
                    ) : (
                        <Welcome />
                    )}
                </div>
            </main>
        );
    }


    return (
        <div className="h-screen w-full bg-gray-100 dark:bg-black text-gray-900 dark:text-white flex items-center justify-center font-sans">
             <div className="w-full max-w-sm mx-auto p-4 md:p-0 md:max-w-none">
                {renderContent()}
            </div>
        </div>
    );
}