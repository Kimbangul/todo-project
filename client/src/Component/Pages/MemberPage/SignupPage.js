import React, { useEffect, useState } from "react";
import { siteTitle } from "../../Config";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../_actions/user_action";
import "./MemberPage.css";
import { withRouter } from "react-router-dom";

function SignupPage(props) {
  const dispatch = useDispatch();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (Password !== ConfirmPassword) {
      return alert("비밀번호와 비밀번호 확인이 일치해야 합니다.");
    }

    let body = {
      email: Email,
      password: Password,
    };

    dispatch(registerUser(body)).then((response) => {
      if (response.payload.success) {
        props.history.push("/login");
      } else {
        alert("회원가입 실패");
      }
    });
  };

  useEffect(() => {
    document.title = `회원가입 - ${siteTitle}`;
  }, []);

  return (
    <div>
      <section>
        <div id="main-content">
          <div id="content-name">Sign Up</div>
          <form method="post" onSubmit={onSubmitHandler}>
            <div className="input-area">
              <div className="element label">
                <label htmlFor="email_field">Email</label>
              </div>
              <div className="element">
                <input
                  type="email"
                  value={Email}
                  onChange={onEmailHandler}
                  name="email"
                  id="email_field"
                  required
                ></input>
              </div>
            </div>
            <div className="input-area">
              <div className="element label">
                <label htmlFor="password_field">Password</label>
              </div>
              <div className="element">
                <input
                  type="password"
                  value={Password}
                  onChange={onPasswordHandler}
                  name="password"
                  id="password_field"
                  required
                ></input>
              </div>
            </div>
            <div className="input-area">
              <div className="element label">
                <label htmlFor="confirm_password_field">Confirm Password</label>
              </div>
              <div className="element">
                <input
                  type="password"
                  value={ConfirmPassword}
                  onChange={onConfirmPasswordHandler}
                  name="confirmPassword"
                  id="confirm_password_field"
                  required
                ></input>
              </div>
            </div>
            <div id="button-area">
              <span>
                <button className="signup" type="submit">
                  Register
                </button>
              </span>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default withRouter(SignupPage);
