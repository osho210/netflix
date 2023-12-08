import {useState, useEffect} from 'react';

type Props = {
    className?: string;
}

export const Nav = ({ className }: Props) => {
    const [show, handleShow] = useState(false);
    useEffect(() => {
        const checkScroll = () => {
            if (window.scrollY > 100) {handleShow(true);}
            else {handleShow(false);}
        }
        window.addEventListener('scroll', checkScroll);
        return () => window.removeEventListener('scroll', checkScroll);

    }, []);
    return (
        <div className={`nav ${show && 'nav-black'} ${className}`}>
            <img className='nav-logo' src='https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg' alt='Netflix Logo' />
            <img className='nav-avater' src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png' alt='Netflix Avatar' />
        </div>
    )
}