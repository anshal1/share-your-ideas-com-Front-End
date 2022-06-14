import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Mycontext from '../context/context'
import Alert from './Alert'

const Signup = () => {
  const navigate = useNavigate()
  const a = useContext(Mycontext)
  // eslint-disable-next-line
  const { setusername } = a
  const [userdata, setuserdata] = useState({
    username: "",
    email: "",
    password: "",
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
    if (!userdata.email) {
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
      let url = "http://localhost:4000/user/login"
      let data = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({ username: userdata.username, email: userdata.email, password: userdata.password })
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
        setmyalert("Login in successfull please wait while we redirect you")
        localStorage.setItem("Share_your_ideas_username", res.username)
        window.location.reload()
        localStorage.setItem("Share_your_ideas", res.token)
      }
    }
    setTimeout(() => {
      setdisplay("hidden")
    }, 2000)
  }
  useEffect(() => {
    window.onload = () => {
      navigate("/")
    }
  })
  return (
    <>
      <div className={`${window.innerWidth <= 690 ? "container w-100" : "container my-4 w-100"}`} id='myform'>
        <Alert style={alertstyle} alertmsg={myalert} />
        <form onSubmit={submitandcheck} className={`${window.innerWidth <= 690 ? "container w-100" : "container w-75 my-4"}`}>
          <div className={`${window.innerWidth <= 690 ? "w-100 container" : "container my-4 w-50"}`}>
            <label htmlFor="exampleFormControlInput1" className="form-label fw-bold ">Username</label>
            <input type="text" className="form-control border border-2 border-warning" name='username' minLength={3} placeholder='Min-3 characters' id="exampleFormControlInput1" onChange={chnagedata} value={userdata.username} />
          </div>
          <div className={`${window.innerWidth <= 690 ? "w-100 container" : "container my-4 w-50"}`}>
            <label htmlFor="exampleFormControlInput1" className="form-label fw-bold ">Email</label>
            <input type="email" className="form-control border border-2 border-warning" name='email' id="exampleFormControlInput1" onChange={chnagedata} value={userdata.email} />
          </div>
          <div className={`${window.innerWidth <= 690 ? "w-100 container" : "container my-4 w-50"}`}>
            <label htmlFor="exampleFormControlInput1" className="form-label fw-bold ">Password</label>
            <input type="password" className="form-control border border-2 border-warning" name='password' id="exampleFormControlInput1" onChange={chnagedata} value={userdata.password} />
          </div>
          <div className={`${window.innerWidth <= 690 ? "mb-3 container w-100 h-50 my-3" : "mb-3 container w-75 h-50 my-3"} `}>
            <button className='btn btn-warning' type='submit'><strong>Login</strong> </button>
          </div>
          <div className={`${window.innerWidth <= 690 ? "mb-3 container w-100 h-50 my-3" : "mb-3 container w-75 h-50 my-3"} `}>
            <p><strong>Don't have an account <Link to="/signup">Signup here</Link></strong> </p>
          </div>
        </form>
      </div>
    </>
  )
}

export default Signup
