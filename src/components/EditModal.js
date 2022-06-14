import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Mycontext from '../context/context'

const EditModal = () => {
    const a = useContext(Mycontext)
    const { edit, setedit } = a
    const [alert, setalert] = useState({
        msg: "",
        visible: "invisible"
    })
    const navigate = useNavigate()
    useEffect(() => {
        localStorage.setItem("Edit_ID(SYD)", edit._id)
        window.onload =()=>{
            navigate("/profile")
        }
    })
    const change = (e) => {
        setedit({ ...edit, [e.target.name]: e.target.value })
    }
    const SaveChange = async () => {
        let ID_For_Edit = localStorage.getItem("Edit_ID(SYD)")
        let url = `http://localhost:4000/user/idea/${ID_For_Edit}`
        let data = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Share_Idea_token: localStorage.getItem("Share_your_ideas")
            },
            body: JSON.stringify({ title: edit.title, idea: edit.idea })
        })
        let res = await data.json()
        if (res.success) {
            setalert({
                msg: res.msg,
                visible: "visible"
            })
            setTimeout(()=>{
                navigate("/profile")
            }, 500)
        } else {
            setalert({
                msg: "Something went wrong please reload the page",
                visible: "visible"
            })
        }
    }
    return (
        <>
            <div className="container my-4">
                <div className={`alert alert-success ${alert.visible} my-3`} role="alert">
                    {alert.msg}
                </div>
                <div className=" mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Edit Title</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" name='title' onChange={change} value={edit.title} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Edit Idea</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="10" name='idea' onChange={change} value={edit.idea}></textarea>
                </div>
                <button className='btn btn-warning' onClick={SaveChange} >Save Changes</button>
            </div>

        </>
    )
}

export default EditModal
