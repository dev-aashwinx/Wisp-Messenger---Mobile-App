import React, { useState } from 'react';
import { WispLogo } from './Logo';

interface LoginScreenProps {
    onGetOtp: (phoneNumber: string) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onGetOtp }) => {
    const [phoneNumber, setPhoneNumber] = useState('+91');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        // Ensure the country code prefix is maintained and only numbers are added
        if (value.startsWith('+91') && /^\+91\d*$/.test(value)) {
            setPhoneNumber(value);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Validation for Indian phone number (+91 followed by 10 digits)
        if (phoneNumber.match(/^\+91\d{10}$/)) {
            onGetOtp(phoneNumber);
        } else {
            alert('Please enter a valid 10-digit Indian phone number (e.g., +919876543210).');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-full text-center bg-gray-50 dark:bg-black p-8 rounded-3xl shadow-lg">
            <WispLogo className="w-24 h-24 mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome to Wisp</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
                Connect instantly with your friends and family.
            </p>
            <form onSubmit={handleSubmit} className="w-full mt-8">
                <div className="mb-4">
                    <label htmlFor="phone" className="sr-only">Phone Number</label>
                    <input
                        id="phone"
                        type="tel"
                        value={phoneNumber}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 bg-gray-200 dark:bg-[#2D2D2D] text-gray-900 dark:text-white border border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                        maxLength={13}
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-purple-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-purple-700 transition-all duration-300 transform hover:scale-105"
                >
                    Get OTP
                </button>
            </form>
             <p className="text-xs text-gray-500 dark:text-gray-600 mt-6">
                We'll send a verification code to this number.
            </p>
        </div>
    );
};

export default LoginScreen;