import './App.css';
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

export const userContext = createContext();

const Routing = () => {
  const navigate = useNavigate();

  const { state, dispach } = useContext(userContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    // console.log(user)

    if (user) {
      dispach({ type: "USER", payload: user });
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
        <Route path='/profile' element={<Profile />} />
        <Route path='/profile/:userid' element={<Home />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>

    </>
  )

}


function App() {
  const [state, dispach] = useReducer(reducer, initalState);
  return (
    <>
      <userContext.Provider value={{ state, dispach }}>
        <Router>
          <Navbar />
          <Routing />
        </Router>
      </userContext.Provider>
    </>
  )
}


export default App;
