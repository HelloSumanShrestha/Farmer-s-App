import React from 'react'
import '../../assets/css/Header.scss'
import dp from "../../assets/images/saitama.jpg"
import { Dropdown } from '@mui/base/Dropdown';
import { MenuButton } from '@mui/base/MenuButton';
import { Menu } from '@mui/base/Menu';
import { MenuItem } from '@mui/base/MenuItem';

export default function Header({ headerText }) {
    return (
        <div className="header">

            <p className="header-text">
                {headerText}
            </p>

            <Dropdown>
                <MenuButton>
                    <div className="header-user">
                        <div className="user-image">
                            <img src={dp} alt="pfp" />
                        </div>
                        <h3 className="header-username">
                            Suman Shrestha
                        </h3>
                    </div>
                </MenuButton>
                <Menu >
                    <MenuItem onClick={console.log('Log out')}>Log out</MenuItem>
                </Menu>
            </Dropdown>


        </div >
    )
}