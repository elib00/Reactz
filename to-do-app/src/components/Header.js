import styles from "../styles/Header.module.css";
import { GiHamburgerMenu } from "react-icons/gi";

const Header = () => {
    return (
        <div className={styles.header}>
            <h1>To-Do App</h1>
            <GiHamburgerMenu className={styles["btn-burger"]}/>
        </div>
    );
};

export default Header;