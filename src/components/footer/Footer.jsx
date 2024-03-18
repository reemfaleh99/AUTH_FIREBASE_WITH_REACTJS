import style from "./footer.module.scss";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  return <div className={style.footer}>&copy; {year} All Right Reserved</div>;
};

export default Footer;
