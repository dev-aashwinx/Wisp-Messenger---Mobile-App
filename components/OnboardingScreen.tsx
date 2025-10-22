import React, { useState } from 'react';
import { WispLogo } from './Logo';
import { ZapIcon, LockIcon, PhoneIcon, UsersIcon } from './Icons';

interface OnboardingScreenProps {
    onComplete: () => void;
}

const onboardingSteps = [
    {
        icon: <WispLogo className="w-24 h-24" />,
        title: "Welcome to Wisp Messenger",
        subtitle: "Connect instantly with your friends and family — fast, private, and effortless.",
    },
    {
        icon: <ZapIcon className="w-20 h-20 text-purple-500" />,
        title: "Chat in Real Time",
        subtitle: "Send and receive messages instantly with our fast, reliable messaging engine powered by Firebase.",
    },
    {
        icon: <LockIcon className="w-20 h-20 text-purple-500" />,
        title: "Your Privacy Matters",
        subtitle: "Every message, call, and photo is protected with end-to-end encryption — only you and your friends can read them.",
    },
    {
        icon: <PhoneIcon className="w-20 h-20 text-purple-500" />,
        title: "Stay Closer Than Ever",
        subtitle: "Enjoy high-quality voice and video calls anywhere in the world — directly from Wisp Messenger.",
    },
    {
        icon: <UsersIcon className="w-20 h-20 text-purple-500" />,
        title: "Connect Instantly",
        subtitle: "Wisp Messenger syncs with your contacts so you can find friends easily and invite others to join.",
    }
];

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
    const [currentStep, setCurrentStep] = useState(0);

    const handleNext = () => {
        if (currentStep < onboardingSteps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            onComplete();
        }
    };

    const handleSkip = () => {
        onComplete();
    };

    const isLastStep = currentStep === onboardingSteps.length - 1;

    return (
        <div className="flex flex-col h-full max-h-[95vh] max-w-sm w-full bg-gray-50 dark:bg-black p-8 rounded-3xl shadow-lg text-center justify-between">
            <div className="flex justify-end">
                {!isLastStep && (
                    <button onClick={handleSkip} className="text-sm text-gray-500 dark:text-gray-400 hover:underline">
                        Skip
                    </button>
                )}
            </div>

            <div className="flex-grow flex flex-col items-center justify-center">
                <div className="mb-8">
                    {onboardingSteps[currentStep].icon}
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {onboardingSteps[currentStep].title}
                </h1>
                <p className="mt-4 text-gray-600 dark:text-gray-400">
                    {onboardingSteps[currentStep].subtitle}
                </p>
            </div>

            <div className="flex flex-col items-center">
                <div className="flex space-x-2 my-8">
                    {onboardingSteps.map((_, index) => (
                        <div
                            key={index}
                            className={`w-2 h-2 rounded-full transition-colors ${
                                currentStep === index ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-600'
                            }`}
                        />
                    ))}
                </div>

                <button
                    onClick={handleNext}
                    className="w-full bg-purple-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-purple-700 transition-all duration-300 transform hover:scale-105"
                >
                    {isLastStep ? 'Get Started' : 'Next'}
                </button>
            </div>
        </div>
    );
};

export default OnboardingScreen;