import React, { useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { login } from "../../actions/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

const required = (value) => {
  if (!value) {
    return (
      <div className="custom-alert" role="alert">
        <i className="alert-icon">
          <FontAwesomeIcon icon={faExclamationCircle} />
        </i>
        This field is required!
      </div>
    );
  }
};

const LoginPage = () => {
  let navigate = useNavigate();

  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(login(username, password))
        .then(() => {
          navigate("/home");
          window.location.reload();
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    try {
      await dispatch(login("demoUser", "demoUser"));
      navigate("/home");
      window.location.reload();
    } catch (error) {
      console.error("Error during dispatch:", error);
      setLoading(false);
    }
  };

  // if (isLoggedIn) {
  //   return <Navigate to="/home" />;
  // }

  // const particlesInit = useCallback(async (engine) => {
  //   await loadSlim(engine);
  // }, []);

  // const particlesLoaded = useCallback(() => {}, []);

  return (
    <LoginPageWrapper>
      <div className="login-page-card container w-100">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Form onSubmit={handleLogin} ref={form}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <Input
                type="text"
                className="form-control"
                name="username"
                value={username}
                onChange={onChangeUsername}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Input
                type="password"
                className="form-control"
                name="password"
                value={password}
                onChange={onChangePassword}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <button
                className="login-btn"
                disabled={loading}
              >
                {loading && (
                  <span className=""></span>
                )}
                <span>Login</span>
              </button>
            </div>

            <div className="form-group">
              <button
                type="button"
                aria-label="btn-demo"
                className="demo-btn"
                onClick={handleDemoLogin} 
              >
                Demo
              </button>
            </div>

            {message && (
              <div className="form-group">
                <div className="custom-alert" role="alert">
                  <i className="alert-icon">
                    <FontAwesomeIcon icon={faExclamationCircle} />
                  </i>
                  {message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={checkBtn}
            />
          </Form>
        </div>
      </div>
    </LoginPageWrapper>
  );
};

export default LoginPage;

const LoginPageWrapper = styled.div`
  #tsparticles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }

  .login-page-card {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  .card {
    background-color: #f7f7f7;
    padding: 20px 25px 30px;
    margin: 0 auto 25px;
    margin-top: 50px;
    -moz-border-radius: 2px;
    -webkit-border-radius: 2px;
    border-radius: 2px;
    -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  }

  .card-container.card {
    padding: 40px 40px;
    background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
    box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3);
    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }
  }

  .form-control {
    width: 100%;
    box-sizing: border-box;
    height: 35px;
    font-size: 15px;
    padding: 10px;
  }

  .card-container {
    box-shadow: 8px 8px 2px 1px rgba(0, 0, 255, 0.2);

    .profile-img-card {
      width: 96px;
      height: 96px;
      margin: 0 auto 10px;
      display: block;
      -moz-border-radius: 50%;
      -webkit-border-radius: 50%;
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.2);
    }

    label {
      display: block;
      margin-top: 10px;
      color: white;
      font-size: 22px;
      font-weight: bold;
    }
  }

  .login-btn {
    background-color: white;
    color: blue;
    text-transform: uppercase;
    border: 2px solid blue;
    border-radius: 12px;
    margin: 0 auto;
    display: block;
    margin-top: 10%;
    transition: all 0.3s ease;
    width: 50%;
    height: 40px;
    font-size: 18px;
    padding: 5px 15px;

    &:hover {
      background-color: blue;
      color: white;
    }
  }

  .custom-alert {
    background-color: #ff4d4d;
    color: white;
    padding: 10px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    animation: slideIn 0.5s ease;
    margin-top: 5px;
  }

  .alert-icon {
    margin-right: 10px;
    font-size: 20px;
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .demo-btn {
    background-color: #e0e0e0;
    color: #333;
    text-transform: uppercase;
    border: 2px solid #aaa;
    border-radius: 12px;
    margin: 10px auto;
    display: block;
    transition: all 0.3s ease;
    width: 50%;
    height: 40px;
    font-size: 18px;
    padding: 5px 15px;

    &:hover {
      background-color: #aaa;
      color: white;
    }
  }
`;
