import React from "react";
import PropTypes from "prop-types";
import useInput from "../hooks/useInput";
import LocaleContext from "../contexts/LocaleContext";

function RegisterInput({ register }) {
  const { selectLanguage } = React.useContext(LocaleContext);
  const [name, setName] = useInput("");
  const [email, setEmail] = useInput("");
  const [password, setPassword] = useInput("");
  const [confirmPassword, setConfirmPassword] = useInput("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      return alert(
        selectLanguage({
          id: "Password dan konfirmasi password harus sama.",
          en: "Password and confirm password must match.",
        })
      );
    }

    register({
      name,
      email,
      password,
    });
  };

  return (
    <div className="input-register">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          {selectLanguage({ id: "Nama", en: "Name" })}
        </label>
        <input type="text" id="name" value={name} onChange={setName} />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={setEmail}
          autoComplete="new-email"
        />
        <label htmlFor="password">
          {selectLanguage({ id: "Kata Sandi", en: "Password" })}
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={setPassword}
          autoComplete="new-password"
        />
        <label htmlFor="confirmPassword">
          {selectLanguage({
            id: "Konfirmasi Kata Sandi",
            en: "Confirm Password",
          })}
        </label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={setConfirmPassword}
          autoComplete="new-confirm-password"
        />
        <button type="submit">
          {selectLanguage({ id: "Daftar", en: "Register" })}
        </button>
      </form>
    </div>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
