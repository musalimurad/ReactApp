import React from 'react';
import './footer.scss';
import { Link } from 'react-router-dom';
import bg from '../../assets/footer-bg.jpg';
import logo from '../../assets/tmovie.png';


const Footer = () => {
    return (
        <div className='footer' style={{backgroundImage:`url(${bg})`}}>
            <div className="footer__content container">
                <div className="footer__content__logo">
                <div className="logo">
                <img src={logo}/>
                <Link to="/">MetaFlix</Link>
            </div>
         
                </div>
                <div className="footer__content__menus">
            <div className="footer__content__menu">
                <Link to="/">Home</Link>
                <Link to="/">Contact Us</Link>
                <Link to="/">Term of services</Link>
                <Link to="/">About Us</Link>


            </div>
            <div className="footer__content__menu">
                <Link to="/">Live</Link>
                <Link to="/">Term</Link>
                <Link to="/">FAQ</Link>
                <Link to="/">Premium</Link>


            </div>
            <div className="footer__content__menu">
                <Link to="/">Privacy</Link>
                <Link to="/">You must watch</Link>
                <Link to="/">Recent Release</Link>
                <Link to="/">Top IMDB</Link>


            </div>
            </div>
            </div>
        </div>
    )
}

export default Footer;
