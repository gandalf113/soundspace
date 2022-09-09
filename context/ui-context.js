import { createContext, useState } from "react";

export const UIContext = createContext({});

const UIProvider = (props) => {
    const [hamburgerMenuIsOpen, setHamburgerMenuIsOpen] = useState(false);

    const toggleHamburgerMenu = () => setHamburgerMenuIsOpen(!hamburgerMenuIsOpen);

    return (<UIContext.Provider value={{ hamburgerMenuIsOpen, toggleHamburgerMenu }}>
        {props.children}
    </UIContext.Provider>)
}

export default UIProvider;