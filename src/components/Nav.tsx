import React from 'react';
import { NavBar } from '../styles/NavStyles';
import Logo from './NavBar/Logo';
import StateControl from './NavBar/StateControl';
import {useSelector} from 'react-redux';

const Nav = () => {

  return (
    <div className="d-flex justify-content-between" style={NavBar}>
      <Logo/>
      <StateControl/>
    </div>)
}

export default Nav;