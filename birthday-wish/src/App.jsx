import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";

import "./App.css";

import Hero from "./components/Hero/Hero";
import ScrollToTop from "./components/ScrollToTop";

import HerWorld from "./pages/HerWorld";
import OurStory from "./pages/OurStory/OurStory";
import Birthday from "./pages/Birthday/Birthday";

// Root layout
const RootLayout = () => {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
};

// Application routes
const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Hero />,
      },
      {
        path: "/birthday",
        element: <Birthday />,
      },
      {
        path: "/her-world",
        element: <HerWorld />,
      },
      {
        path: "/story",
        element: <OurStory />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;