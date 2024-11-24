import React, { createContext, useContext } from 'react';

const URLContext = createContext();

const URLProvider = ({ children }) => {
    const storedURL = 'https://4065-2a06-c701-4432-b00-d1a2-93bc-6eef-9339.ngrok-free.app';

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
