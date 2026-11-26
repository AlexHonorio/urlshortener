import { useState } from "react";
import { userRegister } from "../services/authService";

function UserRegister() {

    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        setError("");
        setSuccess("");

        if(userName.trim().length < 3 || userName.trim().length > 30) {
            setError("O nome de usuário deve possuir entre 3 e 30 caracteres.");
            return;
        }


        if(!userEmail.trim()) {
            setError("Informe seu e-mail.");
            return;
        }

        if (password.length < 12 || password.length > 72) {
            setError("A senha deve possuirno mínimo 12 caracteres.");
            return;
        }

        if (password !== confirmPassword) {
            setError("As senhas não coincidem.");
            return;
        }

        setLoading(true);

        try{
            await userRegister({ 
                userName: userName.trim(),
                userEmail: userEmail.trim(),
                password 
            });

            setSuccess("Cadastro realizado com sucesso!");

            setUserName("");
            setUserEmail("");
            setPassword("");
            setConfirmPassword("");

        } catch (error ){
            setError(error instanceof Error ? error.message : "Erro inesperado ao realizar o cadastro");

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#ccdae0] flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
                <h1 className="text-3xl font-bold text-[#1C2B3E] text-center mb-2">
                Criar conta
                </h1>

                <p className="text-center text-gray-600 mb-6">
                Preencha os dados para se cadastrar
                </p>

                <form onSubmit={handleRegister} className="flex flex-col gap-4">
                    <div>
                        <label
                        htmlFor="userName"
                        className="block text-sm font-medium text-gray-700 mb-1"
                        >
                        Nome
                        </label>

                        <input
                        id="userName"
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        maxLength={30}
                        minLength={3}
                        required
                        autoComplete="name"
                        disabled={loading}
                        placeholder="Seu nome"
                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#3C678E]"
                        />
                    </div>

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
                        onChange={(e) => setUserEmail(e.target.value)}
                        maxLength={254}
                        required
                        autoComplete="email"
                        disabled={loading}
                        placeholder="seu@email.com"
                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#3C678E]"
                        />
                    </div>

                    <div>
                        <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700 mb-1"
                        >
                        Senha
                        </label>

                        <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        minLength={12}
                        maxLength={72}
                        required
                        autoComplete="new-password"
                        disabled={loading}
                        placeholder="Mínimo de 12 caracteres"
                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#3C678E]"
                        />
                    </div>

                    <div>
                        <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium text-gray-700 mb-1"
                        >
                        Confirmar senha
                        </label>

                        <input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        autoComplete="new-password"
                        disabled={loading}
                        placeholder="Repita sua senha"
                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#3C678E]"
                        />
                    </div>

                    {error && (
                        <p className="text-red-600 text-sm text-center" role="alert">
                        {error}
                        </p>
                    )}

                    {success && (
                        <p className="text-green-600 text-sm text-center" role="status">
                        {success}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#1C2B3E] text-white p-3 rounded-lg font-semibold hover:bg-[#3C678E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Cadastrando..." : "Cadastrar"}
                    </button>
                </form>
            </div>
        </div>
    );

        


} export default UserRegister;