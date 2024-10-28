import React, { useState, createContext } from 'react';
import Register from './Register'; // Adjust the path as per your file structure

const MultiStepContext = React.createContext();

const StepUserContext = () => {
    const [currentStep, setStep] = useState(1);
    const [userData, setUserData] = useState([]);
    const [finalData, setFinalData] = useState([]);

    return (
        <MultiStepContext.Provider value={{ currentStep, setStep, userData, setUserData, finalData, setFinalData }}>
            <Register />
        </MultiStepContext.Provider>
    );
}

export { MultiStepContext }; // Exporting the context object
export default StepUserContext; // Exporting the context provider component
