import { useEffect, useState } from 'react';
import './App.scss';
import Header from './components/Header';
import Container from 'react-bootstrap/Container';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';
import { UserContext } from './context/UserContext';
import AppRoute from './routes/AppRoute';
import { useDispatch, useSelector } from 'react-redux';
import { handleRefresh } from './redux/actions/userAction';
function App() {
  const dispatch = useDispatch();
  //const dataUserRedux = useSelector(state => state.user.account);
// const { user , loginContext } = useContext(UserContext);
// console.log(user)
useEffect(() => {
  if(localStorage.getItem("token")) {
    dispatch(handleRefresh());
    //loginContext(localStorage.getItem("email"), localStorage.getItem("token"))
  }
}, [])

  return (
    <>
    <div className='app-container'>
<Header/>
<Container>
  <AppRoute/>
</Container>
    </div>
    </> 
  );
}

export default App;
<ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
    />