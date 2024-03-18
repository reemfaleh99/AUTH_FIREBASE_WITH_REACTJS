import { Link } from "react-router-dom";
import loginImg from "../../assets/forgot.png";
import Card from "../../components/card/Card";
import style from "./auth.module.scss";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/config";

const Reset = () => {
  const [email, setEmail] = useState("");
  const resetPassword = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log("check");
      })
      .catch((error) => console.log(error.message));
  };
  return (
    <section className={`container ${style.auth}`}>
      <div className={style.img}>
        <img src={loginImg} alt="" width={600} />
      </div>
      <Card>
        <div className={style.form}>
          <h2>Reset</h2>
          <form onSubmit={resetPassword}>
            <input
              type="email"
              placeholder="E-mail"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="--btn --btn-primary --btn-block">
              Reset Password
            </button>
          </form>
          <span className={style.register}>
            <Link to="/login">- Login</Link>
            <Link to="/register">- Register</Link>
          </span>
        </div>
      </Card>
    </section>
  );
};

export default Reset;
