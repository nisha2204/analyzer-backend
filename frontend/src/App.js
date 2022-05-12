import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
//import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Analyzer from "./components/Analyze/Analyze";
 
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/analyzer" element={<Analyzer/>}/>
          {/* <Login/>
        </Route> */}
        {/* <Route path="/register">
          <Register/>
        </Route>
        <Route path="/dashboard">
          <Navbar/>
          <Dashboard/>
        </Route> */}

      </Routes>
    </BrowserRouter>
  );
}
 
export default App;