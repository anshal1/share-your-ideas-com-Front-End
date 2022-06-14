import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Mycontext from '../context/context'
import Alert from './Alert'
const Signup = () => {
    const a = useContext(Mycontext)
    const { setloadwidth, setusername } = a
    const navigate = useNavigate()
    const [userdata, setuserdata] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        bio: ""
    })
    const [display, setdisplay] = useState("hidden")
    const [myalert, setmyalert] = useState("")
    const [msgcolor, setmsgcolor] = useState("")
    const alertstyle = {
        width: "100%",
        height: "2rem",
        backgroundColor: "rgba(255, 165, 0, .5)",
        marginTop: ".5rem",
        visibility: display,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "600",
        color: msgcolor
    }
    const chnagedata = (e) => {
        setuserdata({ ...userdata, [e.target.name]: e.target.value })
    }
    const submitandcheck = async (e) => {
        e.preventDefault()
        setloadwidth({
            width: "400px",
            height: "10px"
        })
        if (!userdata.name) {
            setdisplay("visible")
            setmsgcolor("red")
            setmyalert("Name cannot be empty")
        } else if (!userdata.email) {
            setdisplay("visible")
            setmsgcolor("red")
            setmyalert("Email cannot be empty")
        } else if (!userdata.username) {
            setdisplay("visible")
            setmsgcolor("red")
            setmyalert("Username cannot be empty")
        } else if (!userdata.password) {
            setdisplay("visible")
            setmsgcolor("red")
            setmyalert("Password cannot be empty")
        } else {
            let url = "http://localhost:4000/user/signup"
            let data = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ name: userdata.name, username: userdata.username, email: userdata.email, password: userdata.password, bio: userdata.bio })
            })
            let res = await data.json()
            if (res.success === false) {
                setdisplay("visible")
                setmsgcolor("red")
                setmyalert(res.error)
            } else {
                setusername(userdata.username)
                setdisplay("visible")
                setmsgcolor("green")
                setmyalert("Sign in successfull please wait while we redirect you")
                setTimeout(()=>{
                    navigate("/search")
                }, 1200)
                localStorage.setItem("Share_your_ideas", res.token)
            }
        }
        setTimeout(() => {
            setdisplay("hidden")
        }, 2000)
    }
    useEffect(()=>{
        window.onload =()=>{
            navigate("/")
        }
    })
    return (
        <>
            <div className={`${window.innerWidth <= 690 ? "w-100" : "container my-4"}`} id='myform'>
                <Alert style={alertstyle} alertmsg={myalert} />
                <form onSubmit={submitandcheck} className={`${window.innerWidth <= 690 ? "w-100" : "container my-4"}`} encType="multipart/form-data" method='POST' >
                    <div className={`${window.innerWidth <= 690 ? "w-100 container" : "container my-4 w-50"}`}>
                        <label htmlFor="exampleFormControlInput1" className="form-label fw-bold">Name</label>
                        <input type="text" className="form-control border border-2 border-warning" name='name' placeholder='Min-2 characters' minLength={2} id="exampleFormControlInput1" onChange={chnagedata} value={userdata.name} />
                    </div>
                    <div className={`${window.innerWidth <= 690 ? "w-100 container" : "container my-4 w-50"}`}>
                        <label htmlFor="exampleFormControlInput1" className="form-label fw-bold">Username</label>
                        <input type="text" className="form-control border border-2 border-warning" name='username' minLength={3} placeholder='Min-3 characters' id="exampleFormControlInput1" onChange={chnagedata} value={userdata.username} />
                    </div>
                    <div className={`${window.innerWidth <= 690 ? "w-100 container" : "container my-4 w-50"}`}>
                        <label htmlFor="exampleFormControlInput1" className="form-label fw-bold">Email</label>
                        <input type="email" className="form-control border border-2 border-warning" name='email' id="exampleFormControlInput1" onChange={chnagedata} value={userdata.email} />
                    </div>
                    <div className={`${window.innerWidth <= 690 ? "w-100 container" : "container my-4 w-50"}`}>
                        <label htmlFor="exampleFormControlInput1" className="form-label fw-bold">Password</label>
                        <input type="password" className="form-control border border-2 border-warning" name='password' id="exampleFormControlInput1" onChange={chnagedata} value={userdata.password} />
                    </div>
                    <div className={`${window.innerWidth <= 690 ? "w-100 container" : "container my-4 w-50"}`}>
                        <label htmlFor="exampleFormControlInput1" className="form-label fw-bold">Bio</label>
                        <input maxLength={200} type="text" className="form-control border border-2 border-warning h-50" name='bio' placeholder='Max 100 characters' id="exampleFormControlInput1" onChange={chnagedata} value={userdata.bio} />
                    </div>
                    <div className={`${window.innerWidth <= 690 ? "w-100 container my-3" : "container my-4 w-50"}`}>
                        <button className='btn btn-warning' type='submit'><strong>Signup</strong> </button>
                    </div>
                    <div className={`${window.innerWidth <= 690 ? "w-100 container" : "container my-4 w-50"}`}>
                        <p><strong>Already have an account <Link to="/login">Login here</Link></strong></p>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Signup
