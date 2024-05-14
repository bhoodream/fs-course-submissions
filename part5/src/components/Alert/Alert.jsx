import "./styles.css";

export const Alert = ({ type, message, visible }) =>
  visible ? <div className={`alert alert__${type}`}>{message}</div> : null;
