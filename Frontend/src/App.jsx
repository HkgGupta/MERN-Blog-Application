import React from 'react';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import PostView from './pages/Posts/PostView';
import PostCreate from './pages/Posts/PostCreate';
import PostEdit from './pages/Posts/PostEdit';
import PostList from './pages/Posts/PostList';

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/posts" element={<PostList />} />
        <Route path='/post/:id' element={<PostView />} />

        <Route path="/post/create" element={<PostCreate />} />
        <Route path="/post/edit/:id" element={<PostEdit />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/" element={<PostList />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;