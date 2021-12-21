import {useState} from "react";
import {useDispatch} from "react-redux";
import {login} from "../../redux/apiCalls";
import {useHistory} from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const history = useHistory();

    const handleClick = (e) => {
        e.preventDefault();
        login(dispatch, {email, password});
        history.push('/');
    };

    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh"}}>
            <input style={{marginBottom: "20px", padding: "10px"}} type="text" placeholder="email" onChange={e=>setEmail(e.target.value)} />
            <input style={{marginBottom: "20px", padding: "10px"}} type="password" placeholder="password" onChange={e=>setPassword(e.target.value)}/>
            <button style={{padding: "10px", width: "100px"}} onClick={handleClick}>Login</button>
        </div>
    )
}

export default Login
