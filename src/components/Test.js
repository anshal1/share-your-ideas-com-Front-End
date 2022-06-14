import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Test = () => {
  const [file ,setfile] = useState()
  const navigate = useNavigate()
  const ChangeFile = (e) => {
    // setfile(e.target.files[0].name)
    if(e.target.files || e.target){
      setfile(e.target.files[0])
    } else {
      console.log("No file found")
    }
  }
  const Submit= async (e)=>{
      e.preventDefault()
      let mydata = new FormData()
      mydata.append("Profile", file)
      let url = `http://localhost:4000/profile/upload`
      let data = await fetch(url, {
            method: "POST",
            headers:{
              Share_Idea_token: localStorage.getItem("Share_your_ideas")
            },
            body: mydata
        })
        let res = await data.json()
        console.log(res)
  }
  // const fileUpload = () => {
  //   // Create FormData instance
  //   const fd = new FormData();
  //   fd.append('profile', file.name);

  //   // Create XHR rquest
  //   const xhr = new XMLHttpRequest();

  //   // Log HTTP response
  //   xhr.onload = () => {
  //     if (xhr.response) {
  //       console.log(xhr.response)
  //     }
  //   };

  //   // Send XHR reqeust
  //   xhr.open('POST', "http://localhost:4000/profile/upload");
  //   xhr.setRequestHeader("Share_Idea_token", localStorage.getItem('Share_your_ideas'))
  //   xhr.send(fd);
  // };
  useEffect(() => {
    window.onload = () => {
      navigate("/profile")
    }
  })
  return (
    <div className='container my-4'>
        <div className='container'>
          <label htmlFor="formFileLg" className="form-label">Upload Profile Image</label>
          <input className="form-control form-control-lg" id="formFileLg" type="file" name="profile" onChange={ChangeFile} />
        </div>
        <button className='btn btn-warning mx-2 my-3' onClick={Submit}>Upload</button>
    </div>
  )
}

export default Test
