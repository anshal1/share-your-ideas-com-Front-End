import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Mycontext from '../context/context'
import "../componentsStyle/Search.css"
const Search = () => {
    const a = useContext(Mycontext)
    const { ID } = a
    const [search, setsearch] = useState("")
    const [loading, setloading] = useState(false)
    const Search = (e) => {
        setsearch(e.target.value)
    }
    const [user, setuser] = useState(["123"])
    const Search_user = async () => {
        setloading(true)
        let url = "http://localhost:4000/find/user"
        let data = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username: search })
        })
        let res = await data.json()
        setloading(false)
        setuser(res.User)
    }
    const navigate = useNavigate()
    const Specific = async (id) => {
        if (ID === id) {
            navigate("/profile")
        } else {
            localStorage.setItem("User_Id(Share_your_ideas)", id)
            navigate("/sprofile")
        }
    }
    useEffect(() => {
        // eslint-disable-next-line
        document.title = "Share your ideas-" + "Search-User"
    })
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
            <div className={`Search_container d-${window.innerWidth <= 690 ? "none" : "block"}`}>
                <div className="main_desktop_container">
                    <p className="fw-bold msg_friends">Find Other Users And Become Freind With Them</p>
                    <div className="search_box">
                        <input type="text" className='search_box_text' value={search} onChange={Search} placeholder="Search username" />
                        <button className="btn btn-primary mx-2" onClick={Search_user} disabled={!search || search === null ? true : false} >Search</button>
                        {loading ? <div className="spinner_box"><div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div></div> : <div className="user_box">
                            {user.length < 1 ? <h1 className='text-danger fw-bolder'>No user found</h1> : user.map((e) => {
                                return <h2 key={e._id} onClick={() => { Specific(e._id) }} className="user_found " >{e.username}</h2>
                            })}
                        </div>}
                    </div>
                </div>
            </div>
            <div className={`search_for_mobile d-${window.innerWidth <= 690 ? "block" : "none"}`}>
                <p className="fw-bold text-center my-3">Find Other Users And Become Freind With Them</p>
                <div className="search_box w-100 p-3 d-flex align-items-center justify-content-center flex-column">
                    <input type="text" className='search_box_text w-100' value={search} onChange={Search} placeholder="Search username" />
                    <button className="btn btn-primary my-2" onClick={Search_user} disabled={!search || search === null ? true : false} >Search</button> <hr />
                    {loading ? <div className="spinner_box"><div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div></div> : <div className="user_box">
                        {user.length < 1 ? <h1 className='text-danger fw-bolder'>No user found</h1> : user.map((e) => {
                            return <h2 key={e._id} onClick={() => { Specific(e._id) }} className="user_found " >{e.username}</h2>
                        })}
                    </div>}
                </div>
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

export default Search
