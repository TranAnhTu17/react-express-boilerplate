import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PageRender from "./PageRender";
import Login from "./pages/login";
import Home from "./pages/home";
import Register from "./pages/register";
import { useEffect } from "react";
import { refreshToken } from "./redux/actions/authAction";
import Alert from "./components/alert";
import PrivateRouter from "./customRouter/PrivateRouter";
import NavbarMenu from "./components/NavbarMenu";
import ResetPassword from "./pages/reset_password";
import NewPassword from "./pages/new_password";
import SidebarMenu from "./components/SidebarMenu";
import { SOCKET } from "./redux/types";
import io from "socket.io-client";

function App() {
  const { auth } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());

    // socket
    const socket = io();
    dispatch({ type: SOCKET, payload: socket });
    return () => socket.close();
  }, [dispatch]);

  return (
    <Router>
      <div style={{ display: "flex" }}>
        {auth.token && <SidebarMenu />}
        <div style={{ width: "100%" }}>
          {auth.token && <NavbarMenu />}
          <Alert />
          <div style={{ padding: "20px" }}>
            <Routes>
              <Route path="/" element={auth.token ? <Home /> : <Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/reset_password" element={<ResetPassword />} />
              <Route
                path="/new_password/:resetToken"
                element={<NewPassword />}
              />
              <Route
                path="/:page"
                element={
                  <PrivateRouter>
                    <PageRender />
                  </PrivateRouter>
                }
              />
              <Route
                path="/:page/:id"
                element={
                  <PrivateRouter>
                    <PageRender />
                  </PrivateRouter>
                }
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
