import { Link, useLocation } from "react-router-dom";

function Welcome() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const loggedInEmail = params.get("email");

  return (
    <div className="welcome">
      <div>Welcome <span className="email">{loggedInEmail}!</span></div>
      <div>
        <Link to="/">
          <button>Go Back</button>
        </Link>
      </div>
    </div>
  );
}

export default Welcome;
