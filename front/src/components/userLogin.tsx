
import { useState } from "react";
import { loginUser } from "../services/authService";

interface LoginProps {
  onVoltar: () => void;
}

function Login({ onVoltar }: LoginProps) {
    const [userEmail, setUserEmail] = useState("");
    const [password, setPassword] = useState("");

    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    if (!userEmail.trim() || !password) {
      setError("Preencha o e-mail e a senha.");
      return;
    }

    setLoading(true);

    try {
      await loginUser({
        userEmail: userEmail.trim(),
        password,
      });

      // Por enquanto, apenas informamos que o login deu certo.
      // A próxima etapa será controlar o usuário autenticado na aplicação.
      alert("Login realizado com sucesso!");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Não foi possível realizar o login."
      );
    } finally {
      setLoading(false);
    }
  };

return (
    <div className="min-h-screen bg-[#ccdae0] flex items-center justify-center p-4 relative">

        <button
            type="button"
            onClick={onVoltar}
            className="
            absolute
            top-4
            left-4
            bg-[#1C2B3E]
            text-white
            px-4
            py-2
            rounded-md
            hover:bg-[#3C678E]
            transition-colors
            "
        >
            ← Voltar
        </button>

        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

            <h1 className="text-3xl font-bold text-[#1C2B3E] text-center mb-2">
            Entrar
            </h1>

            <p className="text-center text-gray-600 mb-6">
            Acesse sua conta
            </p>

            <form onSubmit={handleLogin} className="flex flex-col gap-4">

                <div>
                    <label
                    htmlFor="userEmail"
                    className="block text-sm font-medium text-gray-700 mb-1"
                    >
                    E-mail
                    </label>

                    <input
                    id="userEmail"
                    type="email"
                    value={userEmail}
                    onChange={(e) => {
                        setUserEmail(e.target.value);
                        setError("");
                    }}
                    maxLength={254}
                    required
                    autoComplete="email"
                    disabled={loading}
                    placeholder="seu@email.com"
                    className="
                        w-full
                        border
                        border-gray-300
                        rounded-lg
                        p-3
                        focus:outline-none
                        focus:ring-2
                        focus:ring-[#3C678E]
                    "
                    />
                </div>

                <div>
                    <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                    >
                    Senha
                    </label>

                    <div className="relative">
                    <input
                        id="password"
                        type={mostrarSenha ? "text" : "password"}
                        value={password}
                        onChange={(e) => {
                        setPassword(e.target.value);
                        setError("");
                        }}
                        required
                        autoComplete="current-password"
                        disabled={loading}
                        placeholder="Sua senha"
                        className="
                        w-full
                        border
                        border-gray-300
                        rounded-lg
                        p-3
                        pr-20
                        focus:outline-none
                        focus:ring-2
                        focus:ring-[#3C678E]
                        "
                    />

                    <button
                        type="button"
                        onClick={() => setMostrarSenha((atual) => !atual)}
                        disabled={loading}
                        className="
                        absolute
                        right-3
                        top-1/2
                        -translate-y-1/2
                        text-sm
                        text-[#3C678E]
                        hover:text-[#1C2B3E]
                        "
                    >
                        {mostrarSenha ? "Ocultar" : "Mostrar"}
                    </button>
                    </div>
                </div>

                {error && (
                    <p
                    className="text-red-600 text-sm text-center"
                    role="alert"
                    >
                    {error}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="
                    w-full
                    bg-[#1C2B3E]
                    text-white
                    p-3
                    rounded-lg
                    font-semibold
                    hover:bg-[#3C678E]
                    transition-colors
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                    "
                >
                    {loading ? "Entrando..." : "Entrar"}
                </button>

            </form>
        </div>
    </div>
);
}

export default Login;
