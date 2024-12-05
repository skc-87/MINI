import React from 'react';

function TransactionStatus() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-md">
        <div className="text-center">
          <h2 className="text-lg font-semibold">Transaction Status</h2>
          <div className="mt-4">
            <div className="bg-gray-100 rounded-md p-4 flex flex-col items-center">
              <div className="text-2xl mb-2">✔️</div>
              <p className="text-lg font-semibold">Status</p>
              <p className="text-gray-500">Transaction Successful</p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex justify-between py-2">
            <p className="text-gray-700">From</p>
            <p className="text-gray-500">User123</p>
          </div>
          <div className="flex justify-between py-2">
            <p className="text-gray-700">To</p>
            <p className="text-gray-500">User456</p>
          </div>
          <div className="flex justify-between py-2">
            <p className="text-gray-700">Amount</p>
            <p className="text-gray-500">$100.00</p>
          </div>
          <div className="flex justify-between py-2">
            <p className="text-gray-700">Transaction Type</p>
            <p className="text-gray-500">Debit</p>
          </div>
          <div className="flex justify-between py-2">
            <p className="text-gray-700">Status</p>
            <p className="text-gray-500">Success</p>
          </div>
          <div className="flex justify-between py-2">
            <p className="text-gray-700">Description</p>
            <p className="text-gray-500">Expenditure</p>
          </div>
        </div>

        <div className="mt-6">
          <button className="w-full py-2 text-white bg-cyan-500 rounded-md">
            Done
          </button>
        </div>

        <div className="mt-6 text-center">
          <h3 className="text-lg font-semibold">Updated Balance</h3>
          <p className="text-gray-500">Your updated balance after this transaction is $900.00.</p>
          <p className="text-gray-500">Please review your transaction history for more details.</p>
        </div>

        <div className="mt-4">
          <button className="w-full py-2 text-white bg-cyan-500 rounded-md">
            Retry
          </button>
        </div>
      </div>
    </div>
  );
}

export default TransactionStatus;
