import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../../store/productsSlice";
import filtersReducer from "../../store/filtersSlice";
import favoritesReducer from "../../store/favoritesSlice";
import App from "../../App";
import ProductsPage from "../../screens/ProductsPage";
import ProductDetailPage from "../../screens/ProductDetailPage";
import FavoritesPage from "../../screens/FavoritesPage";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import * as api from "../../services/api";
import "@testing-library/jest-dom";
import { vi } from "vitest";

vi.mock("../../services/api");

const products = [
  {
    id: 1,
    title: "Phone Case",
    price: 9.99,
    description: "",
    category: "accessories",
    image: "https://via.placeholder.com/300",
  },
  {
    id: 2,
    title: "Laptop",
    price: 999,
    description: "",
    category: "electronics",
    image: "https://via.placeholder.com/300",
  },
];

vi.mocked(api.fetchAllProducts).mockResolvedValue(products);
vi.mocked(api.fetchProductById).mockImplementation(async (id: number) => {
  const product = products.find((p) => p.id === id);
  if (!product) throw new Error("Product not found");
  return product;
});
vi.mocked(api.fetchCategories).mockResolvedValue([
  "accessories",
  "electronics",
]);

function renderApp() {
  const store = configureStore({
    reducer: {
      products: productsReducer,
      filters: filtersReducer,
      favorites: favoritesReducer,
    },
  });
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route element={<App />} path="/">
            <Route index element={<ProductsPage />} />
            <Route path="product/:id" element={<ProductDetailPage />} />
            <Route path="favorites" element={<FavoritesPage />} />
          </Route>
        </Routes>
      </MemoryRouter>
    </Provider>
  );
}

describe("Product Dashboard flows", () => {
  it("search, filter, favorite flow", async () => {
    renderApp();

    // Wait for products
    await screen.findByText(/Phone Case/i);

    // Search
    const search = screen.getByLabelText(/Search products/i);
    await userEvent.clear(search);
    await userEvent.type(search, "laptop");
    await screen.findByText(/Laptop/i);

    // Sort
    await userEvent.selectOptions(
      screen.getByLabelText(/Sort by price/i),
      "price-desc"
    );

    // Open detail and favorite
    await userEvent.click(screen.getByText(/Laptop/i));
    await screen.findByRole("button", { name: /Add to Favorites/i });
    await userEvent.click(
      screen.getByRole("button", { name: /Add to Favorites/i })
    );

    // Go to favorites
    await userEvent.click(screen.getByRole("link", { name: /Favorites/i }));
    await screen.findByText(/Laptop/i);

    // Remove
    await userEvent.click(screen.getByRole("button", { name: /Remove/i }));
    await waitFor(() => {
      expect(screen.queryByText(/Laptop/i)).not.toBeInTheDocument();
    });
  }, 15000);
});
