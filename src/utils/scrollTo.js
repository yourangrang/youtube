import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollTo = () => {
    const { pathname } = useLocation(); //url가져옴

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

export default ScrollTo;