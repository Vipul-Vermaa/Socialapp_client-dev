import React, { useEffect } from 'react'
import './styles/app.scss'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './components/Home/Home'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import CreatePost from './components/Post/CreatePost'
import ChangePassword from './components/Profile/ChangePassword'
import Profile from './components/Profile/Profile'
import UpdateProfile from './components/Profile/UpdateProfile'
import { useDispatch, useSelector } from 'react-redux'
import {loadUser} from './redux/actions/user'
import Navbar from './components/Header/Navbar'
import {toast} from 'react-hot-toast'
import User from './components/User/User'


function App() {

  const {isAuthenticated,user,message,error}= useSelector((state)=>state.user)

  const dispatch=useDispatch()
  useEffect(() => {
    if(error){
      toast.error(error)
      dispatch({type:'clearError'})
    }
    if(message){
      toast.success(message)
      dispatch({type:'clearMessage'})
    }
  }, [dispatch,error,message])

  useEffect(()=>{
    dispatch(loadUser)
  },[dispatch])
  

  

  return (
    <Router>
      {isAuthenticated && <Navbar/>}
    
      <Routes>
        <Route path='/' element={isAuthenticated? <Home/> : <Login/> } />

        <Route path='/login' element={<Login/>} />

        <Route path='/register' element={ isAuthenticated ?<Profile/>:<Register/>} />

        <Route path='/createpost' element={isAuthenticated ?<CreatePost/>:<Login/>} />

        <Route path='/changepassword' element={isAuthenticated ?<ChangePassword/>:<Login/>} />

        <Route path='/profile' element={  isAuthenticated ? <Profile/>:<Login/>} />

        <Route path='/profile/:id' element={isAuthenticated ?<Profile/>:<Login/>} />

        <Route path='/updateprofile' element={isAuthenticated ?<UpdateProfile/>:<Login/>} />

      </Routes>
    </Router>
  )
}

export default App
