import { createContext, useContext } from 'react';

const userContext = createContext(undefined);

export function UserProvider({ children, value }) {
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
    const context = useContext(userContext);
    if(context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }

    return context;
}
