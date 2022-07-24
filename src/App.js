import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, HashRouter } from 'react-router-dom';
import './App.css';
import { Navbar } from './components/Navbar/Navbar';
import { useToken } from './hooks/useToken';
import { Friends } from './pages/friends/Friends';
import { Home } from './pages/home/Home';
import { Welcome } from './pages/welcome/Welcome';

function App() {

  const { makeToken } = useToken();

  useEffect(() => {
    makeToken()
  },[])

  return (
    <div className="App">
      <HashRouter>
      <Navbar />
        <Routes>
          <Route index path='/' element={ <Navigate to='home' /> } />

            <Route path='/home' element={<Home />} />
            <Route path='/welcome' element={<Welcome />} />
            <Route path='/friends' element={<Friends />} />

     </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
