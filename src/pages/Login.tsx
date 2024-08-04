// src/components/Login.tsx
import { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../services/firebaseConfig";

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
    navigate("/checkout");
  }

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <header className="flex flex-col items-center mb-10">
        <span className="font-medium text-lg mt-4">
          Por favor digite suas informações de login
        </span>
      </header>

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
            className="px-4 py-2 w-80 h-12 border border-blue-400 rounded-lg mb-3"
          />
        </div>

        <button
          className="w-80 h-12 bg-customColor-2 rounded-lg text-customColor-5 font-normal text-lg flex items-center justify-center gap-4 hover:opacity-80"
          onClick={handleSignIn}
        >
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;