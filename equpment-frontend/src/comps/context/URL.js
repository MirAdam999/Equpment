import React, { createContext, useContext } from 'react';

const URLContext = createContext();

const URLProvider = ({ children }) => {
    const storedURL = 'https://d6fc-2a06-c701-4421-7b00-3cb0-41e5-b9ba-51ff.ngrok-free.app';

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
