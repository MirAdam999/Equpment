import React, { createContext, useState, useContext } from 'react';

const BranchContext = createContext();

const BranchProvider = ({ children }) => {
    const [branchName, setBranchName] = useState('');
    const [branchID, setBranchID] = useState('');
    const [nextOrder, setNextOrder] = useState('');

    const setCurrentBranchName = (currentBranchName) => {
        setBranchName(currentBranchName);
    };

    const setCurrentBranchID = (currentBranchID) => {
        setBranchID(currentBranchID);
    };

    const setCurrentNextOrder = (currentNextOrder) => {
        setNextOrder(currentNextOrder);
    };

    return (
        <BranchContext.Provider
            value={{
                branchName,
                setCurrentBranchName,
                branchID,
                setCurrentBranchID,
                nextOrder,
                setCurrentNextOrder
            }}
        >
            {children}
        </BranchContext.Provider>
    );
};

const useBranch = () => useContext(BranchContext);

export { BranchProvider, useBranch };
