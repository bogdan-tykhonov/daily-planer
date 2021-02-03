import React, {useState, useContext} from "react";
import Alert from '../Components/Alert';
import {AuthContext} from '../Context/AuthContext';

export function AuthPage() {
  const auth = useContext(AuthContext);

  let [alertState, setAlertState] = React.useState({
    alertArr: []
  });

  function clearInputs(form){
    const inputs = form.querySelectorAll('input');
    for(let input of inputs){
      input.value = '';
    }
  }

  function addAlert(result, type){
    let freshAlert = {
      visibility: true,
    type: type, 
    messageTxt: result.message
    };
    const currLength = alertState.alertArr.length;
    const updatedArr = alertState.alertArr.concat(freshAlert);

    setAlertState({
      alertArr: updatedArr
    });

      const alertElem = document.querySelector(`#alert-${currLength}`);
      setTimeout(() => {
        alertElem.style.top = '-100vh';
      }, 2000)
  
      alertElem.addEventListener('transitionend', function() {
        this.remove();
      })
  }

  const request = (url, method, body = null, headers = {}) => {
    if (body) {
      body = JSON.stringify(body);
    }
    fetch(url, { method, body, headers })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          if (result.error) {
            addAlert(result, 'error'); 
          }else if(result.created){
            const registerForm = document.querySelector(".modal-register form");
            addAlert(result, 'success');
            clearInputs(registerForm);
            document.querySelector(`.modal-login`).style.transform = "translateX(0px)";
            document.querySelector(".modal-register").style.transform = "translateX(100vw)";
          } else if (result.resolve) {
            auth.login(result.token , result.userId);
          }
        },
        (error) => {
          console.log({ error: error });
        }
      );
  };

  function changeModal(e) {
    e.preventDefault();
    let currentModal = e.target.className;
    if (currentModal == "register-link") {
      document.querySelector(`.modal-login`).style.transform =
        "translateX(-100vw)";
      document.querySelector(".modal-register").style.transform =
        "translateX(0px)";
    } else {
      document.querySelector(`.modal-login`).style.transform =
        "translateX(0px)";
      document.querySelector(".modal-register").style.transform =
        "translateX(100vw)";
    }
  }

  let [form, setForm] = useState({ name: "", email: "", password: "" });
  const formHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };


  const loginHandler = (event) => {
    event.preventDefault();
    request(
      "/api/auth/login",
      "POST",
      { ...form },
      { "Content-Type": "application/json" }
    );
  };


  const registerHandler = (event) => {
    event.preventDefault();
    request(
      "/api/auth/register",
      "POST",
      { ...form },
      { "Content-Type": "application/json" }
    );
  };


  return (
    <div className="page auth-page">
      <div className="messagess">
      {alertState.alertArr.map( (alert, index) => 
     <Alert alertProps={{ messageTxt: alert.messageTxt, type: alert.type, id: index}} key={index}/> 
   )}
      </div>
      <div className="container">
        <div className="modal-auth modal-login">
          <h1>Daily Planer</h1>
          <form action="">
            <input
              type="email"
              name="email"
              placeholder="example@gmail.com"
              onChange={formHandler}
            />
            <input
              type="password"
              name="password"
              id=""
              placeholder="Your password"
              onChange={formHandler}
            />
            <div className="btn-row">
              <button onClick={loginHandler} type="submit" name="submit">
                Log in
              </button>
              <div className="change-auth">
                <h4>Dont have an account ?</h4>
                <a href="/" className="register-link" onClick={changeModal}>
                  Sign up
                </a>
              </div>
            </div>
          </form>
        </div>
        <div className="modal-auth modal-register">
          <h1>Daily Planer</h1>
          <form action="">
            <input
              type="text"
              name="name"
              placeholder="Your name"
              onChange={formHandler}
            />
            <input
              type="email"
              name="email"
              placeholder="example@gmail.com"
              onChange={formHandler}
            />
            <input
              type="password"
              name="password"
              id=""
              placeholder="Your password"
              onChange={formHandler}
            />
            <div className="btn-row">
              <button onClick={registerHandler} type="submit" name="submit">
                Sign up
              </button>
              <div className="change-auth">
                <h4>Have an account ?</h4>
                <a href="/" className="login-link" onClick={changeModal}>
                  Log in
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
