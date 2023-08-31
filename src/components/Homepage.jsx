import { Link } from "react-router-dom";

function Homepage() {
  return (
    <div className="homepage">
      <ul>
        <li>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </li>
        <li>
          <Link to="/signup">
            <button>Sign Up</button>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Homepage;
