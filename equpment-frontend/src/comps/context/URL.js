import React, { createContext, useContext } from 'react';

const URLContext = createContext();

const URLProvider = ({ children }) => {
    // Detect if running inside Docker (we can use an env variable for this)
    const storedURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
    return (
        <URLContext.Provider
            value={{
                storedURL
            }}
        >
            {children}
        </URLContext.Provider>
    );
};

const useURL = () => useContext(URLContext);

export { URLProvider, useURL };
