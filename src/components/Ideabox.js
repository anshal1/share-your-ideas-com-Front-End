import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Mycontext from '../context/context'
import Alert from './Alert'
import Spinner from './Spinner'
import "../componentsStyle/Ideabox.css"
const Ideabox = () => {
    const navigate = useNavigate()
    const a = useContext(Mycontext)
    const { setvalue } = a
    const [idea, setidea] = useState({
        title: "",
        idea: "",
        category: ""
    })
    const [display, setdisplay] = useState("none")
    const [myalert, setmyalert] = useState("")
    const [msgcolor, setmsgcolor] = useState("")
    const [shoetcutstyle, setshortcutstyle] = useState({
        display: "hidden",
        opacity: "0",
    })
    const [btntext, setbtntext] = useState("Share")
    const mystyle = {
        visibility: shoetcutstyle.display,
        opacity: shoetcutstyle.opacity,
        float: "right",
        clear: "both",
        backgroundColor: "#ff6e6c",
        padding: "6px",
        borderRadius: "3px",
        color: "#1f1235"
    }
    const changeidea = (e) => {
        setidea({ ...idea, [e.target.name]: e.target.value })
    }
    const share = async () => {
        if (idea.title.length < 10 || idea.idea.length < 20) {
            setmyalert("Title must be greater than 10 characters and idea must be greater than 20 character")
            setdisplay("block")
            setmsgcolor("red")
            setTimeout(() => {
                setmyalert("")
                setdisplay("none")
            }, 3000)
        } else if (localStorage.getItem("Share_your_ideas") === null) {
            setmyalert("Please Login first to share your ideas")
            setdisplay("block")
            setmsgcolor("orange")
            setTimeout(() => {
                setmyalert("")
                setdisplay("none")
            }, 3000)
            setshortcutstyle({
                display: "visible",
                opacity: "1"
            })
        }
        else {
            setbtntext(<Spinner />)
            let url = "http://localhost:4000/user/add/notes"
            // eslint-disable-next-line
            let data = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    Share_Idea_token: localStorage.getItem("Share_your_ideas")
                },
                body: JSON.stringify({ title: idea.title, idea: idea.idea, category: idea.category })
            })
            setmyalert("Thank you for sharing your wonderful idea with us")
            setdisplay("block")
            setmsgcolor("green")
            setvalue(idea)
            setTimeout(() => {
                setmyalert("")
                setdisplay("none")
                setbtntext("Share")
                navigate("/")
            }, 1300)
        }
    }
    const alertstyle = {
        width: "100%",
        height: "3rem",
        backgroundColor: "rgba(255, 165, 0, .5)",
        marginTop: "1rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "600",
        color: msgcolor,
        display: display,
    }
    const newstyle = {
        backgroundColor: "#ff6e6c",
        color: "#1f1235"
    }
    const ShortCut = (e) => {
        if (e.target.innerHTML === "Home") {
            navigate("/")
        } else if (e.target.innerHTML === "Search") {
            navigate("/search/user")
        } else {
            navigate("/profile")
        }
    }
    return (
        <>
            <div id='for_idea_share'>
                <Alert style={alertstyle} alertmsg={myalert} />
                <div className="container mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label fw-bold text-dark">Title of your idea</label>
                    <input value={idea.title} onChange={changeidea} minLength={10} type="text" className="form-control" name='title' id="exampleFormControlInput1" placeholder="Example-: Creating a website to share ideas" />
                </div>
                <div className="container mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label fw-bold text-dark">Share your ideas here</label>
                    <textarea className="form-control " name='idea' value={idea.idea} onChange={changeidea} id="exampleFormControlTextarea1" rows="10"></textarea>
                </div>
                <div className="container mb-3 ">
                    <label htmlFor="exampleFormControlInput1" className="form-label fw-bold text-dark" id='tag'>Tag</label>
                    <input value={idea.category} onChange={changeidea} type="text" className="form-control" name='category' id="exampleFormControlInput1" placeholder="Example-: Tech, Food, Entertainment" required={true} />
                </div>
                <div className="container">
                    <button className='btn btn-warning fw-bold text-dark mybtn' style={newstyle} disabled={!idea.title || !idea.idea || !idea.category ? true : false} onClick={share}>{btntext}</button>
                </div>
                <br />
                <p><strong><Link to="/login" style={mystyle}>Login Here</Link></strong> </p>
            </div>
            <div>
                <div className={`bottom_nav_bar d-${window.innerWidth <= 690 ? "block" : "none"}`}>
                    <div className="bottom_navbar_container">
                        <div className="bottom_navbar_options" onClick={ShortCut}>Home</div>
                        <div className="bottom_navbar_options" onClick={ShortCut} id='search'>Search</div>
                        <div className="bottom_navbar_options" onClick={ShortCut}>Profile</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Ideabox
