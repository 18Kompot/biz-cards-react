import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Login from "./auth/Login";
import { ToastContainer } from "react-toastify";
import Signup from "./auth/Signup";
import Footer from "./components/Footer";
import Header from "./components/Header";
import About from "./pages/About";
import BizCards from "./pages/Cards/BizCards";
import MyCards from "./pages/Cards/MyCards";
import MyFavCards from "./pages/Cards/MyFavCards";
import RouteGuard from "./auth/RouteGuard";
import { setToken } from "./auth/tokenMgmt";
import { postRequest } from "./services/apiService";
import { createContext, useState } from "react";
import CreateCard from "./auth/CreateCard";

interface ILoginData {
  email: string;
  password: string;
}

interface Context {
  userId: string;
  userName: string;
  handleLogout: Function;
  login: Function;
  isBiz: boolean;
}

export const AppContext = createContext<Context | null>(null);

function App() {
  const [userId, setUserId] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [isBiz, setIsBiz] = useState<boolean>(false);
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.clear();
    setUserId("");
    setUserName("");
    setIsBiz(false);
    navigate("/login");
  }

  function login(data: ILoginData) {
    const res = postRequest("users/login", data, false);
    if (!res) return;

    res
      .then((response) => response.json())
      .then((json) => {
        setToken(json.token);
        setIsBiz(json.isBiz);
        setUserId(json.id);
        setUserName(json.name);
        navigate("/mycards");
      });
  }

  return (
    <div className="container">
      <AppContext.Provider value={{ userId, userName, handleLogout, login, isBiz }}>
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
          <Route path="/login" element={<Login handler={login} />} />
          <Route path="/createcard" element={<CreateCard />} />
        </Routes>
        <footer>
          <Footer />
        </footer>
      </AppContext.Provider>
    </div>
  );
}

export default App;
