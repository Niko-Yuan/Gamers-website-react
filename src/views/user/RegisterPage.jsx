import React, { useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { register } from "../../actions/auth";

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

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="custom-alert" role="alert">
        <i className="alert-icon">
          <FontAwesomeIcon icon={faExclamationCircle} />
        </i>
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="custom-alert" role="alert">
        <i className="alert-icon">
          <FontAwesomeIcon icon={faExclamationCircle} />
        </i>
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="custom-alert" role="alert">
        <i className="alert-icon">
          <FontAwesomeIcon icon={faExclamationCircle} />
        </i>
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const RegisterPage = () => {
  const form = useRef();
  const checkBtn = useRef();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);

  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setSuccessful(false);
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      dispatch(register(username, email, password))
        .then(() => {
          console.log("[handleRegister]: successful registered");
          setSuccessful(true);
          navigate("/login");
        })
        .catch((error) => {
          setSuccessful(false);
        });
    }
  };

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
  }, []);

  return (
    <RegisterPageWrapper>
      <div className="register-page-card w-100">
        <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={{
            background: {
              color: {
                value: "#0d47a1",
              },
            },
            fpsLimit: 120,
            interactivity: {
              events: {
                onClick: {
                  enable: true,
                  mode: "push",
                },
                onHover: {
                  enable: true,
                  mode: "repulse",
                },
                resize: true,
              },
              modes: {
                push: {
                  quantity: 4,
                },
                repulse: {
                  distance: 200,
                  duration: 0.4,
                },
              },
            },
            particles: {
              color: {
                value: "#ffffff",
              },
              links: {
                color: "#ffffff",
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 1,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "bounce",
                },
                random: false,
                speed: 6,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                },
                value: 80,
              },
              opacity: {
                value: 0.5,
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 1, max: 5 },
              },
            },
            detectRetina: true,
          }}
        />
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Form onSubmit={handleRegister} ref={form}>
            {!successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="username"
                    value={username}
                    onChange={onChangeUsername}
                    validations={[required, vusername]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={onChangeEmail}
                    validations={[required, validEmail]}
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
                    validations={[required, vpassword]}
                  />
                </div>

                <div className="form-group">
                  <button
                    type="submit"
                    aria-label="btn-register"
                    className="register-btn"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            )}

            {message && (
              <div className="form-group">
                <div
                  className={successful ? "alert-success" : "custom-alert"}
                  role="alert"
                >
                  <i className="alert-icon">
                    <FontAwesomeIcon icon={faExclamationCircle} />
                  </i>
                  {message}
                </div>
              </div>
            )}
            <CheckButton
              type="button"
              aria-label="register-form-submit-btn"
              style={{ display: "none" }}
              ref={checkBtn}
            />
          </Form>
        </div>
      </div>
    </RegisterPageWrapper>
  );
};

export default RegisterPage;

const RegisterPageWrapper = styled.div`
  #tsparticles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }

  .register-page-card {
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
    height: 32px;
    font-size: 18px;
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

  .register-btn {
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
`;
