import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import { BrowserRouter,Routes, Route} from 'react-router-dom';
import Home from './Components/Home';

import Signup from './Components/Signup';
import Login from './Components/Login';

function App() {
  const userId = Math.random().toString(36).substring(7);

  return (
    <>

<BrowserRouter> 
         <Navbar/>
    
        <Routes>
                <Route exact path="/" element={< Home />}></Route>
            
                <Route exact path="/deepak" element={< Home />}></Route>
                <Route exact path="/login" element={<Login/>}></Route>
                <Route exact path="/signup" element={< Signup/>}></Route>
        </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
