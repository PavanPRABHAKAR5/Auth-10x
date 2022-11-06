import './App.css';
import Log from './component/Auth/login';
import Register from './component/Auth/register';
import Main from './component/main';
import {BrowserRouter,Routes, Route} from 'react-router-dom';
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Log/>}></Route>
      <Route path='/reg' element={<Register/>}></Route>
      <Route path='/main' element={<Main/>}></Route>
    </Routes>
    </BrowserRouter> 
    </>
  );
}

export default App;
