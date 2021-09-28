import React from 'react'
import './Header.css';
import { Link } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const Header = ({state, changed}) => {
    // const [click, setClick] = useState(false);
    // const [dropdown, setDropdown] = useState(false);

    //const closeMobileMenu = () => setClick(false);

    const logouthandler = () => {
        localStorage.clear();
        changed(false)     
    }

    // const onMouseEnter = () => {
    //     if (window.innerWidth < 960) {
    //         setDropdown(false);
    //     } else {
    //         setDropdown(true);
    //     }
    // }

    // const onMouseLeave = () => {
    //     if (window.innerWidth < 960) {
    //         setDropdown(false);
    //     } else {
    //         setDropdown(false);
    //     }
    // }

    // const handleClick = () => {
    //     setClick(!click);
    // }
    return (
        <>
            <div className = "Header1">
                <Link to = '/' className = 'header-logo1'>
                    boostmind
                </Link>
                <li className = 'header-item1'>
                    <Link to = '/categories' className = 'header-links1'>
                        Categories 
                    </Link>
                    {/* {dropdown && <Dropdown />} */}
                </li>
                <div className = 'header__center1'>
                    <SearchIcon/>
                    <input className = 'input' type='text' placeholder = "  Search for anything"/>   
                </div>
                <li className = 'header-item1'>
                    <Link to = '/sign-up' className = 'header-links1'>
                        boostmind for Business
                    </Link>
                </li>
                <li className = 'header-item1'>
                    <Link to = '/sign-up' className = 'header-links1'>
                        Become a Instructor
                    </Link>
                </li>
                <ShoppingCartIcon className = 'icons1'/>
                {state?
                <>
                    <Link to = '/ProfilePage'>
                        <AccountCircleIcon style={{ color:'rgb(61, 61, 61)' }} fontSize = "large"/>
                    </Link>
                    <li className = 'header-item1'>
                        <Link to = '/' className = 'header-links-mobile1' onClick = {logouthandler}>
                            Logout
                        </Link>
                    </li>
                </>:<>
                    <li className = 'header-item1'>
                        <Link to = '/login' className = 'header-links-mobile11'>
                            Login
                        </Link>
                    </li>
                    <li className = 'header-item1'>
                        <Link to = '/signup' className = 'header-links-mobile1'>
                            SignUp
                        </Link>
                    </li>
                </>}
            </div>
        </>
    )
}

export default Header
