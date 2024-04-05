import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import LoginInput from "../components/LoginInput";
import LocaleContext from "../contexts/LocaleContext";
import { login } from "../utils/network-data";

function LoginPage({ loginSuccess }) {
  const { selectLanguage } = useContext(LocaleContext);

  async function onLogin({ email, password }) {
    try {
      const { error, data } = await login({ email, password });

      if (!error) {
        loginSuccess(data);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Failed to login. Please try again.");
    }
  }

  return (
    <section className="login-page">
      <h2>
        {selectLanguage({
          id: "Yuk, login untuk menggunakan aplikasi.",
          en: "Login to use app, please.",
        })}
      </h2>
      <LoginInput login={onLogin} />
      <p>
        {selectLanguage({
          id: "Belum punya akun?",
          en: "Don't have an account?",
        })}{" "}
        <Link to="/register">
          {selectLanguage({ id: "Daftar di sini", en: "Register here" })}
        </Link>
      </p>
    </section>
  );
}

LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
};

export default LoginPage;
