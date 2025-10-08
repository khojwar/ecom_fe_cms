import { createContext, useContext, useState, type Dispatch, type SetStateAction } from "react";

interface IUserLayoutContext {
    collapsed: boolean;
    setCollapsed: Dispatch<SetStateAction<boolean>>;
}

interface IUserLayoutProviderProps {
    children: React.ReactNode;
}

// 1. Context creation with default values
export const UserLayoutContext = createContext<IUserLayoutContext>({
    collapsed: false, 
    setCollapsed: () => {}
});

// 2. provider setup
export const UserLayoutProvider = ({children}: IUserLayoutProviderProps) => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <>
            <UserLayoutContext.Provider value={{
                collapsed: collapsed, 
                setCollapsed: setCollapsed
                }}>
                {children}
            </UserLayoutContext.Provider>
        </>
    )
}


// 3. custom hook for using the context
export const useUserLayout = () => {
    const { collapsed, setCollapsed } = useContext(UserLayoutContext);
    return { collapsed, setCollapsed };
}

