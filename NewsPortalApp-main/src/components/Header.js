import React, { useState, useEffect } from 'react'
import { removeCurrentUser } from '../shared/users/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUser } from '../shared/users/userSlice'
import Profile from './Profile'
import { Radio } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom';


function Header() {
    const navigate = useNavigate();
    const [radioLabel, setRadioLabel] = useState('')
    const [isHome, setIsHome] = useState()
    const dispatch = useDispatch();

    useEffect(()=>{
        let url = window.location.href;
        if (url.includes('home')){
            setRadioLabel('Show read later');
            setIsHome(true)
        }
        else {
            setRadioLabel('Show home page')
            setIsHome(false);
        }
       // setRadioLabel(url.includes('home')? 'Show read later': 'Show home page')
    }, [])

    const logout = () => {
        dispatch(removeCurrentUser());
    }

    const onRadioChange = ()=>{
        let url = window.location.href;
        if (url.includes('home')) {
            navigate('/readLater')
        }
        else if (url.includes('/readLater')){
            navigate('/home')
        }
    }

    return (
        <div>
            
            <nav>
                <ul className="navItems_left">
                    <Radio toggle label={radioLabel} checked={!isHome} onChange={()=>{onRadioChange()}}></Radio>
                    
                </ul>

                <ul className="navItems_right">
                    <li >Welcome&nbsp;&nbsp; </li>
                    <li className='navItem btnLink'><Profile></Profile></li>
                    <li className='navItem'><button className="logout-button" onClick={logout}>Logout</button></li>
                </ul>

            </nav>
        </div>
    )
}

export default Header
