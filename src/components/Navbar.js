import React, { useContext, useEffect} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import "../componentsStyle/Navbar.css"
import LoadingBar from "react-top-loading-bar"
import Mycontext from '../context/context'
const Navbar = () => {
    const location = useLocation()
    const a = useContext(Mycontext)
    const { progress, username, setusername, setID } = a
    const getUserData = async () => {
        if (localStorage.getItem("Share_your_ideas") === null) {

        } else {
            let url = "http://localhost:4000/user/data"
            let data = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    Share_Idea_token: localStorage.getItem("Share_your_ideas")
                }
            })
            let res = await data.json()
            setID(res.userid._id)
            setusername(res.userid.username)
            localStorage.setItem("Myusername", res.userid.username)
        }
    }
    useEffect(() => {
        // eslint-disable-next-line
        getUserData()
        // eslint-disable-next-line
        if (localStorage.getItem("Share_your_ideas") === null) {
            setusername("Profile")
        }
        // eslint-disable-next-line
    }, [])
    const navigate = useNavigate()
    const toShare =()=>{
        navigate("/share")
    }
    const Home=()=>{
        navigate("/")
    }
    return (
        <>
            <LoadingBar
                color='#f11946'
                progress={progress}
                height={5}
                transitionTime={200}
            />
            <div className='main_container'>
                <div className="logo_container">
                    <h2 className='heading' onClick={Home}><span className="head_logo"><i className={`fa-solid fa-lightbulb`}></i></span>Share Your Ideas.com</h2>
                </div>
                <div className="nav_btn_container">
                    <ul className="nav_btn">
                        <Link to="/" className='home' ><li className={`nav_item text-${location.pathname === "/" ? "primary" : ""}`}>Home<span className="item_logo"><i className={`fa-solid fa-house-chimney`}></i></span></li></Link>
                        <Link to="/search/user" className='home'><li className={`nav_item text-${location.pathname === "/search/user" ? "primary" : ""}`}>Search<span className="item_logo"><i className={`fa-solid fa-search`}></i></span></li></Link>
                        <Link to="/profile" className='home'> <li className={`nav_item text-${location.pathname === "/profile" ? "primary" : ""}`}>{username}<span className="item_logo"><i className={`fa-solid fa-user`}></i></span> </li></Link>
                        {localStorage.getItem("Share_your_ideas") !== null ? "" : <div className='mydiv'> <Link className='home' to="/signup"><li className="nav_item">Sign up <span className='item_logo'><i className="fa-solid fa-arrow-right-to-bracket"></i></span> </li></Link>

                            <Link className='home' to="/login"><li className="nav_item">Login <span className='item_logo'><i className="fa-solid fa-arrow-right-to-bracket"></i></span> </li></Link> </div>}
                    </ul>
                </div>
            </div>
            <div className='main_phone_navbar_container'>
                <div className="phone_navvbar heading"><p className='phone_nav_bar_heading'onClick={Home}><span><i className={`fa-solid fa-lightbulb fa-1x mx-0`}></i></span> Share your ideas.com</p></div>
                <div className="menu">
                    <i className="fa-solid fa-plus mx-3" id='add_idea_mobile' onClick={toShare} ></i>
                </div>
            </div>
            <div className="menu_options">

            </div>
        </>
    )
}

export default Navbar
