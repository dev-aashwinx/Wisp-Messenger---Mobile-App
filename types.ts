export interface User {
    id: string;
    name: string;
    avatar: string;
    online?: boolean;
    phone?: string;
}

export interface Story {
    id: string;
    user: {
        id: string;
        name: string;
        avatar: string;
    };
}

export interface Message {
    id: string;
    senderId: string;
    text: string;
    timestamp: string;
    isTyping?: boolean;
}

export interface Chat {
    id:string;
    otherUser: User;
    lastMessage: string;
    timestamp: string;
    unreadCount: number;
    status: 'sent' | 'delivered' | 'read';
}

export interface Contact {
    name: string;
    phone: string;
}

export interface Call {
    id: string;
    user: User;
    direction: 'incoming' | 'outgoing' | 'missed';
    timestamp: string;
    type: 'audio' | 'video';
}

export type Theme = 'light' | 'dark';