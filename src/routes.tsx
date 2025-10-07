import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import ProductsPage from "./screens/ProductsPage";
import ProductDetailPage from "./screens/ProductDetailPage";
import FavoritesPage from "./screens/FavoritesPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <ProductsPage /> },
      { path: "product/:id", element: <ProductDetailPage /> },
      { path: "favorites", element: <FavoritesPage /> },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
