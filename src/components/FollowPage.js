import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "../componentsStyle/FollowPage.css"
import Mycontext from '../context/context'
import Default from "../images/default.png"
const FollowPage = () => {
    const a = useContext(Mycontext)
    const {ID} = a
    const navigate = useNavigate()
    const [followers, setfollowers] = useState([])
    const [following, setfollowing] = useState([])
    const user_data = async () => {
        let url = "http://localhost:4000/user/data"
        let data = await fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                Share_Idea_token: localStorage.getItem("Share_your_ideas")
            }
        })
        let res = await data.json()
    }
    const FollowData = async () => {
        let url = "http://localhost:4000/get/following/data"
        let data = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Share_Idea_token: localStorage.getItem("Share_your_ideas")
            }
        })
        let res = await data.json()
        setfollowing(res.following_info)
        let SecondUrl = "http://localhost:4000/get/followers/data"
        let data2 = await fetch(SecondUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Share_Idea_token: localStorage.getItem("Share_your_ideas")
            }
        })
        let res2 = await data2.json()
        setfollowers(res2.followers_info)
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
        user_data()
        FollowData()
    }, [])
    return (
        <div className='main_box'>
            <div className="follow_data_box">
                <p className='heading_msg'>Followers</p>
                <hr />
                {followers.length < 1 ? <div className='follow_msg_container'><p className='follow_info_msg'>You do not have any followers</p></div> :
                    followers.map((e) => {
                      return  <div key={e._id} className="my-2 follow_info_container"><li onClick={()=>{Specific(e.current_user)}}className='follow_info_list my-4'><img src={!e.follower_image || e.follower_image === null ? Default : e.follower_image} className="follow_data_img"></img> {e.followers_username} <span className='msg'>Follows You</span> </li></div>
                    })
                }
    
            </div>
            <div className="following_data_box">
                <p className='heading_msg'>Following</p>
                <hr />
                {following.length < 1 ? <div className='follow_msg_container'><p className='follow_info_msg'>You do not follow any body</p></div>  : following.map((e)=>{
                    return <li className='follow_info_list my-4' onClick={()=>{Specific(e.Other_user)}} ><img src={!e.Other_user_image || e.Other_user_image === null ? Default : e.Other_user_image} className="follow_data_img"></img> <span className='msg'>You Follow</span>  {e.following_username}</li>
                })}
            </div>
        </div>
    )
}

export default FollowPage
