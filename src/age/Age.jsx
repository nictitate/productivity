import React, { useState } from 'react';
import { differenceInYears } from 'date-fns';
import './Age.css';

function AgeCalculator() {
    const [birthDate, setBirthDate] = useState('');
    const [age, setAge] = useState('');

    const calculateAge = () => {
        const age = differenceInYears(new Date(), new Date(birthDate));
        setAge(age);
    };

    return (
        <div className="age-container">
            <h2 className="age-title">Age Calculator</h2>
            <input 
                type="date" 
                value={birthDate} 
                onChange={(e) => setBirthDate(e.target.value)} 
                className="age-input"
            />
            <button 
                onClick={calculateAge} 
                className="age-btn"
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
