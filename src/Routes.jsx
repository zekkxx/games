import './App.css';

import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";

import About from "./pages/About";
import ConstellationMemoryGame from './games/Constellation-Memory';
import ConstellationTriviaGame from './games/Constellation-Trivia';
import ConstellationWordGuessGame from './games/Constellation-Word-Guess';
import Home from "./pages/Home";
import Library from "./pages/Library";
import Navbar from "./components/Navbar";
import Test from "./pages/Test";

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
