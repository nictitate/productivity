
import React, { useState } from 'react';
import { differenceInYears } from 'date-fns';
import './Age.css';
import { UserCircleIcon } from '@heroicons/react/24/outline';

function AgeCalculator() {
    const [birthDate, setBirthDate] = useState('');
    const [age, setAge] = useState('');

    const calculateAge = () => {
        const age = differenceInYears(new Date(), new Date(birthDate));
        setAge(age);
    };

    return (
        <div className="age-container">
            <h2 className="app-title">
                <UserCircleIcon className="app-title-icon" />
                Age Calculator
            </h2>
            <input 
                type="date" 
                value={birthDate} 
                onChange={(e) => setBirthDate(e.target.value)} 
                className="age-input"
            />
            <button 
                onClick={calculateAge} 
                className="app-btn app-btn-primary"
            >
                Calculate Age
            </button>
            {age !== '' ? (
                <p className="age-result">
                    You are <span>{age}</span> years old.
                </p>
            ) : null}
        </div>
    );
}

export default AgeCalculator;
