import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signin from "./components/Signin";
import Admindashboard from "./components/Admindashboard";
import Userdashboard from "./components/Userdashboard";
import colors from "./colors";
import Addrecipe from "./components/Addrecipe";
import Profile from "./components/Profile";
import Myrecipe from "./components/Myrecipe";
import Allrecipes from "./components/Allrecipes";
import Detailedrecipe from "./components/Detailedrecipe";
import DetailedrecipeAdmin from "./components/DetailedrecipeAdmin";
import { AppContext } from "./AppContext";
import { useState } from "react";
import Users from "./components/Users";
import Recipes from "./components/Recipes";

function App() {
  const [data, setData] = useState({
    username: "",
    place: "",
    age: "",
    email: "",
    password: "",
    admin: null,
  });
  document.body.style.backgroundColor = colors.backgroundcolor;

  return (
    <>
      <BrowserRouter>
        <AppContext.Provider value={{ data, setData }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/admindash" element={<Admindashboard />} />
            <Route path="/userdash" element={<Userdashboard />} />
            <Route path="/recipe/add" element={<Addrecipe />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/user/recipes" element={<Myrecipe />} />
            <Route path="/recipes" element={<Allrecipes />} />
            <Route path="/detrecipe" element={<Detailedrecipe />} />
            <Route path="/detrecipeadmin" element={<DetailedrecipeAdmin />} />
            <Route path="/admin/users" element={<Users />} />
            <Route path="/admin/recipes" element={<Recipes />} />
          </Routes>
        </AppContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
