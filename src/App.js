import Daily from './components/Daily';
import Diary from './components/Diary';
import Recovery from './components/Recovery';
import { QuoteProvider } from './components/QuoteContext';
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import './App.css'

function App() {
  return (
    <QuoteProvider>
      <BrowserRouter>
        <nav className="nav-bar">
          <ul>
            <li><NavLink to="/">Daily</NavLink></li>
            <li><NavLink to="/diary">Diary</NavLink></li>
            <li><NavLink to="/recovery">Recovery</NavLink></li>
          </ul>
        </nav>

      <Routes>
          <Route path='/' element={<Daily/>}/>
          <Route path='/diary' element={<Diary/>}/>
          <Route path='/recovery' element={<Recovery/>}/>
      </Routes>
      </BrowserRouter>
    </QuoteProvider>
  );
}

export default App;
