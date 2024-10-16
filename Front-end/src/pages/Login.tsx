// src/components/Login.tsx
import { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../services/firebaseConfig";
import { FaArrowLeft } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const handleSignIn = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    signInWithEmailAndPassword(email, password);
  };

  if (loading) {
    return <p>carregando...</p>;
  }

  if (user) {
    navigate("/");
  }

  return (
    <div className="w-screen h-full">
      <NavLink to="/" end>
        <button className="font-poppins mx-8 mt-8 mb-48 p-4 bg-customColor-2 rounded-lg text-customColor-5 font-normal text-lg flex g-4 items-center hover:opacity-80">
          <FaArrowLeft className="mr-4" />
          Home
        </button>
      </NavLink>

      <div className="w-full h-full flex flex-col items-center justify-center">
        <h1 className="flex flex-col items-center mb-10">
          <span className="font-medium text-lg mt-4">
            Por favor digite suas informações de login
          </span>
        </h1>

        <form className="flex flex-col items-center">
          <div className="flex flex-col mb-6">
            <label htmlFor="email" className="font-normal text-sm mb-2">
              E-mail
            </label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="user@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2 w-80 h-12 border border-customColor-2 rounded-lg mb-3"
            />
          </div>

          <div className="flex flex-col mb-6">
            <label htmlFor="password" className="font-normal text-sm mb-2">
              Senha
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="********************"
              onChange={(e) => setPassword(e.target.value)}
              className="px-4 py-2 w-80 h-12 border border-customColor-2 rounded-lg mb-3"
            />
          </div>

          <button
            className="font-poppins w-80 h-12 bg-customColor-2 rounded-lg text-customColor-5 font-normal text-lg flex items-center justify-center gap-4 hover:opacity-80"
            onClick={handleSignIn}
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
