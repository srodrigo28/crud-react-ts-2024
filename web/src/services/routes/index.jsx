import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Categoria } from './../../views/Categoria'
import { Produto } from './../../views/Produto'
import { Layout } from './../../templates/Layout'

const Routes = () => {
    const routes = createBrowserRouter([
        { path: "/", element: <Layout />},
        { path: "/categoria", element: <Categoria />},
        { path: "/produto", element: <Produto />},
    ])

    return (
        <RouterProvider router={routes} />
    )
}

export default Routes