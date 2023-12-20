import './App.css';
// import "materialize-css";
// import "materialize-css/dist/css/materialize.min.css";
import Home from './components/Home';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PageNotFound from './components/PageNotFound';
import Signup from './components/Signup';
import Signin from './components/Signin';
import CreatePost from './components/CreatePost';
import Profile from './components/Profile';
import { createContext } from 'react';
import { useReducer } from 'react';
import { initalState, reducer } from './reducers/useReducer';
import { ToastContainer } from 'react-toastify';
import UserProfile from './components/UserProfile';
import EditProfile from './components/EditProfile';
import MyPosts from './components/MyPosts';
import Followers from './components/Followers';
import Following from './components/Following';
import EditPost from './components/EditPost';
import OldProfilePics from './components/OldProfilePics';
import Post from './components/Post';

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
export const BaseUrlContext = createContext();

const Routing = () => {
  // const navigate = useNavigate();

  // const { dispatch } = useContext(UserContext);

  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   // console.log(user)
  //   if (user) {
  //     dispatch({ type: "USER", payload: user });
  //   } else {
  //     navigate("/signin");
  //   }

  // }, [dispatch, navigate]);

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/post/:id' element={<Post />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/create' element={<CreatePost />} />
        <Route path='/editpost/:id' element={<EditPost />} />
        <Route path='/profile' element={<Profile />}>
          <Route path='edit' element={<EditProfile />} />
          <Route path='' element={<MyPosts />} />
          <Route path='oldprofiles' element={<OldProfilePics />} />
          <Route path='posts' element={<MyPosts />} />
          <Route path='followers' element={<Followers />} />
          <Route path='following' element={<Following />} />
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
      {/* const url = ahttp://localhost:5234 */}
      {/* https://instagram-api-4qpz.onrender.com */}
      <BaseUrlContext.Provider value="https://instagram-api-4qpz.onrender.com">
        <UserContext.Provider value={{ state, dispatch }}>
          <Router>
            <Navbar />
            <Routing />
          </Router>
        </UserContext.Provider>
      </BaseUrlContext.Provider>
      <ToastContainer />
    </>
  )
}


export default App;
