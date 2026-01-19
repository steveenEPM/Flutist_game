import { createRoutesFromElements, createBrowserRouter, RouterProvider } from "react-router-dom"


import ScreenHomes from "./screens/home"
import ScreenDetails from "./screens/details"
import ScreenExplorer from "./screens/explorer"
import ScreenPopularity from "./screens/ppularity"



function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <ScreenHomes />
    },
    {
      path: "/explorer",
      element: <ScreenExplorer />,

    },
    {
      path: "/popularity",
      element: <ScreenPopularity />,

    },
    {
      path: "/details/:platform",
      element: <ScreenDetails />,
    }
  ])

  return <RouterProvider router={router} />
}

export default App
