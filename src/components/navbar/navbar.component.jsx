import styles from "./navbar.module.scss";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className={styles.Header}>
      <NavLink to="/" exact={true}>
        Home
      </NavLink>{" "}
      | <NavLink to="/gallery">Gallery</NavLink>
    </header>
  );
}
