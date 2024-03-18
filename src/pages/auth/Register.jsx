import { Link, useNavigate } from "react-router-dom";
import loginImg from "../../assets/register.png";
import Card from "../../components/card/Card";
import style from "./auth.module.scss";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  const navigate = useNavigate();

  const registerUser = (e) => {
    e.preventDefault();
    if (password !== cPassword) {
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);

        navigate("/login");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <section className={`container ${style.auth}`}>
      <Card>
        <div className={style.form}>
          <h2>Register</h2>
          <form onSubmit={registerUser}>
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
            <input
              type="password"
              placeholder="Confirm Password"
              required
              value={cPassword}
              onChange={(e) => setCPassword(e.target.value)}
            />
            <button type="submit" className="--btn --btn-primary --btn-block">
              Register
            </button>
          </form>
          <span className={style.register}>
            <p>already have an account?</p>
            <Link to="/login">Login</Link>
          </span>
        </div>
      </Card>
      <div className={style.img}>
        <img src={loginImg} alt="" width={600} />
      </div>
    </section>
  );
};

export default Register;
