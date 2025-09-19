import { Spin } from "antd";
import { createContext, useContext, useEffect, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import authSvc from "../services/auth.service";


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
    const [loading, setLoading] = useState<boolean>(true);

    const getLoggedInUserProfileDetails = async () => {
        try {
            const userProfileResponse = await authSvc.getLoggedInUserProfile();
            setLoggedInUserProfile(userProfileResponse.data);
        } catch (exception) {
            setLoggedInUserProfile(null);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (token) {
        getLoggedInUserProfileDetails();
        } else {
        setLoading(false);
        }
    }, []);

    return (
        loading ? <div> <Spin fullscreen /> </div> :
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
