import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "../componentsStyle/comment.css"
import Default from "../images/default.png"
import CommentLoad from './CommentLoad'
import Mycontext from '../context/context'
const Comment = () => {
    const navigate = useNavigate()
    const a = useContext(Mycontext)
    const { ID, username } = a
    const [loading, setloading] = useState(true)
    const [comment, setcomment] = useState("")
    const [alert, setalert] = useState({
        dis: "none",
        msg: ""
    })
    const [idea, setidea] = useState({
        username: "",
        title: "",
        idea: "",
        date: ""
    })
    const Ideas = []
    const [allComment, setallComment] = useState(Ideas)
    const all_comment = async (id) => {
        if (localStorage.getItem("comment_id") !== null) {
            let url = `http://localhost:4000/get/comments/${id}`
            let data = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                }
            })
            let res = await data.json()
            setallComment(Ideas.concat(res.find_comment))
        } else {
            navigate("/")
        }
    }
    const Idea_for_comment = async (id) => {
        if (localStorage.getItem("comment_id") !== null) {
            let url = `http://localhost:4000/user/specific/idea/${id}`
            let data = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                }
            })
            let res = await data.json()
            setidea(res.idea)
            setloading(false)
        } else {
            navigate("/")
        }
    }
    useEffect(() => {
        all_comment(localStorage.getItem("comment_id"))
        Idea_for_comment(localStorage.getItem("comment_id"))
        window.onload = () => {
            if (localStorage.getItem("comment_id") === null) {
                navigate("/")
            }
        }
        if (localStorage.getItem("comment_id") === null) {
            navigate("/")
        }
        document.title = "Share your ideas- " + "Comments"
    }, [])
    const changeComment = (e) => {
        setcomment(e.target.value)
    }
    const addComment = async (id) => {
        if (localStorage.getItem("Share_your_ideas") !== null) {
            let url = `http://localhost:4000/comment/${id}`
            let data = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    Share_Idea_token: localStorage.getItem("Share_your_ideas")
                },
                body: JSON.stringify({ comment_body: comment })
            })
            let res = await data.json()
            setcomment("")
            let url2 = `http://localhost:4000/get/comments/${id}`
            let data2 = await fetch(url2, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                }
            })
            let res2 = await data2.json()
            setallComment(Ideas.concat(res2.find_comment))
        } else {
            setalert({
                dis: "block",
                msg: "Please Login First"
            })
            setTimeout(() => {
                setalert({
                    dis: "none",
                    msg: "Please Login First"
                })
            }, 2000)
        }
    }
    const Delete = async (id) => {
        const NewComment = allComment.filter((e) => {
            return e._id !== id
        })
        setallComment(NewComment)
        let url = `http://localhost:4000/comment/delete/${id}`
        let data = await fetch(url, {
            method: "DELETE",
            headers: {
                Share_Idea_token: localStorage.getItem("Share_your_ideas")
            }
        })
        let res = await data.json()
        console.log(res)
    }
    const Specific = async (id) => {
        if (ID === id) {
            navigate("/profile")
        } else {
            localStorage.setItem("User_Id(Share_your_ideas)", id)
            navigate("/sprofile")
        }
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
            {loading ? <CommentLoad /> : <div className={`${window.innerWidth <= 690 ? "" : 'container my-3'}`}>
                <div className={`alert alert-danger d-${alert.dis}`} role="alert">
                    {alert.msg}
                </div>
                <div className="idea_container">
                    <div className={`${window.innerWidth <= 690 ? "" : 'container my-2'}`}>
                        <div className="lowercontainer">
                            <div className="ideas_container">
                                <div className="upper_container">
                                    <p className='myusername' id='myid' onClick={() => { Specific(idea.user_id) }}>{idea.username}</p>
                                    <hr />
                                </div>
                                <h4 id="Ptitle">{idea.title}</h4> <br />
                                <p id="Pidea">{idea.idea}</p> <br />
                                <p id="Pdate">{idea.date.slice(0, 10)}</p> <br />
                            </div>
                        </div>
                        <hr />
                    </div>
                </div>
                <div className="container">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Your Comment</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" value={comment} onChange={changeComment}></textarea>
                    <button className="addcomment fw-bolder btn btn-warning" disabled={!comment || comment.length < 5 ? true : false} onClick={() => { addComment(localStorage.getItem("comment_id")) }}>Add Comment</button>
                </div>
                <hr />
                {allComment.length < 1 ? <p className="all_comments_heading">No Comments</p> : <div className="allcomments w-100">
                    {allComment.map((e) => {
                        return <div key={e._id} className="comment_box">
                            <div className="image_username w-100">
                                <img src={Default} alt="" id='comment_img' />
                                <p className="commented_username fw-bolder">{e.username_of_commenter}</p>
                            </div>
                            {e.username_of_commenter === username ? <div className="btn-group float-end">
                                <button className="btn btn-warning btn-sm  dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                </button>
                                <ul className="dropdown-menu">
                                    <li className='mx-2 fw-bold' onClick={() => { Delete(e._id) }}>Delete <i className='fa-solid fa-eraser'></i> </li>
                                </ul>
                            </div> : ""}

                            <div className="comment w-100">
                                <p className="comment_body">
                                    {e.comment_body}
                                </p>
                                <p className="date_body">
                                    {e.date}
                                </p>
                                <hr />
                            </div>
                        </div>
                    })}
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

export default Comment
