import './App.css';
import "materialize-css"
// import "materialize-css/dist/css/materialize.min.css";
import Home from './components/Home';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import PageNotFound from './components/PageNotFound';
import Signup from './components/Signup';
import Signin from './components/Signin';
import CreatePost from './components/CreatePost';
import Profile from './components/Profile';
import { useContext } from 'react';
import { createContext } from 'react';
import { useEffect } from 'react';
import { useReducer } from 'react';
import { initalState, reducer } from './reducers/useReducer';
import { ToastContainer } from 'react-toastify';
import UserProfile from './components/UserProfile';

// function App() {
//   return (
//     <>
//       <Navbar />
//       <Router>
//         <Routes>
//           <Route path='/' element={<Home />} />
//           <Route path='/signup' element={<Signup />} />
//           <Route path='/signin' element={<Signin />} />
//           <Route path='/create' element={<CreatePost />} />
//           <Route path='/profile' element={<Profile />} />
//           <Route path='/profile/:userid' element={<Home />} />
//           <Route path='*' element={<PageNotFound />} />
//         </Routes>
//       </Router>
//     </>
//   )
// }

export const UserContext = createContext();

const Routing = () => {
  const navigate = useNavigate();

  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    // console.log(user)
    if (user) {
      dispatch({ type: "USER", payload: user });
    } else {
      navigate("/signin");
    }

  }, []);

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/create' element={<CreatePost />} />
        <Route path='/profile' element={<Profile />}>
          <Route path='posts' element={<Profile />} />
          <Route path='followers' element={<Profile />} />
          <Route path='following' element={<Profile />} />
        </Route>
        <Route path='/profile/:userid' element={<UserProfile />}>
          <Route path='posts' element={<UserProfile />} />
        </Route>
        <Route path='*' element={<PageNotFound />} />
      </Routes>

    </>
  )

}


function App() {
  const [state, dispatch] = useReducer(reducer, initalState);
  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <Router>
          <Navbar />
          <Routing />
        </Router>
      </UserContext.Provider>
      <ToastContainer />
    </>
  )
}


export default App;
