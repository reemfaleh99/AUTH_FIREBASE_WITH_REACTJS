import style from "./header.module.scss";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { FaTimes, FaUserCircle } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import {
  SET_ACTIVE_USER,
  REMOVE_ACVTIVE_USER,
} from "../../redux/slice/authSlice";
import ShowOnLogin, { ShowOnLogout } from "../hiddenLinks/hiddenLinks";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [displayName, setDisplayName] = useState("");

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };

  const logo = (
    <div className={style.logo}>
      <Link to="/">
        <h2>
          e<span>shop</span>.
        </h2>
      </Link>
    </div>
  );

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.displayName === null) {
          const u1 = user.email.substring(0, user.email.indexOf("@"));
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
          setDisplayName(uName);
        } else setDisplayName(user.displayName);

        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            userName: user.displayName ? user.displayName : displayName,
            userID: user.id,
          })
        );
      } else {
        setDisplayName("");
        dispatch(REMOVE_ACVTIVE_USER());
      }
    });
  });

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const activeLink = ({ isActive }) => (isActive ? `${style.active}` : "");
  return (
    <header>
      <div className={style.header}>
        {logo}
        <nav
          className={showMenu ? `${style["show-nav"]}` : `${style["hide-nav"]}`}
        >
          <div
            className={
              showMenu
                ? `${style["nav-wrapper"]} ${style["show-nav-wrapper"]}`
                : `${style["nav-wrapper"]}`
            }
            onClick={hideMenu}
          ></div>
          <ul>
            <li className={style["logo-mobile"]}>
              {logo}
              <FaTimes size={22} color="white" onClick={hideMenu} />
            </li>
            <li>
              <NavLink to="/" className={activeLink}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={activeLink}>
                Contact
              </NavLink>
            </li>
          </ul>
          <div className={style["header-right"]} onClick={hideMenu}>
            <span className={style.links}>
              <ShowOnLogin>
                <a href="#home" style={{ color: "#ff7722" }}>
                  <FaUserCircle size={16} /> HI,{displayName}
                </a>
              </ShowOnLogin>
              <ShowOnLogout>
                <NavLink to="/login" className={activeLink}>
                  login
                </NavLink>
              </ShowOnLogout>

              <ShowOnLogin>
                <NavLink to="/login" onClick={logoutUser}>
                  logout
                </NavLink>
              </ShowOnLogin>
            </span>
          </div>
        </nav>
        <div className={style["menu-icon"]}>
          <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
        </div>
      </div>
    </header>
  );
};

export default Header;
