import axios from 'axios';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import useUser from './hooks/use-user';

import AppBar from './components/AppBar';
import Login from './components/Login'
import Signup from './components/Signup'
import Welcome from './components/Welcome'
import Quizzes from './components/Quizzes'
import CreateQuiz from './components/CreateQuiz'
import EditQuiz from './components/EditQuiz'
import PublishedQuiz from './components/PublishedQuiz'
import QuizScore from './components/QuizScore'
import './App.css';

export default function App() {
  axios.defaults.headers.common['Content-Type'] = 'application/json';
  axios.defaults.headers.common['Accept'] = 'application/json';
  axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
  axios.defaults.withCredentials = true;

  const { user, loading } = useUser();
  if (loading) { return null }

  return (
    <BrowserRouter>
      <AppBar />
      <Routes>
        <Route path="/published/:id" element={<PublishedQuiz />} />
        <Route path="/published/:id/score" element={<QuizScore />} />
        {user.email ?
          <>
            <Route path="/" element={< Quizzes />} />
            <Route path="/quizzes" element={<Quizzes />} />
            <Route path="/quizzes/new" element={<CreateQuiz />} />
            <Route path="/quizzes/edit/:id" element={<EditQuiz />} />
          </>
        :
          <>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </>
        }
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
