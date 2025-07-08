import { useContext, createContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children, value }){
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuthValue(){
    const context = useContext(AuthContext);
    if(context == null){
        throw new Error("useAuthValue must be used within a AuthProvider");
    }
    return context;
}