import { BrowserRouter, Routes, Route } from "react-router-dom";
import GuestHome from "./Pages/GuestHome";
import UserRegistration from "./Pages/UserRegistration";
import UserLogin from "./Pages/UserLogin";
import "./App.css";

import AdminHomePage from "./Components/Admin/AdminHomePage";
import AddCourse from "./Components/Admin/AddCourse";
import ViewCourse from "./Components/Admin/ViewCourse";
import UserRequest from "./Components/Admin/UserRequest";
import UserHomePage from "./Components/User/UserHomePage";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GuestHome />}></Route>
          <Route path="/userRegistration" element={<UserRegistration />} />
          <Route path="/userLogin" element={<UserLogin />} />

          <Route path="/adminHomePage" element={<AdminHomePage />} />
          <Route path="/addCourse" element={<AddCourse />} />
          <Route path='/viewCourse' element={<ViewCourse/>}/>
          <Route path="/userRequest" element={<UserRequest />} />
          <Route path="/userHomePage" element={<UserHomePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
