import { describe, it, expect, vi, beforeEach } from "vitest";
import reducer, { loadProducts, loadProduct } from "../../store/productsSlice";
import * as api from "../../services/api";

vi.mock("../../services/api");

describe("productsSlice", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("handles loadProducts success", async () => {
    const products = [
      {
        id: 1,
        title: "A",
        price: 10,
        description: "",
        category: "x",
        image: "",
      },
      {
        id: 2,
        title: "B",
        price: 20,
        description: "",
        category: "y",
        image: "",
      },
    ];
    vi.mocked(api.fetchAllProducts).mockResolvedValue(products);

    let state = reducer(undefined, { type: "init" });
    state = reducer(state, { type: loadProducts.pending.type });
    expect(state.status).toBe("loading");

    state = reducer(state, {
      type: loadProducts.fulfilled.type,
      payload: products,
    });
    expect(state.status).toBe("succeeded");
    expect(state.items).toHaveLength(2);
    expect(state.byId[1]?.title).toBe("A");
  });

  it("handles loadProduct success", () => {
    const product = {
      id: 3,
      title: "C",
      price: 30,
      description: "",
      category: "z",
      image: "",
    };
    const state = reducer(undefined, {
      type: loadProduct.fulfilled.type,
      payload: product,
    });
    expect(state.byId[3]).toBeTruthy();
  });
});
