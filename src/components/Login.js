import { useEffect, useState, useContext } from "react";
import { loginApi } from "../service/UserService";
import { Toast } from "bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from '../context/UserContext';
import { handleLoginRedux } from "../redux/actions/userAction";
import { useDispatch, useSelector} from "react-redux";
const Login = () => {
    //const { loginContext } = useContext(UserContext);
const navigate = useNavigate();
const dispatch = useDispatch();

    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isShowPassword, setisShowPassword] = useState(false);
    const isLoading = useSelector(state => state.user.isLoading);
    const account = useSelector(state => state.user.account);
    //const [loadingApi,setloadingApi]= useState(false);
    // useEffect(() => {
    //     let token =localStorage.getItem("token");
    //     if(token){
    //         navigate("/");
    //     }
    // },[])
    const handlePressEnter = (event) => {
console.log(event)
if(event && event.key === "Enter") {
    handleLogin();
}
    }
    useEffect(()=> {
        if(account && account.auth === true)
        navigate("/");
    },[account])
    const handleLogin = async() => {
        if (!email || !password) {
            Toast.console.error("email/password is required !");
            return;
        }
        //setloadingApi(true);
        dispatch(handleLoginRedux(email, password));
        // let res = await loginApi(email.trim(), password);
        // if(res && res.token) {
        //     loginContext(email, res.token);
        //     navigate("/");

        // } else {
        //     if(res && res.status === 400) {
        //         toast.error(res.data.error);
        //    }
        // }
        //setloadingApi(false);
    }
    const handleGoBack =()=> {
        navigate("/");
    }
    return(<>
    <div className="login-container col-12 col-sm-4">
        <div className="tittle">Login</div>
        <div className="text">Email or username     eve.holt@reqres.in</div>
        <input type="text" placeholder="Email or username"
        value={email}
        onChange={(event)=> setEmail(event.target.value)}
        />
        <div className="input-2">
         <input type={isShowPassword === true ? "text":"password" } placeholder="Password"
         value={password}
         onChange={(event)=> setPassword(event.target.value)}
         onKeyDown={(event)=> handlePressEnter(event)}
         />
         <i className={isShowPassword === true ? "fa-sharp fa-solid fa-eye":"fa-sharp fa-solid fa-eye-slash"}
         onClick={() => setisShowPassword(!isShowPassword)}
         ></i>
         </div>
         <button className={email && password ? "active" : ""}
         disabled={email && password ? false :true}
         onClick={() => handleLogin()}
         >
            {isLoading && <i className="fa-solid fa-sync fa-spin"></i>}
            &nbsp;
            Login</button>
<div className="back">
    <span onClick={()=> handleGoBack()}> Go Back</span>

</div>
    </div>
    </>)
}
export default Login;