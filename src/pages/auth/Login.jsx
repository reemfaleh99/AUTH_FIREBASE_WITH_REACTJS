import { Link, useNavigate } from "react-router-dom";
import loginImg from "../../assets/login.png";
import Card from "../../components/card/Card";
import style from "./auth.module.scss";
import { FaGoogle } from "react-icons/fa";
import { useState } from "react";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase/config";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const loginUser = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log("success");
        navigate("/");
      })
      .catch((error) => console.log(error.message));
  };

  const provider = new GoogleAuthProvider();

  const signinWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <section className={`container ${style.auth}`}>
      <div className={style.img}>
        <img src={loginImg} alt="" width={600} />
      </div>
      <Card>
        <div className={style.form}>
          <h2>Login</h2>
          <form onSubmit={loginUser}>
            <input
              type="email"
              placeholder="E-mail"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="--btn --btn-primary --btn-block">
              login
            </button>
            <div className={style.links}>
              <Link to="/reset">Reset Password</Link>
              <p>-- or --</p>
            </div>
          </form>

          <button
            type="submit"
            className="--btn --btn-danger --btn-block"
            onClick={signinWithGoogle}
          >
            <FaGoogle color="#fff" /> Login With Google
          </button>
          <span className={style.register}>
            <p>Don't you have an account?</p>
            <Link to="/register">Register</Link>
          </span>
        </div>
      </Card>
    </section>
  );
};

export default Login;
