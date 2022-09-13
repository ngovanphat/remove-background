
import { Button } from 'antd';
import { Link } from 'react-router-dom';


import './Header.css'
import logo from '@/assets/logo.svg'

const Header = () => {
    return (
        <div className='header-landing-page'>
            <div className="header-container">

            <div className="row">
                <div className='header-item row'>
                    <Link to='/'>
                    <img src={logo} alt="Logo" className="logo" />
                    </Link>
                    <div className="nav-row">
                        <Link to='/Home' className='nav-item'>Home</Link>
                        <Link to='/About' className='nav-item ml-30'>About</Link>
                    </div>
                </div>
                <div className='header-item'>
                    <Button type='text' size='large'>Login</Button>
                    <Button type='primary' shape='round' size='large'>Sign Up</Button>
                </div>
            </div>
            </div>
        </div>
    )
};

export default Header;