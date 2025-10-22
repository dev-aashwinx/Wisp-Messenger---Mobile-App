import React from 'react';
import { ZapIcon, LockIcon, PhoneIcon, WandIcon, CameraIcon, UsersIcon } from './Icons';

const FeatureItem: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/50">
            {icon}
        </div>
        <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{title}</h3>
            <p className="mt-1 text-gray-600 dark:text-gray-400">{children}</p>
        </div>
    </div>
);


const Welcome: React.FC = () => {
    return (
        <div className="flex flex-col h-full text-gray-500 dark:text-gray-400 p-8 overflow-y-auto">
            <div className="max-w-2xl mx-auto my-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
                   ✨ Some of the Key Features
                </h2>
                
                <div className="space-y-10">
                    <FeatureItem icon={<ZapIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />} title="Lightning-Fast Messaging">
                        Enjoy seamless, real-time conversations with your friends and family. Wisp Messenger delivers messages instantly — no delays, no interruptions — powered by advanced real-time Firebase technology for reliable connectivity anywhere.
                    </FeatureItem>
                    
                    <FeatureItem icon={<LockIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />} title="Security & Privacy">
                        Your conversations stay yours. Wisp Messenger uses end-to-end encryption to ensure that every text, call, photo, or file you share is fully protected and private — accessible only to you and the person you’re chatting with.
                    </FeatureItem>

                    <FeatureItem icon={<PhoneIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />} title="Voice & Video Calling">
                         Stay closer to the people who matter most. Make crystal-clear voice and video calls directly from the app — no extra downloads needed. Enjoy smooth, high-quality calls even on slower connections.
                    </FeatureItem>

                     <FeatureItem icon={<WandIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />} title="Smart Features">
                        From message read receipts and typing indicators to custom themes and dark mode — Wisp Messenger gives you a modern chatting experience that feels natural, fast, and personal.
                    </FeatureItem>

                     <FeatureItem icon={<CameraIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />} title="Stories & Status Updates">
                        Share your moments with style. Post photos, short clips, or status updates that disappear after 24 hours — just like real stories. Stay connected beyond text.
                    </FeatureItem>

                     <FeatureItem icon={<UsersIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />} title="Contact Sync & Easy Invites">
                        Wisp Messenger automatically finds your friends from your contact list. Instantly start chatting with those already on Wisp — and invite others to join you with one tap.
                    </FeatureItem>
                </div>

                 <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-12">
                    Reliable, Simple, and Personal.
                 </p>
            </div>
        </div>
    );
};

export default Welcome;
