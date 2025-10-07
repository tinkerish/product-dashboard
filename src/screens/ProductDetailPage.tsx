import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { loadProduct } from "../store/productsSlice";
import { toggleFavorite } from "../store/favoritesSlice";

export default function ProductDetailPage() {
  const { id } = useParams();
  const productId = Number(id);
  const dispatch = useAppDispatch();
  const product = useAppSelector((s) => s.products.byId[productId]);
  const favorites = useAppSelector((s) => s.favorites.ids);
  const isFav = favorites.includes(productId);

  useEffect(() => {
    if (!product && !Number.isNaN(productId)) {
      dispatch(loadProduct(productId));
    }
  }, [productId, product, dispatch]);

  if (!product) return <div role="status">Loading...</div>;

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="bg-white border rounded p-6 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-96 object-contain"
        />
      </div>
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">{product.title}</h1>
        <div className="text-gray-600">{product.category}</div>
        <div className="text-xl font-bold">${product.price.toFixed(2)}</div>
        <p className="text-gray-700">{product.description}</p>
        <button
          onClick={() => dispatch(toggleFavorite(product.id))}
          className={`rounded px-4 py-2 text-white ${
            isFav ? "bg-red-600" : "bg-blue-600"
          }`}
          aria-pressed={isFav}
        >
          {isFav ? "Remove from Favorites" : "Add to Favorites"}
        </button>
      </div>
    </div>
  );
}
