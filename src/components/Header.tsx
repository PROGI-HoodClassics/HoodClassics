import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header style={styles.header}>
      <h1 style={styles.title}>HoodClassics</h1>
      <nav>
        <Link to="/register" style={styles.link}>
          Register
        </Link>
        <Link to="/login" style={styles.link}>
          Login
        </Link>
      </nav>
    </header>
  );
};

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
    backgroundColor: "#333",
    color: "#fff",
  },
  title: {
    fontSize: "1.5rem",
  },
  link: {
    color: "#61dafb",
    textDecoration: "none",
    marginLeft: "1rem",
  },
};

export default Header;
