import React, { useState, useRef, ChangeEvent, KeyboardEvent } from 'react';

interface OTPScreenProps {
    phoneNumber: string;
    onVerifyOtp: (otp: string) => void;
    onBack: () => void;
}

const OTPScreen: React.FC<OTPScreenProps> = ({ phoneNumber, onVerifyOtp, onBack }) => {
    const [otp, setOtp] = useState<string[]>(new Array(4).fill(''));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;
        if (isNaN(Number(value))) return; // Only allow numbers

        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        // Move to next input if current one is filled
        if (value && index < 3) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
        // Move to previous input on backspace if current is empty
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };
    
    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData('text').slice(0, 4);
        if (/^\d{4}$/.test(pasteData)) {
            const newOtp = pasteData.split('');
            setOtp(newOtp);
            inputRefs.current[3]?.focus();
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const combinedOtp = otp.join('');
        if (combinedOtp.length === 4) {
            onVerifyOtp(combinedOtp);
        } else {
            alert('Please enter the complete 4-digit OTP.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-full text-center bg-gray-50 dark:bg-black p-8 rounded-3xl shadow-lg">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Enter Code</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
                We sent a 4-digit code to <br />
                <span className="font-semibold text-gray-800 dark:text-gray-200">{phoneNumber}</span>
            </p>
             <button onClick={onBack} className="text-sm text-purple-600 dark:text-purple-400 hover:underline mt-1">Change number</button>
            
             <div className="my-4 p-3 bg-yellow-100 dark:bg-yellow-900/50 border border-yellow-300 dark:border-yellow-700 rounded-lg">
                <p className="text-xs text-yellow-800 dark:text-yellow-200">
                    <strong>Demo Mode:</strong> Please use the OTP <strong>1234</strong> to continue.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="w-full">
                <div className="flex justify-center space-x-3 mb-6" onPaste={handlePaste}>
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => (inputRefs.current[index] = el)}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            className="w-14 h-16 text-center text-3xl font-semibold bg-gray-200 dark:bg-[#2D2D2D] text-gray-900 dark:text-white border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                            required
                        />
                    ))}
                </div>

                <button
                    type="submit"
                    className="w-full bg-purple-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-purple-700 transition-all duration-300 transform hover:scale-105"
                >
                    Verify
                </button>
            </form>
            
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
                Didn't receive code?{' '}
                <button onClick={() => alert('A new OTP has been sent!')} className="font-semibold text-purple-600 dark:text-purple-400 hover:underline">
                    Resend
                </button>
            </p>
        </div>
    );
};

export default OTPScreen;