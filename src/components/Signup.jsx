import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_KEY = "AIzaSyDSjvpnWmI7PNf8OSbfMYT-qY_li809eAI";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailExist, setEmailExist] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [missingPassword, setMissingPassword] = useState(false);

  const navigate = useNavigate();

  // handlers
  function handleEmail(e) {
    setEmail(e.target.value);
  }
  function handlePassword(e) {
    setPassword(e.target.value);
  }

  // signup function
  async function signUp(email, password) {
    const res = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
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
    console.log(data);

    if (data.error?.message === "EMAIL_EXISTS") {
      setEmailExist(true);
      setInvalidEmail(false);
      setMissingPassword(false);
    }
    if (data.error?.message === "INVALID_EMAIL") {
      setInvalidEmail(true);
      setMissingPassword(false);
      setEmailExist(false);
    }
    if (data.error?.message === "MISSING_PASSWORD") {
      setMissingPassword(true);
      setInvalidEmail(false);
      setEmailExist(false);
    }
    if (data.email === email) {
      setEmailExist(false);
      setInvalidEmail(false);
      setMissingPassword(false);
      navigate(`/welcome?email=${encodeURIComponent(email)}`);
    }
    // EMAIL_EXISTS

    return data;
  }

  return (
    <div className="signup">
      <div className="signup-form">
        <label>
          Email: <input type="email" value={email} onChange={handleEmail} />
        </label>
        <label>
          Password:{" "}
          <input type="password" value={password} onChange={handlePassword} />
        </label>
        <button onClick={() => signUp(email, password)}>Sign Up</button>
      </div>
      <h2>
        {invalidEmail && "Enter a Valid Email"}
        {missingPassword && "Enter Your Password"}
      </h2>
      <div className="error">
        {emailExist && (
          <div>
            Email Already Registered, <Link to="/login">Log in</Link>
          </div>
        )}
      </div>
      <Link to="/">
        <button>Go Back</button>
      </Link>
    </div>
  );
}

export default Signup;
