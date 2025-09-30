import './App.css';

import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";

import About from "./pages/About/About.js";
import ConstellationMemoryGame from './games/Constellation-Memory/ConstellationMemoryGame.js';
import ConstellationTriviaGame from './games/Constellation-Trivia/ConstellationTriviaGame.js';
import ConstellationWordGuessGame from './games/Constellation-Word-Guess/ConstellationWordGuessGame.js';
import Home from "./pages/Home/Home.js";
import Library from "./pages/Library/Library.js";
import Navbar from "./components/Navbar/Navbar.js";
import Test from "./pages/Test/Test.js";

const AppLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path:"about",
          element: <About />
        },
        {
          path:"library",
          element: <Library />
        },
        {
          path:"game",
          children: [
            {
              path: "memory",
              element: <ConstellationMemoryGame />
            },
            {
              path: "trivia",
              element: <ConstellationTriviaGame />
            },
            {
              path: "word-guess",
              element: <ConstellationWordGuessGame />
            }
          ]
        },
        {
          path:"test",
          element: <Test />
        }
      ]
    }
  ], {
    basename: "/games"
  });

  return <RouterProvider router={router} />;
}

export default App;
