import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import RegisterInput from "../components/RegisterInput";
import LocaleContext from "../contexts/LocaleContext";
import { register } from "../utils/network-data";

function RegisterPage() {
  const { selectLanguage } = useContext(LocaleContext);
  const navigate = useNavigate();

  async function onRegisterHandler(user) {
    try {
      const { error, message } = await register(user);
      if (!error) {
        alert("User created successfully");
        navigate("/");
      }
    } catch (error) {
      console.error("Error registering user:", error);
      alert("Failed to register user. Please try again.");
    }
  }

  return (
    <section className="register-page">
      <h2>
        {selectLanguage({
          id: "Isi form untuk mendaftar akun.",
          en: "Fill the form to register account.",
        })}
      </h2>
      <RegisterInput register={onRegisterHandler} />
      <p>
        {selectLanguage({
          id: "Sudah punya akun?",
          en: "Already have an account",
        })}{" "}
        <Link to="/">
          {selectLanguage({ id: "Login di sini", en: "Login here" })}
        </Link>
      </p>
    </section>
  );
}

export default RegisterPage;
