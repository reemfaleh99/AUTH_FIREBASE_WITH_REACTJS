import style from "./card.module.scss";

const Card = ({ children }) => {
  return <div className={style.card}>{children}</div>;
};

export default Card;
