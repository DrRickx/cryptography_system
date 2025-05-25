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
import Steganography from "./pages/stenography";

function Home() {
  return <h1>Home Page</h1>;
}

function App() {
  return (
    <div>
      <nav className="p-4 flex gap-4 flex-wrap items-center bg-gray-100">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <Link to="/atbash" className="hover:underline">
          Atbash/Substitution
        </Link>
        <Link to="/caesar" className="hover:underline">
          Caesar
        </Link>
        <Link to="/vigenere" className="hover:underline">
          Vigenere
        </Link>
        <Link to="/transposition" className="hover:underline">
          Transposition
        </Link>
        <Link to="/columnarTransposition" className="hover:underline">
          Columnar Transposition
        </Link>
        <Link to="/grille" className="hover:underline">
          Grille
        </Link>
        <Link to="/playfair" className="hover:underline">
          Playfair
        </Link>

        {/* Hashing Dropdown */}
        <div className="relative group">
          <button className="inline-flex items-center bg-gray-200 hover:bg-gray-300 text-black px-3 py-1 rounded">
            Hashing
            <svg
              className="ml-1 w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          <div className="absolute left-0 mt-1 w-40 bg-white border border-gray-200 rounded shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible invisible transition duration-200 z-10">
            <Link to="/lanman" className="block px-4 py-2 hover:bg-gray-100">
              Lanman
            </Link>
            <Link to="/ntlm" className="block px-4 py-2 hover:bg-gray-100">
              NTLM
            </Link>
            <Link to="/scrypt" className="block px-4 py-2 hover:bg-gray-100">
              Scrypt
            </Link>
            <Link to="/ethash" className="block px-4 py-2 hover:bg-gray-100">
              Ethash
            </Link>
          </div>
        </div>

        <Link to="/stenography" className="hover:underline">
          Stenography
        </Link>
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
          <Route path="/stenography" element={<Steganography />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
