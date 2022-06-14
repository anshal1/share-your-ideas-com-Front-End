import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Ideabox from './components/Ideabox';
import Mystate from './context/state';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';
import FullIdea from './components/FullIdea';
import Sprofile from './components/Sprofile';
import EditModal from './components/EditModal';
import Comment from './components/Comment';
import Test from './components/Test';
import FollowPage from './components/FollowPage';
import Search from './components/Seach';
function App() {
  return (
    <>
      <Mystate>
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/share' element={<Ideabox />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/fullidea' element={<FullIdea />} />
            <Route path='/Sprofile' element={<Sprofile />} />
            <Route path='/search' element={<Test /> } />
            <Route path="/edit/idea" element={<EditModal />} />
            <Route path ="/comment" element={<Comment />} />
            <Route path='/follow/data' element={<FollowPage />} />
            <Route path='/search/user' element={<Search />} />
          </Routes>
        </Router>
      </Mystate>
    </>
  );
}

export default App;
