import { createBrowserRouter, RouterProvider } from 'react-router'
import { Applayout } from './UI/Applayout'
import { Home } from './Pages/Home'
import { About } from './Pages/About'
import { Contact } from './Pages/Contact'
import { PageError } from './Pages/PageError'
import { Country } from './Pages/Country'
import { CountryDetails } from './Pages/CountryDetails'
import { FindCountryData } from './UI/FindCountryData'
import { ReactLenis } from 'lenis/react'
import { PasswordModify } from './UI/PasswordModify'
const App = () => {
  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <Applayout />,
        errorElement: <PageError />,
        children: [
          {
            path: "/",
            element: <Home />
          },
          {
            path: "/about",
            element: <About />
          },
          {
            path: "/country",
            element: <FindCountryData><Country /></FindCountryData>
          },
          {
            path: "/country/:id",
            element: <CountryDetails />,
          },
          {
            path: "/contact",
            element: <Contact />
          },
          {
            path: "/PasswordModify",
            element: <PasswordModify />
          }
        ]
      }
    ]
  )
  return (
    <>
      <ReactLenis root>

        <RouterProvider router={router}></RouterProvider>

      </ReactLenis>


    </>
  )
}

export default App