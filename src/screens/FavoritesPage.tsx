import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { removeFavorite } from "../store/favoritesSlice";

export default function FavoritesPage() {
  const favoriteIds = useAppSelector((s) => s.favorites.ids);
  const productsById = useAppSelector((s) => s.products.byId);
  const dispatch = useAppDispatch();
  const favorites = favoriteIds.map((id) => productsById[id]).filter(Boolean);

  if (favoriteIds.length === 0) {
    return (
      <div>
        No favorites yet. Browse{" "}
        <Link className="text-blue-600 underline" to="/">
          products
        </Link>
        .
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {favorites.map((p) => (
        <li key={p!.id} className="bg-white rounded-lg border overflow-hidden">
          <Link to={`/product/${p!.id}`} className="block">
            <img
              src={p!.image}
              alt={p!.title}
              className="h-48 w-full object-contain bg-gray-50"
            />
            <div className="p-4 space-y-2">
              <h3 className="font-medium line-clamp-2" title={p!.title}>
                {p!.title}
              </h3>
              <div className="font-semibold">${p!.price.toFixed(2)}</div>
            </div>
          </Link>
          <div className="p-4 pt-0">
            <button
              onClick={() => dispatch(removeFavorite(p!.id))}
              className="w-full rounded border px-3 py-2 hover:bg-gray-50"
            >
              Remove
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
