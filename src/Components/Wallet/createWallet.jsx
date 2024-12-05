import React, { useState } from "react";
import { createWallet } from "../../services/operations/walletAPI.js";

const CreateWallet = () => {
  const [identificationType, setIdentificationType] = useState("");
  const [identificationNumber, setIdentificationNumber] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [agreed, setAgreed] = useState(false);

  const handleSubmit =  (e) => {
    e.preventDefault();
    createWallet(identificationType, identificationNumber, bankAccount);
    console.log("Form submitted");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Create Wallet
        </h2>
        <p className="text-gray-600 mb-6">
          Please sign in to create your travel wallet.
        </p>

        <button className="w-full bg-black-200 text-white-600 py-2 rounded-lg mb-6 font-semibold">
          Sign In
        </button>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Identification Type
            </label>
            <select
              className="w-full bg-gray-200 text-gray-600 p-3 rounded-lg"
              value={identificationType}
              onChange={(e) => setIdentificationType(e.target.value)}
            >
              <option value="">Passport, Driver's License, National ID</option>
              <option value="passport">Passport</option>
              <option value="drivers-license">Driver's License</option>
              <option value="national-id">National ID</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Identification Number
            </label>
            <input
              type="text"
              placeholder="Enter your identification number"
              className="w-full bg-gray-200 text-gray-600 p-3 rounded-lg"
              value={identificationNumber}
              onChange={(e) => setIdentificationNumber(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bank Account
            </label>
            <input
              type="text"
              placeholder="Enter your bank account number"
              className="w-full bg-gray-200 text-gray-600 p-3 rounded-lg"
              value={bankAccount}
              onChange={(e) => setBankAccount(e.target.value)}
            />
            <p className="text-gray-500 text-sm mt-1">
              This account will be used for transactions.
            </p>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <label className="ml-2 block text-sm text-gray-700">
              I agree to the terms and conditions
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-black py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white"
            disabled={!agreed}
          >
            Create Wallet
          </button>
        </form>

        <p className="text-gray-500 text-sm mt-6">
          Unauthorized access. Please provide the credentials. We are sorry but
          you can only have one wallet.
        </p>

        <div className="mt-6 text-center">
          <p className="text-gray-500">
            Need help?{" "}
            <a href="#" className="text-blue-500">
              Contact support.
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateWallet;
