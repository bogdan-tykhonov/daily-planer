import "./App.css";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { useRoutes } from "./routes";
import {useAuth} from './Hooks/authHook';
//import {AuthContext} from './Context/AuthContext';
import Context from './Components/Context';
function App() {
  const {login, logout, userId, token} = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);
  return (
    <Context.Provider value={{token, userId, login, logout, isAuthenticated}}>
      <BrowserRouter>{routes}</BrowserRouter>
    </Context.Provider>
  );
}
export default App;
