import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import LogoApp from '../assets/image/logo192.png';
import { useLocation , NavLink, useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import { useContext , useEffect, useState} from 'react';
import { UserContext } from '../context/UserContext';
import { useDispatch, useSelector } from 'react-redux';
import { handleLogoutRedux } from '../redux/actions/userAction';

const Header =(props)=>{

  //const { logout, user } = useContext(UserContext);

  //const [hideHeader, setHideHeader] = useState(false);

 // useEffect(()=> {
   // if(window.location.pathname === "/login") {
   //   setHideHeader(true);
   // }
 // }, [])
 const dispatch = useDispatch();
 const user = useSelector(state => state.user.account)
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(handleLogoutRedux());
    //localStorage.removeItem("token");
    // logout();
    // navigate("/");
    // toast.success("logout success !")
  }
  useEffect(()=> {
if(user && user.auth === false && window.location.pathname !== '/login')  {
    navigate("/");
    toast.success("logout success !")
}
  },[user])
  //const location = useLocation();
    return(<>
    
    <Navbar expand="lg" className="bg-body-tertiary" bg="light">
      <Container>
        <Navbar.Brand href="/">
        <img
        src={LogoApp}
        width="30"
        height="30"
        className="d-inline-block align-top"
        alt="React Bootstrap logo"
        />
             <span>React app demo</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {(user && user.auth || window.location.pathname === "/") && 
          <>
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link">Home</NavLink>
            <NavLink to="/users" className="nav-link">Manage Users</NavLink>
            </Nav>
            <Nav>
              {user && user.email && <span className="nav-link"> wellcom : {user.email}</span>}
            <NavDropdown title="Setting" >
              {user && user.auth === true ?
              <NavDropdown.Item onClick={() => handleLogout()}>Logout</NavDropdown.Item>
              : <NavLink to="/login" className="dropdown-item">Login</NavLink>
              }
            </NavDropdown>
          </Nav>
          </>
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>)
}
export default Header;