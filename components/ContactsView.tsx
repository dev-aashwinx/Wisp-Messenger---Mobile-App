import React from 'react';
import { Contact, User, Theme } from '../types';

interface ContactsViewProps {
    syncedContacts: Contact[] | null;
    wispUsers: User[];
    onSyncContacts: () => void;
    theme: Theme;
}

const ContactItem: React.FC<{ user: User, isWispContact: true } | { contact: Contact, isWispContact: false, theme: Theme }> = (props) => {
    const name = props.isWispContact ? props.user.name : props.contact.name;
    const avatarBG = props.isWispContact ? '' : (props.theme === 'light' ? 'e5e7eb' : '2d2d2d');
    const avatarColor = props.isWispContact ? '' : (props.theme === 'light' ? '1f2937' : 'ffffff');
    const avatar = props.isWispContact ? props.user.avatar : `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${avatarBG}&color=${avatarColor}&bold=true`;
    const detail = props.isWispContact ? (props.user.online ? 'Online' : 'Last seen recently') : props.contact.phone;

    return (
        <div className="flex items-center p-3 rounded-2xl hover:bg-gray-100 dark:hover:bg-[#252525] transition-colors cursor-pointer">
            <img src={avatar} alt={name} className="w-14 h-14 rounded-full mr-4" />
            <div className="flex-1 min-w-0">
                <p className="font-semibold truncate text-gray-900 dark:text-white">{name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{detail}</p>
            </div>
            {!props.isWispContact && (
                <button className="bg-purple-600 text-white text-sm px-4 py-1.5 rounded-full hover:bg-purple-700 transition-colors">
                    Invite
                </button>
            )}
        </div>
    );
};


const ContactsView: React.FC<ContactsViewProps> = ({ syncedContacts, wispUsers, onSyncContacts, theme }) => {
    if (!syncedContacts) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center p-6">
                <h2 className="text-xl font-bold mb-2">Sync Contacts</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-xs">Find your friends who are already on Wisp Messenger.</p>
                <button
                    onClick={onSyncContacts}
                    className="bg-purple-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-purple-700 transition-colors"
                >
                    Sync Your Contacts
                </button>
                <p className="text-xs text-gray-600 dark:text-gray-500 mt-4 max-w-xs">We'll only access your contacts to help you connect with friends. We don't store your contact list.</p>
            </div>
        );
    }

    const wispUserPhones = new Set(wispUsers.map(u => u.phone).filter(p => p));
    
    const wispContactsOnPhone = syncedContacts
        .filter(c => wispUserPhones.has(c.phone))
        .map(c => wispUsers.find(u => u.phone === c.phone)!);

    const otherContacts = syncedContacts.filter(c => !wispUserPhones.has(c.phone));

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Contacts</h2>
            
            {wispContactsOnPhone.length > 0 && (
                <div className="mb-8">
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 px-3">On Wisp Messenger</h3>
                    <div className="space-y-2">
                        {wispContactsOnPhone.map(user => (
                            <ContactItem key={user.id} user={user} isWispContact={true} />
                        ))}
                    </div>
                </div>
            )}

            {otherContacts.length > 0 && (
                <div>
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 px-3">Invite to Wisp</h3>
                    <div className="space-y-2">
                        {otherContacts.map(contact => (
                            <ContactItem key={contact.phone} contact={contact} isWispContact={false} theme={theme} />
                        ))}
                    </div>
                </div>
            )}

            {syncedContacts.length === 0 && (
                <p className="text-gray-500 dark:text-gray-400 text-center mt-8">No contacts found.</p>
            )}
        </div>
    );
};

export default ContactsView;