import React, { ReactNode, createContext } from "react";
const UserContext = createContext({ name: "Guest" });

type UserContextType = {
    children: ReactNode;
};

const User = ({ children }: UserContextType) => {
    return (
        <>
            <UserContext.Provider value={{ name: "John" }}>
                {children}
            </UserContext.Provider>
        </>
    );
};

export default User;
