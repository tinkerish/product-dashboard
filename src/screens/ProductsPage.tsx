import { useEffect, useMemo, useState } from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { loadProducts } from "../store/productsSlice";
import { setCategory, setSearch, setSort } from "../store/filtersSlice";
import { Link } from "react-router-dom";

export default function ProductsPage() {
  const dispatch = useAppDispatch();
  const { items, status } = useAppSelector((s) => s.products);
  const filters = useAppSelector((s) => s.filters);
  const [searchInput, setSearchInput] = useState(filters.search);

  useEffect(() => {
    if (status === "idle") dispatch(loadProducts());
  }, [status, dispatch]);

  useEffect(() => {
    const handle = setTimeout(() => dispatch(setSearch(searchInput)), 300);
    return () => clearTimeout(handle);
  }, [searchInput, dispatch]);

  const filtered = useMemo(() => {
    let list = items;
    if (filters.search) {
      const q = filters.search.toLowerCase();
      list = list.filter((p) => p.title.toLowerCase().includes(q));
    }
    if (filters.category !== "all") {
      list = list.filter((p) => p.category === filters.category);
    }
    if (filters.sort === "price-asc")
      list = [...list].sort((a, b) => a.price - b.price);
    if (filters.sort === "price-desc")
      list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [items, filters]);

  const categories = useMemo(() => {
    const set = new Set(items.map((p) => p.category));
    return ["all", ...Array.from(set)];
  }, [items]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search by title..."
          className="w-full md:w-80 rounded border px-3 py-2"
          aria-label="Search products"
        />
        <div className="flex gap-3">
          <select
            value={filters.category}
            onChange={(e) => dispatch(setCategory(e.target.value))}
            className="rounded border px-3 py-2"
            aria-label="Filter by category"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select
            value={filters.sort}
            onChange={(e) =>
              dispatch(
                setSort(e.target.value as "none" | "price-asc" | "price-desc")
              )
            }
            className="rounded border px-3 py-2"
            aria-label="Sort by price"
          >
            <option value="none">Sort</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {status === "loading" && <div role="status">Loading...</div>}
      {status === "failed" && <div role="alert">Failed to load products.</div>}

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((p) => (
          <li key={p.id} className="bg-white rounded-lg border overflow-hidden">
            <Link to={`/product/${p.id}`} className="block">
              <img
                src={p.image}
                alt={p.title}
                className="h-48 w-full object-contain bg-gray-50"
              />
              <div className="p-4 space-y-2">
                <h3 className="font-medium line-clamp-2" title={p.title}>
                  {p.title}
                </h3>
                <div className="text-sm text-gray-500">{p.category}</div>
                <div className="font-semibold">${p.price.toFixed(2)}</div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
