import { BrowserRouter, Routes, Route } from "react-router-dom";
import GuestHome from "./Pages/GuestHome";
import UserRegistration from "./Pages/UserRegistration";
import UserLogin from "./Pages/UserLogin";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GuestHome />}></Route>
          <Route path="/userRegistration" element={<UserRegistration />} />
          <Route path="/userLogin" element={<UserLogin />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
