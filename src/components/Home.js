import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import "../componentsStyle/Home.css"
import Ideacontainer from './Ideacontainer'
import Mycontext from '../context/context'
import Myloading from "./Myloading"
import Default from "../images/default.png"
const Home = () => {
    //* this variable checks whether the mobile data is on or not (user is connected to internet or not)
    const a = useContext(Mycontext)
    const { full_idea, setprogress, ID, username } = a
    //* this state is the main state of this component it set all the ideas we fetch from our database
    const [idea, setidea] = useState([])
    // * this state is defined to set loading
    const [loading, setloading] = useState(false)
    // * this state is defined to set the visibility of the add icon 
    const [dis, setdis] = useState("hidden")
    // * this function fetches all the ideas from the database
    const getIdea = async () => {
        //* if the user is connected to internet only then this function will fetch the ideas
        setloading(true)
        let url = "http://localhost:4000/all/ideas"
        setloading(true)
        let data = await fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            }
        })
        setloading(true)
        let res = await data.json()
        setloading(false)
        setidea(res.all_idea)
        if (!res.success) {
        }
    }
    const Specific = async (id) => {
        if (ID === id) {
            navigate("/profile")
        } else {
            localStorage.setItem("User_Id(Share_your_ideas)", id)
            navigate("/sprofile")
        }
    }
    useEffect(() => {
        getIdea()
        setInterval(() => {
            localStorage.removeItem("User_Id(Share_your_ideas)")
            localStorage.removeItem("Specific_idea_Id")
            localStorage.removeItem("Edit_ID(SYD)")
            localStorage.removeItem("comment_id")
        }, 300000)
        // eslint-disable-next-line
        console.log(localStorage.getItem("User_Id(Share_your_ideas"), localStorage.getItem("Specific_idea_Id"), localStorage.getItem("Edit_ID(STD"), localStorage.getItem("comment_id"))
        // eslint-disable-next-line
        document.title = "Share your ideas- " + "Home"
    }, [])
    const navigate = useNavigate()
    const [textval, settextval] = useState("")
    // * this function will redirect the user to the sharing page
    const showfulltext = () => {
        setprogress(50)
        setprogress(70)
        navigate("/share")
        setprogress(100)
    }
    const changeval = (e) => {
        settextval(e.target.value)
    }
    // *
    const all_comment = async (id) => {
        let url = `http://localhost:4000/get/comments/${id}`
        let data = await fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            }
        })
        // eslint-disable-next-line
        let res = await data.json()
    }
    const link_style = {
        width: "60px",
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "fixed",
        bottom: "2rem",
        right: ".3rem",
        zIndex: " 100",
        textDecoration: "none",
        borderRadius: "50%",
        backgroundColor: "#91ff9e",
        border: "4px inset black",
        visibility: dis,
        transition: ".3s"
    }
    const linkstyle = {
        textDecoration: "none",
        color: "#1f1235",
        padding: ".5rem",
        backgroundColor: "#ff6e6c",
        borderRadius: "5px",
        display: "block",
        width: "116px",
        fontWeight: "600"
    }
    const linkstyle2 = {
        textDecoration: "none",
        color: "#1f1235",
        padding: ".5rem",
        backgroundColor: "#ff6e6c",
        borderRadius: "5px",
        display: "none",
        width: "116px",
        fontWeight: "600"
    }
    const msgstyle = {
        textAlign: "center",
        color: "rgb(252,247,94)",
        textShadow: "0px 0px 5px black"

    }
    useEffect(() => {
        // * this function will set the visiblity of the add icon to visible when the user scrolls the current window or page
        window.onscroll = function () { myFunction() };

        function myFunction() {
            if (document.documentElement.scrollTop > 50) {
                setdis('visible')
            } else {
                setdis('hidden')
            }
        }
    })
    const comment = (id) => {
        navigate("/comment")
        localStorage.setItem("comment_id", id)
    }
    const like = async (id) => {
        if(localStorage.getItem("Share_your_ideas") === null){
            navigate("/signup")
        } else {
            let url = `http://localhost:4000/like/${id}`
            let data = await fetch(url, {
                method: "PUT",
                headers: {
                    Share_Idea_token: localStorage.getItem("Share_your_ideas")
                }
            })
            let res = await data.json()
            let newData = idea.map((e) => {
                if (e._id === res.Updated._id) {
                    return res.Updated
                } else {
                    return e
                }
            })
            setidea(newData)
        }
    }
    const unlike = async (id) => {
        if(localStorage.getItem("Share_your_ideas") === null){
            navigate("/signup")
        } else {
            let url = `http://localhost:4000/unlike/${id}`
            let data = await fetch(url, {
                method: "PUT",
                headers: {
                    Share_Idea_token: localStorage.getItem("Share_your_ideas")
                }
            })
            let res = await data.json()
            let newData = idea.map((e) => {
                if (e._id === res.Updated._id) {
                    return res.Updated
                } else {
                    return e
                }
            })
            setidea(newData)
        }
    }
    const ShortCut =(e)=>{
        if(e.target.innerHTML === "Home"){
                navigate("/")
        } else if(e.target.innerHTML === "Search"){
            navigate("/search/user")
        } else {
            navigate("/profile")
        }
    }
    return (
        <>
            {loading === false ? <div className={`${window.innerWidth <= 690  ? "w-100": " container Home_main_container"} `}>
                <div className="idea_share_box mx-3" id='idea'>
                    {/* this textarea is also the same as the link at the bottom */}
                    <textarea onClick={showfulltext} value={textval} onChange={changeval} className={`border border-2 border-warning d-${window.innerWidth <= 690 ? "none" : "block"} my-2`} name="idea" id="idea_box" placeholder='Have an idea? Share here'></textarea>
                </div>
                <div className="idea_container">
                    {/* if idea's state array length is less than 1 then it will show the msg "No ideas to show" and if the ideas's array length is greater than 1 then it will map the idea's array and print it on the homepage */}
                    {idea.length < 1 ? <h1 style={msgstyle}>No ideas to show</h1> : idea.map((e) => {
                        return <Ideacontainer key={e._id} username={e.username} title={e.title} idea={e.idea.length > 200 ? e.idea.slice(0, 400) + "..." : e.idea} linkstyle={e.idea.length > 200 ? linkstyle : linkstyle2} full_idea={() => { full_idea(e._id) }} specific={() => { Specific(e.user_id) }} date={e.date} comment={() => { comment(e._id) }} allcomment={() => { all_comment(e._id) }} like={() => { like(e._id) }} unlike={() => { unlike(e._id) }} like_num={e.like.length} like_dis={e.like.includes(username) ? "none" : "block"} unlike_dis={e.like.includes(username) ? "block" : "none"} comment_length={e.comment.length} profile={!e.Profile_img || e.Profile_img === null ? Default : e.Profile_img} />
                    })}
                </div>
                {/* this link is for sending the user to the idea share page */}
                <Link to="/share" style={window.innerWidth <= 690 ? {} : link_style}><i className="fa-solid fa-3x fa-plus"></i></Link>
                <div>
                    <div className={`bottom_nav_bar d-${window.innerWidth <= 690 ? "block" : "none"}`}>
                        <div className="bottom_navbar_container">
                            <div className="bottom_navbar_options" onClick={ShortCut}>Home</div>
                            <div className="bottom_navbar_options" onClick={ShortCut} id='search'>Search</div>
                            <div className="bottom_navbar_options" onClick={ShortCut}>Profile</div>
                        </div>
                    </div>
                </div>
            </div> : <Myloading />
            }
        </>
    )
}

export default Home
