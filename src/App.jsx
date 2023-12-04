import { useState } from "react";
import Logo from "./assets/logo.webp";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const preventDefault = (f) => (e) => {
    e.preventDefault();
    f(e);
  };

  const handleSubmit = preventDefault(() => {
    if (query) {
      navigate(`/${encodeURIComponent(query)}`)
    }
  });

  return (
    <section className="curved">
      <main className="min-h-screen p-24">
        <div className="bg-white py-4 px-6 rounded-3xl w-full max-w-2xl mx-auto">
          <div className="flex w-full gap-4">
            <input
              onChange={(e) => handleChange(e)}
              className="form-input"
              name="correo"
              type="text"
              placeholder="Correo*"
              value={query}
            />
            <button className="form-button" onClick={handleSubmit}>
              Buscar
            </button>
          </div>
        </div>
        <div className="flex h-48 w-full items-end justify-center">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="/"
          >
            By <img src={Logo} alt="Liventi Logo" width={100} height={24} />
          </a>
        </div>
      </main>
    </section>
  );
}

export default App;
