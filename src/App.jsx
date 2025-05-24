import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Atbash from "./pages/atbash";
import Caesar from "./pages/caesar";
import Vigenere from "./pages/vigenere";
import Transposition from "./pages/transposition";
import ColumnarTransposition from "./pages/columnarTransposition";
import Grille from "./pages/grille";
import Playfair from "./pages/playfair";
import LanmanHash from "./pages/lanman";
import Ntlm from "./pages/ntlm";
import Scrypt from "./pages/scrypt";
import Ethash from "./pages/ethash";

function Home() {
  return <h1>Home Page</h1>;
}

function App() {
  return (
    <div>
      <nav className="p-4 flex gap-3">
        <Link to="/">Home</Link>
        <Link to="/atbash">Atbash/Substitution</Link>
        <Link to="/caesar">Caesar</Link>
        <Link to="/vigenere">Vigenere</Link>
        <Link to="/transposition">Transposition</Link>
        <Link to="/columnarTransposition">Columnar Transposition</Link>
        <Link to="/grille">Grille</Link>
        <Link to="/playfair">Playfair</Link>
        <Link to="/lanman">Lanman</Link>
        <Link to="/ntlm">Ntlm</Link>
        <Link to="/scrypt">Scrypt</Link>
        <Link to="/ethash">Ethash</Link>
      </nav>

      <main className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/atbash" element={<Atbash />} />
          <Route path="/caesar" element={<Caesar />} />
          <Route path="/vigenere" element={<Vigenere />} />
          <Route path="/transposition" element={<Transposition />} />
          <Route
            path="/columnarTransposition"
            element={<ColumnarTransposition />}
          />
          <Route path="/grille" element={<Grille />} />
          <Route path="/playfair" element={<Playfair />} />
          <Route path="/lanman" element={<LanmanHash />} />
          <Route path="/ntlm" element={<Ntlm />} />
          <Route path="/scrypt" element={<Scrypt />} />
          <Route path="/ethash" element={<Ethash />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
