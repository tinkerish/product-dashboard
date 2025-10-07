import { describe, it, expect } from "vitest";
import filtersReducer, {
  setSearch,
  setCategory,
  setSort,
  resetFilters,
} from "../../store/filtersSlice";

describe("filtersSlice", () => {
  it("should handle initial state", () => {
    const state = filtersReducer(undefined, { type: "init" });
    expect(state).toEqual({ search: "", category: "all", sort: "none" });
  });

  it("should set search", () => {
    const next = filtersReducer(undefined, setSearch("phone"));
    expect(next.search).toBe("phone");
  });

  it("should set category", () => {
    const next = filtersReducer(undefined, setCategory("electronics"));
    expect(next.category).toBe("electronics");
  });

  it("should set sort", () => {
    const next = filtersReducer(undefined, setSort("price-asc"));
    expect(next.sort).toBe("price-asc");
  });

  it("should reset filters", () => {
    const modified = {
      search: "a",
      category: "electronics" as const,
      sort: "price-desc" as const,
    };
    const next = filtersReducer(modified, resetFilters());
    expect(next).toEqual({ search: "", category: "all", sort: "none" });
  });
});
