import { createContext, useContext } from "react";
import { useLocalObservable, enableStaticRendering } from "mobx-react-lite";

enableStaticRendering(!process.window);

const StoreContext = createContext();
export const StoreProvider = ({ initialValue, children }) => {
    const store = useLocalObservable(() => initialValue); // TODO
    
    return (
        <StoreContext.Provider value={store}>
            {children}
        </StoreContext.Provider>
    )
}

export const useStore = () => {
    const store = useContext(StoreContext); 
    if (!store) {
        throw new Error("useStore must be used within a StoreProvider.");
    }
    return store;
}
