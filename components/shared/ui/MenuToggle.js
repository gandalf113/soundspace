import React from 'react';
import { motion, useAnimation } from 'framer-motion';

const path01Variants = {
    open: { d: 'M3.06061 2.99999L21.0606 21' },
    closed: { d: 'M0 9.5L24 9.5' },
}

const path02Variants = {
    open: { d: 'M3.00006 21.0607L21 4.06064' },
    moving: { d: 'M0 14.5L24 14.5' },
    closed: { d: 'M0 14.5L24 14.5' },
}

const path03Variants = {
    open: { d: 'M3.06061 2.99999L21.0606 21' },
    closed: { d: 'M0 19.5L24 19.5' },
}

/**
 * This toggles the Hambuger Menu
 */
const MenuToggle = ({ isHamburgerMenuOpen, toggleHamburgerMenu }) => {
    const path01Controls = useAnimation();
    const path02Controls = useAnimation();
    const path03Controls = useAnimation();

    const handleClick = async () => {
        toggleHamburgerMenu();

        // start animation
        if (!isHamburgerMenuOpen) {
            await path02Controls.start(path02Variants.moving);
            path01Controls.start(path01Variants.open);
            path02Controls.start(path02Variants.open);
            path03Controls.start(path02Variants.open);
        } else {
            path01Controls.start(path01Variants.closed);
            path03Controls.start(path03Variants.closed);
            await path02Controls.start(path02Variants.moving);
            path02Controls.start(path02Variants.closed);
        }
    }

    return (
        // <button className='sm:hidden' onClick={toggleHamburgerMenu}>
        //     <AiOutlineMenu />
        // </button>
        <button onClick={handleClick} className='sm:hidden'>
            <svg width='24' height='24' viewBox='0 0 24 24'>
                <motion.path
                    {...path01Variants.closed}
                    animate={path01Controls}
                    transition={{ duration: 0.2 }}
                    stroke='#FFFFFF'
                />
                <motion.path
                    {...path02Variants.closed}
                    animate={path02Controls}
                    transition={{ duration: 0.2 }}
                    stroke='#FFFFFF'
                />
                <motion.path
                    {...path03Variants.closed}
                    animate={path03Controls}
                    transition={{ duration: 0.2 }}
                    stroke='#FFFFFF'
                />
            </svg>
        </button>
    )
}

export default MenuToggle