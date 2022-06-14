import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Mycontext from '../context/context'

const FullIdea = () => {
  const a = useContext(Mycontext)
  const { setprogress, ID, username } = a
  const navigate = useNavigate()
  const [data, setdata] = useState({
    username: '',
    title: "",
    idea: "",
    date: "",
    user_id: "",
  })
  const [like, setlike] = useState([])
  const [Comment, setComment] = useState([])
  const fullIDEA = async (id) => {
    setprogress(30)
    let url = `http://localhost:4000/user/specific/idea/${id}`
    let data = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      }
    })
    setprogress(70)
    let res = await data.json()
    setprogress(100)
    setdata(res.idea)
    setlike(res.idea.like)
    setComment(res.idea.comment)
  }
  useEffect(() => {
    fullIDEA(localStorage.getItem("Specific_idea_Id"))
    if (localStorage.getItem("Specific_idea_Id") === null) {
      navigate("/")
    }
    document.title = "Share your ideas- " + username
  }, [])
  const mystyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "auto",
  }
  const newstyle = {
    backgroundColor: "#DDDDDD",
    padding: "10px",
    borderRadius: "5px",
    width: "100%",
    height: "auto",
    marginTop: "5rem"
  }
  const Specific = async (id) => {
    if (ID === id) {
      navigate("/profile")
    } else {
      localStorage.setItem("User_Id(Share_your_ideas)", id)
      navigate("/sprofile")
    }
  }
  const likes = async (id) => {
    if(localStorage.getItem("Share_your_ideas") === null){
      navigate("/signup")
  } else {
    let url = `/like/${id}`
    let like = await fetch(url, {
      method: "PUT",
      headers: {
        Share_Idea_token: localStorage.getItem("Share_your_ideas")
      }
    })
    let res = await like.json()
    setdata(res.Updated)
    setlike(res.Updated.like)
  }
  }
  const unlike = async (id) => {
    if(localStorage.getItem("Share_your_ideas") === null){
      navigate("/signup")
  } else{
    let url = `/unlike/${id}`
    let unlike = await fetch(url, {
      method: "PUT",
      headers: {
        Share_Idea_token: localStorage.getItem("Share_your_ideas")
      }
    })
    let res = await unlike.json()
    setdata(res.Updated)
    setlike(res.Updated.like)
  }
    // let newData = data.map((e) => {
    //     if (e._id === res.Updated._id) {
    //         return res.Updated
    //     } else {
    //         return e
    //     }
    // })
    // setdata(newData)
  }
  const ideaStyle = {
    fontWeight: "500"
  }
  const comment = (id) => {
    navigate("/comment")
    localStorage.setItem("comment_id", id)
  }
  return (
    <div style={mystyle}>
      <div className="container" style={newstyle} >
        <h5 className="username my-4" onClick={() => { Specific(data.user_id) }}>{data.username}</h5>
        <h3 className="title my-4">{data.title}</h3>
        <p className="idea my-4" style={ideaStyle}>{data.idea}</p>
        <p className="date my-4">{!data.date ? "" : data.date}</p>
        {like.includes(username) ? <i className='fa-solid fa-heart' id='this_red' onClick={() => { unlike(data._id) }}  ><span id='likes'>{like.length}</span></i> : <i className='fa-regular fa-heart' onClick={() => { likes(data._id) }} ><span id='likes'>{like.length}</span></i>}
        <i className="fa-regular fa-comment mx-3" onClick={() => { comment(data._id) }} id="comment"><span className='comment_lenght'> {Comment.length} Comment</span></i>
      </div>
    </div>
  )
}

export default FullIdea
