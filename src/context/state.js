import { useState } from "react";
import Mycontext from "./context";

const Mystate = (props) => {
    const [progress, setprogress] = useState(0)
    const [ID, setID] = useState(null)
    const [loadwith, setloadwidth] = useState({
        height: "0px",
        width: "0px"
    })
    const [myvalue, setvalue] = useState({
        username: "",
        title: "",
        idea: ""
    })
    const full_idea = async (id) => {
        localStorage.setItem("Specific_idea_Id", id)
    }
    const [loading, setloading] = useState(true)
    const [username, setusername] = useState("")
    // this state is for editing the idea
    const [edit, setedit] = useState({
        title: "",
        idea: ""
    })

    return (
        <Mycontext.Provider value={{ myvalue, setvalue, loadwith, setloadwidth, username, setusername, full_idea, progress, setprogress, loading, setloading, edit, setedit, ID, setID}}>
            {props.children}
        </Mycontext.Provider>
    )
}

export default Mystate