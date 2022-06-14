import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import "../componentsStyle/Ideacontainer.css"
const Ideacontainer = (props) => {
    useEffect(() => {
        props.allcomment()
        // eslint-disable-next-line
    }, [])
    return (
        <>
            {/* <div className='my-3'>
                <div className="card">
                    <h5 className="card-header" onClick={props.specific} style={usernamestyle} > {props.username} </h5>
                    <div className="card-body">
                        <p className="card-title fw-bolder text-decoration-underline my-1" id='heading'>{props.title}</p>
                        <p className="card-text overflow-hidden fw-bold my-3" id='text' style={style}>{props.idea}</p>
                        <p className="date">{props.date}</p>
                        <div className="others d-flex align-items-center">
                            <Link to="/fullidea" style={props.linkstyle} onClick={props.full_idea} >Read full idea</Link>
                            <i className="fa-regular fa-comment mx-2"></i>
                        </div>
                    </div>
                </div>
            </div>  */}
            <div className={`my-2 main_idea_container_desktop d-${window.innerWidth <= 690 ? "none" : "block"}`}>
                <div className="lowercontainer">
                    <div className="ideas_container p-5">
                        <div className="upper_container" id="img_and_username">
                            <p className='myusername' id='myid' onClick={props.specific}> <img src={props.profile} id="home_profile" alt="" /> {props.username}</p>
                        </div>
                        <hr />
                        <h4 id="Ptitle">{props.title}</h4> <br />
                        <p id="Pidea">{props.idea}</p>
                        <p id="Pdate">{props.date}</p>
                        <p className="num">{props.num}</p>
                        <div className="others d-flex align-items-center">
                            <Link to="/fullidea" style={props.linkstyle} onClick={props.full_idea} >Read full idea</Link>
                            <i className={`fa-regular fa-heart mx-2 d-${props.like_dis}`} onClick={props.like}><span className='number'>{props.like_num}</span></i>
                            <i className={`fa-solid fa-heart mx-2 d-${props.unlike_dis}`} id="liked" onClick={props.unlike}><span className='number'>{props.like_num}</span></i>
                            <i className="fa-regular fa-comment mx-2" onClick={props.comment} id="comment"><span className='comment_lenght'> {props.comment_length} Comment</span></i>
                        </div>
                    </div>
                </div>
                <hr />
            </div>
            <div className={`main_mobile_container d-${window.innerWidth <= 690 ? "block" : "none"} p-3`}>
                <div className="mobile_profile_username_container">
                    <img src={props.profile} alt="" id='mobile_image' />
                    <p className="mobile_username" onClick={props.specific}>{props.username}</p>
                </div>
                <hr />
                <div className="mobile_title_container">
                    <p className="mobile_title">{props.title}</p>
                </div>
                <div className="mobile_idea-container">
                    <p className="mobile_idea">{props.idea} <Link to="/fullidea" id="full_idea_link"onClick={props.full_idea} className={`d-${props.idea.length < 200 ? "none" : "block"}`} >Read full idea</Link> </p>
                </div>
                <div className="mobile_others">
                    <div className="one_group d-flex">
                        <i className={`fa-regular fa-heart mx-2 d-${props.like_dis}`} onClick={props.like}><span className='number'>{props.like_num}</span></i>
                        <i className={`fa-solid fa-heart mx-2 d-${props.unlike_dis}`} id="liked" onClick={props.unlike}><span className='number'>{props.like_num}</span></i>
                        <i className="fa-regular fa-comment mx-2" onClick={props.comment} id="comment"><span className='comment_lenght'> {props.comment_length}</span></i>
                    </div>
                </div>
                <br />
                <div className="mobile_date">
                    {props.date}
                </div>
                <hr />
            </div>
        </>
    )
}

export default Ideacontainer
