import { describe, it, expect } from "vitest";
import favoritesReducer, {
  addFavorite,
  removeFavorite,
  toggleFavorite,
  clearFavorites,
} from "../../store/favoritesSlice";

describe("favoritesSlice", () => {
  it("should handle initial state", () => {
    const state = favoritesReducer(undefined, { type: "init" });
    expect(state).toEqual({ ids: [] });
  });

  it("add/remove favorite", () => {
    let state = favoritesReducer(undefined, addFavorite(1));
    expect(state.ids).toEqual([1]);
    state = favoritesReducer(state, removeFavorite(1));
    expect(state.ids).toEqual([]);
  });

  it("toggle favorite", () => {
    let state = favoritesReducer(undefined, toggleFavorite(2));
    expect(state.ids).toEqual([2]);
    state = favoritesReducer(state, toggleFavorite(2));
    expect(state.ids).toEqual([]);
  });

  it("clear favorites", () => {
    const state = favoritesReducer({ ids: [1, 2, 3] }, clearFavorites());
    expect(state.ids).toEqual([]);
  });
});
