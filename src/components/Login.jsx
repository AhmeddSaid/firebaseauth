import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [emailNotFound, setEmailNotFound] = useState(false);
  const [missingPassword, setMissingPassword] = useState(false);
  const navigate = useNavigate();

  // handlers
  function handleEmail(e) {
    setEmail(e.target.value);
  }
  function handlePassword(e) {
    setPassword(e.target.value);
  }

  // logIn function
  async function logIn(email, password) {
    const res = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
      {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    // console.log(data.error?.message);

    if (data.error?.message === "INVALID_EMAIL") {
      setInvalidEmail(true);
      setInvalidPassword(false);
      setEmailNotFound(false);
      setMissingPassword(false);
    }
    if (data.error?.message === "EMAIL_NOT_FOUND") {
      setEmailNotFound(true);
      setInvalidPassword(false);
      setInvalidEmail(false);
      setMissingPassword(false);
    }
    if (data.error?.message === "INVALID_PASSWORD") {
      setInvalidPassword(true);
      setInvalidEmail(false);
      setEmailNotFound(false);
      setMissingPassword(false);
    }
    if (data.error?.message === "MISSING_PASSWORD") {
      setMissingPassword(true);
      setInvalidEmail(false);
      setInvalidPassword(false);
      setEmailNotFound(false);
    }
    if (data.registered) {
      setInvalidEmail(false);
      setInvalidPassword(false);
      setEmailNotFound(false);
      navigate(`/welcome?email=${encodeURIComponent(email)}`);
    }
    // INVALID_EMAIL
    // EMAIL_NOT_FOUND
    // INVALID_PASSWORD
    // MISSING_PASSWORD
    return data;
  }

  return (
    <div className="login">
      <div className="login-form">
        <label>
          Email: <input type="email" value={email} onChange={handleEmail} />
        </label>
        <label>
          Password:{" "}
          <input type="password" value={password} onChange={handlePassword} />
        </label>
        <button onClick={() => logIn(email, password)}>Log In</button>
      </div>
      <h2>
        {invalidEmail && "Enter A Valid Email!"}
        {invalidPassword && "Wrong Password!"}
        {missingPassword && "Enter Your Password"}
      </h2>
      <div className="error">
        {emailNotFound && (
          <div>
            Email Not Registered, <Link to="/signup">Sign Up</Link>
          </div>
        )}
      </div>
      <Link to="/">
        <button>Go Back</button>
      </Link>
    </div>
  );
}

export default Login;
