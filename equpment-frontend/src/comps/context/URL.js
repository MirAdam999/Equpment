import React, { createContext, useContext } from 'react';

const URLContext = createContext();

const URLProvider = ({ children }) => {
    const storedURL = 'https://176d-2a06-c701-440a-a400-dcb1-af5e-e4af-be8f.ngrok-free.app';

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
