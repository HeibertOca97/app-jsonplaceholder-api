//import logo from './logo.svg';
import {NotFound} from './pages/NotFound';
import {Home} from './pages/Home';
import {Profile} from './pages/Profile';
import './App.css';
import {Route, Routes} from 'react-router-dom';
import axios from 'axios';

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// API - JSONPLACEHOLDER
// users -> Albums -> Photos
// users -> Todos
// users -> Posts -> Comments

function App() {
  
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/profile/*' element={<Profile />} >
          <Route path=":slug" element={<Profile />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
