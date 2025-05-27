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
import TextStego from "../components/textStego";
import ImageStego from "../components/imageStego";
import VideoStego from "../components/videoStego";
import AudioStego from "../components/audioStego";

function Home() {
  return (
    <div className="max-w-3xl mx-auto p-6 text-center space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome to the Cryptography System
        </h1>
        <p className="text-gray-600 leading-relaxed">
          This system showcases classic and modern cryptographic techniques,
          including encryption ciphers, hashing algorithms, and steganography.
          It serves as an educational tool to help users understand the basics
          and applications of cryptography in securing data.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Members</h2>
        <ul className="text-gray-700 space-y-1">
          <li> Ricky Dela Cruz</li>
          <li> Bernadeth Catusalem</li>
          <li> Angel Heart Mendoza</li>
          <li> Jon Mickyl Sumagang</li>
        </ul>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow px- py-4">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 max-w-7xl mx-auto">
          <Link
            to="/"
            className="font-medium text-gray-700 hover:text-blue-500"
          >
            Home
          </Link>
          <Link to="/atbash" className="text-gray-700 hover:text-blue-500">
            Atbash / Substitution
          </Link>
          <Link to="/caesar" className="text-gray-700 hover:text-blue-500">
            Caesar
          </Link>
          <Link to="/vigenere" className="text-gray-700 hover:text-blue-500">
            Vigenere
          </Link>
          <Link
            to="/transposition"
            className="text-gray-700 hover:text-blue-500"
          >
            Transposition
          </Link>
          <Link
            to="/columnarTransposition"
            className="text-gray-700 hover:text-blue-500"
          >
            Columnar Transposition
          </Link>
          <Link to="/grille" className="text-gray-700 hover:text-blue-500">
            Grille
          </Link>
          <Link to="/playfair" className="text-gray-700 hover:text-blue-500">
            Playfair
          </Link>

          {/* Hashing Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 text-gray-700 bg-gray-100 px-3 py-1.5 rounded hover:bg-gray-200 focus:outline-none">
              Hashing
              <svg
                className="w-4 h-4"
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
            <div className="absolute left-0 mt-2 w-44 bg-white border rounded shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition duration-150 z-10">
              <Link
                to="/lanman"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Lanman
              </Link>
              <Link
                to="/ntlm"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                NTLM
              </Link>
              <Link
                to="/scrypt"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Scrypt
              </Link>
              <Link
                to="/ethash"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Ethash
              </Link>
            </div>
          </div>

          {/* Stenography Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 text-gray-700 bg-gray-100 px-3 py-1.5 rounded hover:bg-gray-200 focus:outline-none">
              Stenography
              <svg
                className="w-4 h-4"
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
            <div className="absolute left-0 mt-2 w-44 bg-white border rounded shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition duration-150 z-10">
              <Link
                to="/textStego"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Text Stenography
              </Link>
              <Link
                to="/imageStego"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Image Stenography
              </Link>
              <Link
                to="/audioStego"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Audio Stenography
              </Link>
              <Link
                to="/videoStego"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Video Stenography
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="p-6">
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
          <Route path="/textStego" element={<TextStego />} />
          <Route path="/imageStego" element={<ImageStego />} />
          <Route path="/videoStego" element={<VideoStego />} />
          <Route path="/AudioStego" element={<AudioStego />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
