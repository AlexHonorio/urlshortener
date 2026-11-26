import "tailwindcss";
import "./App.css";
import "./index.css";
import { useState } from "react";
import UserRegister from "./components/userRegister";

function App() {
  const [mostrarCadastro, setMostrarCadastro] = useState(false);
  const [link, setLink] = useState("");
  const [shortLink, setShortLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  

  const colarLink = async () => {
    try{
      const text = await navigator.clipboard.readText();
      setLink(text);
    }catch(error) {
      console.error("Erro ao colar o link: ", error)
    }
  };

  const copiarLink = async () => {
    try{
      await navigator.clipboard.writeText(shortLink);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 3000);

    }catch(error) {
      console.error("Erro ao copiar o link: ", error)
    }
  }

  const obterCsrfToken = () => {
    const cookie = document.cookie
    .split('; ')
    .find((item) => item.startsWith("XSRF-TOKEN="));

    return cookie ? decodeURIComponent(cookie.split('=')[1]) : null;
  }


  const encurtarLink = async () => {
    if (!link.trim()) {
      setError("Enter a valid HTTP or HTTPS URL");
      return;
    }

    setLoading(true);
    setError("");
    setShortLink("");

    try {
      // Solicita o token CSRF
      const csrfResponse = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/csrf`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!csrfResponse.ok) {
        throw new Error("Não foi possível obter o token CSRF.");
      }

      const csrfToken = obterCsrfToken();

      if (!csrfToken) {
        throw new Error("Não foi possível obter o token de segurança.");
      }

      // Envia a URL para o backend
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/shorten`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "X-XSRF-TOKEN": csrfToken,
          },
          body: JSON.stringify({
            url: link.trim(),
            expiration: null,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Não foi possível encurtar o link."
        );
      }

      setShortLink(data.shortUrl);

    } catch (error) {
      console.error("Erro ao encurtar o link: ", error);

      setError(
        error instanceof Error
          ? error.message
          : "Ocorreu um erro ao encurtar o link."
      );

    } finally {
      setLoading(false);
    }
  };



  if (mostrarCadastro) {
    return (
      <div className="min-h-screen bg-[#ccdae0] flex flex-col relative">
        
        <button
          onClick={() => setMostrarCadastro(false)}
          className="
          absolute
          top-4
          left-4
          z-10
          bg-[#1C2B3E] 
          text-white
          px-4
          py-2
          rounded-md
          hover:bg-[#3C678E]
          transition-colors"
        >
          ← Voltar
        </button>
        

        <UserRegister />
      </div>
    );
  }
  
  

  return (

    <div className="h-screen bg-[#ccdae0] flex flex-col items-center" >

      <div className="
        min-h-24
        w-full
        px-6
        bg-[#3C678E]
        text-white
        flex
        items-center
        justify-between
        "
      >

        <h1 className="font-fira-sans text-3xl md:text-5xl">
          Encurtador de Links
        </h1>

        <button
          onClick={() => setMostrarCadastro(true)}
          className="
            bg-[#1C2B3E]
            px-4
            py-2
            rounded-md
            cursor-pointer
            hover:bg-[#243e5c]
            transition-colors"
          >
          Criar conta
        </button>

      </div>

    
      <div className="flex justify-center gap-1 pt-36">

        <div className="relative">

          <input className="
            h-12
            w-120
            p-2
            border
            border-black"
            placeholder="Cole seu link aqui"
            value={link}
            onChange={(e) => {
              setLink (e.target.value);
              setShortLink("");
              setError("");
              setCopied(false);

            }}
          >
          </input>

        
          <button onClick={colarLink}
            className="
            absolute 
            right-1.5
            top-1/2
            -translate-y-1/2
            h-9 w-14
            rounded-md
            bg-[#3C678E]
            font-light
            text-white
            cursor-pointer
            hover:bg-[#1C2B3E]"
          >
            <p>colar</p>
          </button>

        </div>

        <button onClick={encurtarLink}
          disabled={loading}
          className="
          h-12
          w-36
          bg-[#1C2B3E]
          cursor-pointer
          disabled:opacity-50"
        >
          <p className="text-white font-semibold">{loading ? "Aguarde..." : "Encurtar"}</p>
        </button>

      </div>


      {shortLink && (
        <div className="w-157 h-42 flex flex-col gap-1 mt-2 border-b-2 border-r-2 border-l-2 rounded-xl border-[#1C2B3E] ">
           
          <p className="text-[#1C2B3E] p-2 pb-6 ml-2 font-semibold font-pt-sans">Seu link encurtado:</p>


          <div className="relative w-120 self-center ">


            <div className=" h-12 w-120 bg-white border border-black flex items-center px-2 pr-28">
              
              <p className="truncate">
                {shortLink}
              </p>

            </div>


            <button onClick={copiarLink} 
              className="
              absolute
              right-1.5
              top-1/2
              -translate-y-1/2
              h-9
              w-24
              
              
              bg-[#3C678E]
              text-white
              cursor-pointer
              hover:bg-[#1C2B3E]
              flex
              items-center
              justify-center
              rounded-md"
            >
              <p>{copied? "✓" : "copiar"}</p>
            </button> 

          </div>
          

          
        </div>
      )}
      {error && (
        <p className="text-red-600 mt-2">{error}</p>
      )}
      

    </div>
    

    
  )
}

export default App