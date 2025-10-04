import React, { useState } from 'react';
import { differenceInYears } from 'date-fns';

function AgeCalculator() {
    const [birthDate, setBirthDate] = useState('');
    const [age, setAge] = useState('');

    const calculateAge = () => {
        const age = differenceInYears(new Date(), new Date(birthDate));
        setAge(age);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="p-8 bg-white rounded shadow-md">
                <h2 className="text-2xl mb-4">Age Calculator</h2>
                <input 
                    type="date" 
                    value={birthDate} 
                    onChange={(e) => setBirthDate(e.target.value)} 
                    className="mb-4 w-full p-2 border border-gray-300 rounded"
                />
                <button 
                    onClick={calculateAge} 
                    className="w-full py-2 px-4 bg-blue-600 text-white rounded"
                >
                    Calculate Age
                </button>
                {age ? (
                    <p className="mt-4">
                        You are <span className="font-bold">{age}</span> years old.
                    </p>
                ) : null}
            </div>
        </div>
    );
}

export default AgeCalculator;
