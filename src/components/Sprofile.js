import React, { useContext, useEffect, useState } from 'react'
import Mycontext from '../context/context'
import Ploading from './Ploading'
import "../componentsStyle/Sprofile.css"
import { useNavigate } from 'react-router-dom'
import Alert from "./Alert"
import Default from "../images/default.png"
const Sprofile = () => {
    const navigate = useNavigate()
    const a = useContext(Mycontext)
    const { loading, setloading, username } = a
    const [newDis, setnewDis] = useState("hidden")
    const [msg, setmsg] = useState({
        error: ""
    })
    const [btnshow, setbtnshow] = useState({
        follow: "block",
        unfollow: "none"
    })
    const [newData, setnewData] = useState([])
    const [follower, setfollower] = useState([])
    const [following, setfollowing] = useState([])
    const [newuserdata, newsetuserdata] = useState({
        User: {
            name: "",
            username: "",
            email: "",
            bio: "",
            Profile_img: "",
            verified: ''
        },
    })
    const NewSpecific = async (id) => {
        setloading(true)
        let url = `http://localhost:4000/specific/user/${id}`
        let data = await fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            }
        })
        setloading(true)
        let res = await data.json()
        newsetuserdata(res)
        setloading(true)
        let secondUrl = `http://localhost:4000/sprofile/idea/${id}`
        setloading(true)
        let secondData = await fetch(secondUrl, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            }
        })
        setloading(true)
        let secondRes = await secondData.json()
        setloading(true)
        setnewData(secondRes.User_idea)
        setloading(false)
    }
    const user_follow_data = async (id) => {
        let url = `http://localhost:4000/specific/user/follow/data/${id}`
        let data = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
        let res = await data.json()
        setfollowing(res.following_info)
        setfollower(res.followers_info)
    }
    const Follow = async (id) => {
        if (localStorage.getItem("Share_your_ideas") === null) {
            setnewDis("visible")
            setmsg({
                error: "Please Login First To Follow"
            })
            setTimeout(() => {
                setnewDis("hidden")
            }, 1500)
        } else {
            let url = `http://localhost:4000/user/follow/${id}`
            let data = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Share_Idea_token: localStorage.getItem("Share_your_ideas")
                }
            })
            let res = await data.json()
            setbtnshow({
                follow: "none",
                unfollow: "block"
            })
            if (res.success === false) {
                setnewDis("visible")
                setmsg({
                    error: res.error
                })
                setTimeout(() => {
                    setnewDis("hidden")
                }, 1200)
            }
        }
    }
    const UnFollow = async (id) => {
        if (localStorage.getItem("Share_your_ideas") === null) {
            setnewDis("visible")
            setmsg({
                error: "Please Login First To Follow"
            })
            setTimeout(() => {
                setnewDis("hidden")
            }, 1500)
        } else {
            let url = `http://localhost:4000/user/unfollow/${id}`
            let data = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Share_Idea_token: localStorage.getItem("Share_your_ideas")
                }
            })
            let res = await data.json()
            setbtnshow({
                follow: "block",
                unfollow: "none"
            })
        }
    }

    //  this is only for showing the follow and unfollow text in the btn
    const Btn_text = async (id) => {
        if (localStorage.getItem("Share_your_ideas") === null) {

        } else {
            let url = `http://localhost:4000/following/msg/${id}`
            let data = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Share_Idea_token: localStorage.getItem("Share_your_ideas")
                }
            })
            let res = await data.json()
            if (res.success) {
                setbtnshow({
                    follow: "none",
                    unfollow: "block"
                })
            } else {
                setbtnshow({
                    follow: "block",
                    unfollow: "none"
                })
            }
        }
    }

    useEffect(() => {
        NewSpecific(localStorage.getItem("User_Id(Share_your_ideas)"))
        user_follow_data(localStorage.getItem("User_Id(Share_your_ideas)"))
        Btn_text(localStorage.getItem("User_Id(Share_your_ideas)"))
        if (localStorage.getItem("User_Id(Share_your_ideas)") === null) {
            navigate("/")
        }
        document.title = "Share your ideas- " + "User"
    }, [])
    const mystyle = {
        width: "100%",
        height: "3rem",
        backgroundColor: "rgba(255, 165, 0, .5)",
        marginTop: "1rem",
        visibility: newDis,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "600",
        color: "red",
        position: "sticky",
        top: "5rem"
    }
    const like = async (id) => {
        if(localStorage.getItem("Share_your_ideas") === null){
            navigate("/signup")
        } else {
            let url = `http://localhost:4000/like/${id}`
            let like = await fetch(url, {
                method: "PUT",
                headers: {
                    Share_Idea_token: localStorage.getItem("Share_your_ideas")
                }
            })
            let res = await like.json()
            let NewData = newData.map((e) => {
                if (e._id === res.Updated._id) {
                    return res.Updated
                } else {
                    return e
                }
            })
            setnewData(NewData)
        }
    }
    const unlike = async (id) => {
        if(localStorage.getItem("Share_your_ideas") === null){
            navigate("/signup")
        } else {
            let url = `http://localhost:4000/unlike/${id}`
            let unlike = await fetch(url, {
                method: "PUT",
                headers: {
                    Share_Idea_token: localStorage.getItem("Share_your_ideas")
                }
            })
            let res = await unlike.json()
            let NewData = newData.map((e) => {
                if (e._id === res.Updated._id) {
                    return res.Updated
                } else {
                    return e
                }
            })
            setnewData(NewData)
        }
    }
    const comment = (id) => {
        navigate("/comment")
        localStorage.setItem("comment_id", id)
    }
    return (
        <>
            <Alert style={mystyle} alertmsg={msg.error} />
            {loading === true ? <Ploading /> : <div id='mycontainer'>
                <div className="mainContainer">
                    <div className="name">
                        <p className="user_name">{newuserdata.User.name}</p>
                    </div>
                    <div className="image_username_bio">
                        <img src={!newuserdata.User.Profile_img || newuserdata.User.Profile_img === null ? Default : newuserdata.User.Profile_img} alt="" id='profile_img' />
                        <p className="username">{newuserdata.User.username} <span>{newuserdata.User.verified === "true" ? <i className="fa-solid fa-circle-check" id="check"></i> : ""}</span></p>
                        <p className="bio">{!newuserdata.User.bio ? "" : newuserdata.User.bio}</p>
                    </div>
                    {loading ? <div className="loading_for_follow_data">
                    </div> : <div className="data_box">
                        <div className="idea_lenght_box">
                            <p className="idea_lenght">Ideas</p>
                            <p className="length">{newData.length}</p>
                        </div>
                        <div className="followers_lenght_box">
                            <p className="follower_lenght">Followers</p>
                            <p className="length">{follower.length}</p>
                        </div>
                        <div className="following_lenght_box">
                            <p className="following_lenght ">Following</p>
                            <p className="length">{following.length}</p>
                        </div>
                    </div>} <br />
                </div>
                <div className="follow_btn d-flex align-items-center justify-content-around">
                    <div className="follow_data d-flex align-items-center justify-content-around">
                        <div className={`follow d-${btnshow.follow}`}>
                            <button className={`btn btn-primary d-${newuserdata.User.username === username ? "none" : "block"} fw-bold`} id="mybtn" onClick={() => { Follow(newuserdata.User._id) }} >Follow</button>
                        </div>
                        <div className={`unfollow d-${btnshow.unfollow}`}>
                            <button className={`btn btn-primary d-${newuserdata.User.username === username ? "none" : "block"} fw-bold`} id="mybtn" onClick={() => { UnFollow(newuserdata.User._id) }} >Unfollow</button>
                        </div>
                    </div>
                </div>
                <hr />
                <div className='container'>
                    {newData.length < 1 ? <h1 style={{ textAlign: "center" }} >No ideas to show</h1> : newData.map((e) => {
                        return <div key={e._id} className="container my-3">
                            <div className="lowercontainer">
                                <div className="ideas_container">
                                    <div className="upper_container">
                                        <p className='myusername'>{e.username}</p>
                                        <hr />
                                    </div>
                                    <h4 id="Ptitle">{e.title}</h4> <br />
                                    <p id="Pidea">{e.idea}</p> <br />
                                    <p id="Pdate">{e.date}</p> <br />
                                    {e.like.includes(username) ? <i className='fa-solid fa-heart mx-2' id='this_red' onClick={() => { unlike(e._id) }} ><span id='likes'>{e.like.length}</span></i> : <i className='fa-regular fa-heart mx-2' onClick={() => { like(e._id) }}><span id='likes'>{e.like.length}</span></i>}
                                    <i className="fa-regular fa-comment mx-2" onClick={() => { comment(e._id) }} id="comment"><span className='comment_lenght'> {e.comment.length} Comment</span></i>
                                </div>
                            </div>
                            <hr />
                        </div>

                    })
                    }
                </div>
            </div>}
        </>
    )
}

export default Sprofile
