import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Business from "./auth/Business";
import Login from "./auth/Login";
import { ToastContainer } from "react-toastify";
import Signup from "./auth/Signup";
import Footer from "./components/Footer";
import Header from "./components/Header";
import About from "./pages/About";
import BizCards from "./pages/BizCards";
import MyCards from "./pages/MyCards";
import MyFavCards from "./pages/MyFavCards";
import RouteGuard from "./auth/RouteGuard";
import { setToken } from "./auth/tokenMgmt";
import { postRequest } from "./services/apiService";
import { createContext } from "react";

interface ILoginData {
  email: string;
  password: string;
}

interface Context {
  // userName: string;
  handleLogout: Function;
  login: Function;
  // isAdmin: boolean;
}

export const AppContext = createContext<Context | null>(null);

function App() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.clear();
    navigate("/login");
  }

  function login(data: ILoginData) {
    const res = postRequest("users/login", data, false);
    if (!res) return;

    res
      .then((response) => response.json())
      .then((json) => {
        setToken(json.token);
        navigate("/vacations");
      });
  }

  return (
    <div className="container">
      <AppContext.Provider value={{ handleLogout, login }}>
        <Header />
        <ToastContainer />
        <Routes>
          <Route
            path="/bizcards"
            element={
              <RouteGuard>
                <BizCards />
              </RouteGuard>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/mycards" element={<MyCards />} />
          <Route path="/myfavcards" element={<MyFavCards />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login handler={Login} />} />
          <Route path="/biz" element={<Business />} />
        </Routes>
        <footer>
          <Footer />
        </footer>
      </AppContext.Provider>
    </div>
  );
}

export default App;
