import styled from "styled-components";
import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { BsRssFill, BsSteam, BsTwitch, BsYoutube } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSidebarStatus,
  setSidebarOn,
  setSidebarOff,
} from "../../redux/store/sidebarSlice";
import { logo_image } from "../../utils/images";
import { logout } from "../../actions/auth";
import { clearMessage } from "../../actions/message";

import EventBus from "../../common/EventBus";

const Navbar = () => {
  const dispatch = useDispatch();
  const sidebarStatus = useSelector(selectSidebarStatus);

  const { user: currentUser } = useSelector((state) => state.auth);
  let location = useLocation();

  useEffect(() => {
    if (["/login", "/register"].includes(location.pathname)) {
      dispatch(clearMessage());
    }
  }, [dispatch, location]);

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, [currentUser, logOut]);

  return (
    <NavbarWrapper className="d-flex align-items-center">
      <div className="container w-100">
        <div className="navbar-content">
          <div className="brand-and-toggler d-flex align-items-center justify-content-between">
            <Link
              to="/home"
              className="navbar-brand text-white text-uppercase no-wrap"
            >
              <div className="d-flex">
                <img src={logo_image} alt="logo" className="logo_image" />
                Gam <span>ers</span>
              </div>
            </Link>
          </div>
          {currentUser ? (
            <div className={`navbar-collapse ${sidebarStatus ? "show" : " "}`}>
              <button
                type="button"
                className="navbar-hide-btn"
                aria-label="navbar-collapse"
                onClick={() => dispatch(setSidebarOff())}
              >
                <MdClose size={25} />
              </button>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/home" className="nav-link">
                    home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/creators" className="nav-link">
                    creators
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/stores" className="nav-link">
                    stores
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/games" className="nav-link">
                    games
                  </Link>
                </li>
              </ul>
              <ul className="connect-list d-flex justify-content-center align-items-center mt-5">
                <li className="text-uppercase fw-7 w-100 connect-text mb-2">
                  connect
                </li>
                <li className="connect-item">
                  <Link to="/" className="connect-link">
                    <BsRssFill />
                  </Link>
                </li>
                <li className="connect-item">
                  <Link to="/" className="connect-link">
                    <BsSteam size={18} />
                  </Link>
                </li>
                <li className="connect-item">
                  <Link to="/" className="connect-link">
                    <BsTwitch size={18} />
                  </Link>
                </li>
                <li className="connect-item">
                  <Link to="/" className="connect-link">
                    <BsYoutube size={19} />
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <></>
          )}
          {currentUser ? (
            <div className="navbar-right-section">
              <span className="MeunMsg navbar-show-btn">Meun</span>
              <button
                type="button"
                className="navbar-show-btn text-white"
                aria-label="Meun"
                onClick={() => dispatch(setSidebarOn())}
              >
                <HiOutlineMenuAlt3 size={25} />
              </button>

              <div className="user-section">
                <ul className="user-section-list">
                  <li className="nav-item user-section-info">
                    <img src="favicon.jpg" alt="user-img" className="user-section-img" />
                    <Link to="/profile" className="nav-link">
                      {currentUser.username}
                    </Link>
                  </li>
                  <li className="nav-item user-section-text">
                    <a href="/login" className="nav-link" onClick={logOut}>
                      LogOut
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="navbar-right-section">
              <div className="user-section">
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">
                    Sign Up
                  </Link>
                </li>
              </div>
            </div>
          )}
        </div>
      </div>
    </NavbarWrapper>
  );
};

export default Navbar;

const NavbarWrapper = styled.div`
  min-height: 78px;
  background: #090624;

  .navbar-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  .logo_image {
    width: 100px;
    height: auto;
  }

  .navbar-brand {
    font-weight: 700;
    font-size: 32px;

    span {
      color: var(--clr-green-normal);
    }
  }

  .nav-item {
    padding: 10px 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  }

  .nav-link {
    text-transform: uppercase;
    font-weight: 500;
    letter-spacing: 2px;
    transition: var(--transition-default);

    &:hover {
      color: var(--clr-pink-normal);
    }
  }

  .connect-text {
    letter-spacing: 2px;
  }

  .connect-item {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 2px;
    margin-left: 2px;
  }

  .connect-link {
    padding: 6px 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: var(--transition-default);

    &:hover {
      color: var(--clr-violet-normal);
    }
  }

  .navbar-collapse {
    position: fixed;
    right: 0;
    top: 0;
    width: 280px;
    height: 100%;
    background-color: var(--clr-white);
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    padding: 60px 20px 16px;
    text-align: center;
    transform: translateX(100%);
    transition: var(--transition-default);
    z-index: 999;

    &.show {
      transform: translateX(0);
    }
  }

  .navbar-hide-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    transition: var(--transition-default);
    &:hover {
      transform: scale(1.2);
    }
  }

  .navbar-show-btn {
    transition: var(--transition-default);
    &:hover {
      transform: scale(1.2);
    }
  }

  .user-section {
    display: flex;
    align-items: center;
    margin-left: 50px;

    .nav-item {
      list-style: none;

      .nav-link {
        color: white;
      }
    }

    .user-section-list {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: flex-end;
      align-items: center;

      .user-section-info {
        display:flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;

        .user-section-img {
          width: 50px;
          height: 50px;
        }
      }
    }
  }

  .MeunMsg {
    font-size: 16px;
    color: white;
  }

  @media screen and (max-width: 1125px) {
    .navbar-right-section {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      width: 100%;
    }

    .user-section {
      margin-left: 10px;

      .user-section-list {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-end;
        align-items: center;
  
        .user-section-info {
          display:flex;
          flex-direction: row;
          flex-wrap: nowrap;
          justify-content: center;
          align-items: center;
          margin-right: 10px;

          .user-section-img {
            width: 50px;
            height: 50px;
            margin-right: 10px;
          }
        }
      }
    }
  }

  @media screen and (min-width: 1125px) {
    .navbar-show-btn {
      display: none;
    }
    .navbar-collapse {
      transform: translateX(0);
      position: relative;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      width: 100%;
      background-color: transparent;
      box-shadow: none;
    }
    .navbar-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .navbar-nav {
      display: flex;
      .nav-item {
        margin-left: 10px;
      }
    }
    .navbar-hide-btn {
      display: none;
    }
    .nav-link {
      color: var(--clr-white);
      padding: 1px 10px;
    }
    .connect-list {
      display: flex;
      margin-top: 0;
      color: var(--clr-white);
      margin-left: 40px;
      .connect-text {
        width: auto;
        margin-bottom: 0;
        margin-right: 22px;
        display: none;
      }
      .connect-link {
        color: var(--clr-white);
      }
    }
  }

  @media screen and (min-width: 1350px) {
    .nav-link {
      padding-right: 16px;
      padding-left: 16px;
    }
    .connect-list {
      margin-left: 88px;

      .connect-text {
        display: inline-block;
      }
    }
  }
`;
