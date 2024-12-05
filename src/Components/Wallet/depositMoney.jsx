import React from 'react';

const DepositMoney = () => {
    return (
        <div
            className="relative flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
            style={{
                backgroundImage: `url(https://www.pexels.com/photo/brown-wheel-hieroglyphics-1721747/)`,
            }}
        >
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-black opacity-40 blur-sm"></div>
            
            {/* Main Content */}
            <div className="relative bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-lg mx-4">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Deposit Money</h2>
                
                {/* Available Balance */}
                <label className="block text-gray-700 font-medium mb-2">Available Balance</label>
                <input
                    type="text"
                    value="$1,250.00"
                    readOnly
                    className="w-full mb-4 p-3 bg-gray-200 rounded-md text-gray-600 focus:outline-none"
                />
                
                {/* Deposit Amount */}
                <label className="block text-gray-700 font-medium mb-2">Deposit Amount</label>
                <input
                    type="number"
                    placeholder="$500.00"
                    className="w-full mb-4 p-3 bg-gray-200 rounded-md text-gray-600 focus:outline-none"
                />
                
                {/* User Information */}
                <h3 className="text-xl font-semibold text-gray-800 mb-4">User Information</h3>
                
                <label className="block text-gray-700 font-medium mb-2">Card Number</label>
                <input
                    type="text"
                    placeholder="4532 5932 0025 1836"
                    className="w-full mb-4 p-3 bg-gray-200 rounded-md text-gray-600 focus:outline-none"
                />
                
                <div className="flex space-x-4">
                    <div className="w-1/2">
                        <label className="block text-gray-700 font-medium mb-2">Expiration Date</label>
                        <input
                            type="text"
                            placeholder="12/24"
                            className="w-full p-3 bg-gray-200 rounded-md text-gray-600 focus:outline-none"
                        />
                    </div>
                    <div className="w-1/2">
                        <label className="block text-gray-700 font-medium mb-2">CVV</label>
                        <input
                            type="text"
                            placeholder="123"
                            className="w-full p-3 bg-gray-200 rounded-md text-gray-600 focus:outline-none"
                        />
                    </div>
                </div>
                
                {/* Transaction Description */}
                <label className="block text-gray-700 font-medium mb-2 mt-4">Transaction Description</label>
                <input
                    type="text"
                    placeholder="Deposited to Saarthi Wallet"
                    className="w-full mb-6 p-3 bg-gray-200 rounded-md text-gray-600 focus:outline-none"
                />
                
                {/* Deposit Button */}
                <button className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200">
                    Deposit Now
                </button>
                
                {/* Last Transaction */}
                <div className="mt-8">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Last Transaction</h3>
                    <div className="flex justify-between text-gray-700 mb-2">
                        <span>Amount</span>
                        <span>$500.00</span>
                    </div>
                    <div className="flex justify-between text-gray-700 mb-2">
                        <span>Status</span>
                        <span>Success</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                        <span>Description</span>
                        <span>Deposited</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DepositMoney;

