import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "../componentsStyle/Profile.css"
import Mycontext from '../context/context'
import Alert from "./Alert"
import Ploading from "./Ploading"
import Default from "../images/default.png"
const Profile = () => {
    const navigate = useNavigate()
    const a = useContext(Mycontext)
    const { setedit, setusername, username } = a
    const [data, setdata] = useState([])
    const [follower, setfollower] = useState([])
    const [following, setfollowing] = useState([])
    const [alert, setalert] = useState({
        display: "hidden",
        msgcolor: "red",
        alert_msg: ""
    })
    const [userdata, setuserdata] = useState({
        userid: {
            username: "",
            bio: "",
            email: "",
            name: "",
            _id: "",
            Profile_img: "",
            verified: ""

        },


    })
    const [loading, setloading] = useState(true)
    const user_idea = async () => {
        setloading(true)
        let url = "http://localhost:4000/user/get/notes"
        setloading(true)
        let data = await fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                Share_Idea_token: localStorage.getItem("Share_your_ideas")
            }
        })
        let res = await data.json()
        setloading(false)
        setdata(res.getuser_idea)
    }
    const user_data = async () => {
        setloading(true)
        let url = "http://localhost:4000/user/data"
        setloading(true)
        let data = await fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                Share_Idea_token: localStorage.getItem("Share_your_ideas")
            }
        })
        let res = await data.json()
        setuserdata(res)
        setloading(false)
    }
    // function for getting followers data and following
    const FollowData = async () => {
        setloading(true)
        let url = "http://localhost:4000/get/following/data"
        let data = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Share_Idea_token: localStorage.getItem("Share_your_ideas")
            }
        })
        let res = await data.json()
        let SecondUrl = "http://localhost:4000/get/followers/data"
        let data2 = await fetch(SecondUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Share_Idea_token: localStorage.getItem("Share_your_ideas")
            }
        })
        let res2 = await data2.json()
        setloading(false)
        setfollowing(res.following_info)
        setfollower(res2.followers_info)
    }
    const alertstyle = {
        width: "94%",
        height: "3rem",
        backgroundColor: "rgb(249 255 11)",
        marginTop: "1rem",
        visibility: alert.display,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "600",
        color: alert.msgcolor,
        position: "absolute",
        fontSize: "1.2rem",
        zIndex: "100",
        top: "10rem",
        right: "2rem",
        left: "2rem"
    }
    const Delete = async (id) => {
        const newIdea = data.filter((edIdea) => {
            return edIdea._id !== id
        })
        setdata(newIdea)
        let url = `http://localhost:4000/user/idea/delete/${id}`
        let Mydata = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
                Share_Idea_token: localStorage.getItem("Share_your_ideas")
            }
        })
        let res = await Mydata.json()
        if (res.success === true) {
            setalert({
                display: "visible",
                alert_msg: res.msg,
                msgcolor: "green"
            })
            setTimeout(() => {
                setalert({
                    display: "hidden",
                    alert_msg: "Please Login First"
                })
            }, 2000)
        }
    }
    // * Edit funtion
    const Edit = async (note) => {
        navigate("/edit/idea")
        setedit(note)
    }
    useEffect(() => {
        setTimeout(() => {
            localStorage.removeItem("User_Id(Share_your_ideas)")
            localStorage.removeItem("Specific_idea_Id")
            localStorage.removeItem("Edit_ID(SYD)")
            localStorage.removeItem("comment_id")
        }, 300000)
        if (localStorage.getItem("Share_your_ideas") === null) {
            setalert({
                display: "visible",
                alert_msg: "Please Login First",
                msgcolor: "rgb(255, 0, 0)"
            })
            setTimeout(() => {
                setalert({
                    display: "hidden",
                    alert_msg: "Please Login First"
                })
            }, 2000)
        } else {
            user_idea()
            user_data()
            FollowData()
        }
        document.title = "Profile- " + username
    }, [])
    const Logout = () => {
        if (localStorage.getItem("Share_your_ideas") !== null) {
            localStorage.removeItem("Share_your_ideas")
            navigate("/")
            setusername("Profile")
        }
    }
    const Delete_Account = async (id) => {
        let url = `http://localhost:4000/user/delete/${id}`
        let data = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Share_Idea_token: localStorage.getItem("Share_your_ideas")
            }
        })
        let res = await data.json()
        if (res.success) {
            localStorage.removeItem("Share_your_ideas")
            navigate("/")
            setalert({
                display: "visible",
                msgcolor: "green",
                alert_msg: res.msg
            })
        }
    }
    const like = async (id) => {
        let url = `http://localhost:4000/like/${id}`
        let like = await fetch(url, {
            method: "PUT",
            headers: {
                Share_Idea_token: localStorage.getItem("Share_your_ideas")
            }
        })
        let res = await like.json()
        let newData = data.map((e) => {
            if (e._id === res.Updated._id) {
                return res.Updated
            } else {
                return e
            }
        })
        setdata(newData)
    }
    const unlike = async (id) => {
        let url = `http://localhost:4000/unlike/${id}`
        let unlike = await fetch(url, {
            method: "PUT",
            headers: {
                Share_Idea_token: localStorage.getItem("Share_your_ideas")
            }
        })
        let res = await unlike.json()
        let newData = data.map((e) => {
            if (e._id === res.Updated._id) {
                return res.Updated
            } else {
                return e
            }
        })
        setdata(newData)
    }
    const comment = (id) => {
        navigate("/comment")
        localStorage.setItem("comment_id", id)
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
            <Alert style={alertstyle} alertmsg={alert.alert_msg} />
            {localStorage.getItem("Share_your_ideas") === null ? <h3 className='text-center'>Please <Link className='link' to="/login">Login First</Link></h3> :
                <div className={`${window.innerWidth < 690 ? "w-100" : "container"}`} id='Profile_container'>
                    {loading === true ? <Ploading /> : <div className={`${window.innerWidth < 690 ? "w-100" : "container"}`}>
                        <div className="mainContainer">
                            <div className="name d-flex align-items-center justify-content-center w-100">
                                <p className="user_name">{userdata.userid.name}
                                    <button className={`btn btn-danger rounded fw-bold mx-3 float-end ${window.innerWidth < 690 ? "btn-sm" : ""}`} onClick={Logout}>Logout</button></p>
                            </div>
                            <div className="image_username_bio">
                                <img src={!userdata.userid.Profile_img || userdata.userid.Profile_img === null ? Default : userdata.userid.Profile_img} alt="" id='profile_img' />
                                <p className="username">{userdata.userid.username} <span>{userdata.userid.verified === "true" ? <i className="fa-solid fa-circle-check" id="check"></i> : ""}</span></p>
                                <p className="bio">{!userdata.userid.bio ? "" : userdata.userid.bio}</p>
                            </div>
                            {/* {loading ? <div className="loading_for_follow_data">
                                </div> : <p className="followers mx-2"><span>Ideas</span> <br />{data.length}</p> } */}

                            {/* {loading ? <div className="loading_for_follow_data">
                                </div> : <Link className='toData' to="/follow/data"><p className="followers"><span>Followers</span> <br />{follower.length}</p></Link>}

                                {loading ? <div className="loading_for_follow_data">
                                </div> : <Link to="/follow/data" className='toData' ><p className="following"><span>Following</span> <br /> {following.length}</p></Link>} */}
                            {loading ? <div className="loading_for_follow_data">
                            </div> : <div className="data_box">
                                <div className="idea_lenght_box">
                                    <p className="idea_lenght">Ideas</p>
                                    <p className="length">{data.length}</p>
                                </div>
                                <div className="followers_lenght_box">
                                    <Link className='toData' to="/follow/data"><p className="follower_lenght">Followers</p></Link>
                                    <p className="length">{follower.length}</p>
                                </div>
                                <div className="following_lenght_box">
                                    <Link to="/follow/data" className='toData' ><p className="following_lenght ">Following</p></Link>
                                    <p className="length">{following.length}</p>
                                </div>
                            </div>}
                            <div className="options d-flex align-items-center justify-content-evenly w-100 my-4 fw-bold">
                                <p className='text-danger' onClick={() => { Delete_Account(userdata.userid._id) }}>Delete Account <span><i className="fa-solid fa-eraser"></i></span></p>
                            </div>
                        </div>
                        <hr />
                        {loading ? <div className="loading_for_idea"></div> : <div className={`${window.innerWidth < 690 ? "w-100" : "container"}`}>
                            <h2 className='text-center text-capitalize' id="Direction">Ideas</h2>
                            <hr />
                            {data.length < 1 ? <p className='No_Msg'>No ideas to show <p className='Add_Idea'><Link className='Add_Idea' to="/share">Share Your Ideas Here</Link></p> </p> : data.map((e) => {
                                return <div key={e._id} className={`${window.innerWidth < 690 ? "" : "container my-2"}`}>
                                    <div className="lowercontainer">
                                        <div className="ideas_container">
                                            <div className="upper_container">
                                                <p className='myusername'>{e.username}</p>
                                                <hr />
                                            </div>
                                            <h4 id="Ptitle">{e.title}</h4> <br />
                                            <p id="Pidea">{e.idea}</p>
                                            <div className={`${window.innerWidth < 690 ? "d-flex align-items-center justify-content-center flex-column" : ""}`}>
                                                <div className={`${window.innerWidth < 690 ? "d-flex align-items-center justify-content-start flex-row w-100" : ""}`}>
                                                    {e.like.includes(userdata.userid.username) ? <i className='fa-solid fa-heart mx-2' id='this_red' onClick={() => { unlike(e._id) }} ><span id='likes'>{e.like.length}</span></i> : <i className='fa-regular fa-heart mx-2' onClick={() => { like(e._id) }}><span id='likes'>{e.like.length}</span></i>}
                                                    <i className="fa-regular fa-comment mx-2" onClick={() => { comment(e._id) }} id="comment"><span className='comment_lenght'> {e.comment.length}</span></i>
                                                </div>
                                                <br />
                                                <div className={`${window.innerWidth < 690 ? "d-flex align-items-center justify-content-end flex-row w-100" : ""}`}>
                                                    <i className="fa-solid fa-pencil" onClick={() => { Edit(e) }} ><span id='edit'>Edit</span></i> <br />
                                                    <i className="fa-solid fa-eraser mx-3" onClick={() => { Delete(e._id) }}><span id='delete'>Delete</span></i>
                                                </div>
                                            </div>
                                            <p id="Pdate">{e.date}</p>
                                            <hr />
                                        </div>
                                    </div>
                                </div>
                            })
                            }
                        </div>}
                    </div>}
                </div>}
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

export default Profile
