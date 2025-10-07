import { Outlet, Link } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="text-2xl font-bold text-blue-600 hover:text-blue-700"
          >
            Product Dashboard
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              to="/"
              className="text-gray-700 font-medium hover:text-blue-600 transition-colors"
            >
              Products
            </Link>
            <Link
              to="/favorites"
              className="text-gray-700 font-medium hover:text-blue-600 transition-colors"
            >
              Favorites
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <Outlet />
        </div>
      </main>

      <footer className="bg-blue-50 border-t">
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0">
          <span className="text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} Product Dashboard. All rights
            reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}

export default App;
