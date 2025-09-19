import { createContext, useContext, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";


export interface ILoggedInUserProfile {
        _id: string;
        name: string;
        email: string;
        role: "admin" | "seller" | "customer";
        status: "active" | "inactive" | "suspended";
        address: {
           billingAddress: string;
           shippingAddress: string;
        };
        phone: number;
        gender: "male" | "female" | "other";
        dob: Date;
        image: string;
        cretedBy: null | string;
        updtedBy: null | string;
        createdAt: Date;
        updatedAt: string;
        deletedAt: string | null;
};

interface IAuthContext {
    loggedInUser: ILoggedInUserProfile | null;
    setLoggedInUserProfile: Dispatch<SetStateAction<ILoggedInUserProfile | null>>;
}

type AuthProviderProps = {
    children: ReactNode;
};

// 1. Create the AuthContext with default values
export const AuthContext = createContext<IAuthContext>({
    loggedInUser: null,
    setLoggedInUserProfile: () => { }
});

// 2. Create the AuthProvider component
export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [loggedInUser, setLoggedInUserProfile] = useState<ILoggedInUserProfile | null>(null);

    return (
        <AuthContext.Provider value={{ 
                loggedInUser: loggedInUser, 
                setLoggedInUserProfile: setLoggedInUserProfile 
            }}>
            {children}
        </AuthContext.Provider>
    );
};

// 3. Create a custom hook to use the AuthContext
export const useAuth = () => {
    const { loggedInUser, setLoggedInUserProfile } = useContext(AuthContext)

    return { loggedInUser, setLoggedInUserProfile };
};
