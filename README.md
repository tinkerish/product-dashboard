# Product Dashboard

A **React + TypeScript + Vite** project with **Redux Toolkit**, featuring:

- Product listing with search, sort, and filters  
- Product detail pages  
- Favorites management  
- Unit and integration tests with **Vitest**  


## Setup Instructions

1. Clone the repository:

```bash
git clone <repository-url>
cd product-dashboard
````

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open `http://localhost:5173` in your browser.


## Notes

* **React + TypeScript + Vite** setup
* **Redux Toolkit** used for state management
* **Async actions** implemented using `createAsyncThunk`
* **Favorites** are managed in Redux; currently frontend-only
* **Search** input is debounced to reduce unnecessary state updates
* Unit and integration tests cover slices and key UI flows


## Running Tests

* **Run all tests:**

```bash
npm run test
```

* **Run tests with coverage report:**

```bash
npm run test:coverage
```

* **Coverage report location:**

```
coverage/
 ├─ lcov-report/      # HTML report
 └─ coverage-summary.txt
```

> Open `lcov-report/index.html` in your browser to view per-file coverage.

---

## Test Results (Sample)

**Coverage Summary:**

```
 % Coverage report from v8
--------------------------------|---------|----------|---------|---------|-------------------
File                            | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
--------------------------------|---------|----------|---------|---------|-------------------
All files                       |   73.05 |     79.1 |   62.06 |   73.05 |                  
 product-dashboard              |       0 |        0 |       0 |       0 |                  
  eslint.config.js              |       0 |        0 |       0 |       0 | 1-23             
  postcss.config.js             |       0 |        0 |       0 |       0 | 1-6              
  tailwind.config.js            |       0 |        0 |       0 |       0 | 1-11             
  vitest.config.ts              |       0 |        0 |       0 |       0 | 1-15             
 product-dashboard/src          |   55.55 |    33.33 |   33.33 |   55.55 |                  
  App.tsx                       |     100 |      100 |     100 |     100 |                  
  main.tsx                      |       0 |        0 |       0 |       0 | 1-14             
  routes.tsx                    |       0 |        0 |       0 |       0 | 1-21             
 product-dashboard/src/hooks    |     100 |      100 |     100 |     100 |                  
  useAppDispatch.ts             |     100 |      100 |     100 |     100 |                  
  useAppSelector.ts             |     100 |      100 |     100 |     100 |                  
 product-dashboard/src/screens  |   96.23 |     82.5 |    87.5 |   96.23 |                  
  FavoritesPage.tsx             |     100 |      100 |     100 |     100 |                  
  ProductDetailPage.tsx         |   95.45 |       75 |     100 |   95.45 | 18-19            
  ProductsPage.tsx              |   94.84 |    80.95 |      75 |   94.84 | 26-28,30-31      
 product-dashboard/src/services |   14.28 |      100 |       0 |   14.28 |                  
  api.ts                        |   14.28 |      100 |       0 |   14.28 | 6-19             
 product-dashboard/src/store    |   86.36 |    94.73 |      90 |   86.36 |                  
  favoritesSlice.ts             |     100 |      100 |     100 |     100 |                  
  filtersSlice.ts               |     100 |      100 |     100 |     100 |                  
  index.ts                      |       0 |        0 |       0 |       0 | 1-12             
  productsSlice.ts              |   90.47 |      100 |     100 |   90.47 | 25-26,45-46      
 product-dashboard/src/screens  |   96.23 |     82.5 |    87.5 |   96.23 |                  
  FavoritesPage.tsx             |     100 |      100 |     100 |     100 |                  
  ProductDetailPage.tsx         |   95.45 |       75 |     100 |   95.45 | 18-19            
  ProductsPage.tsx              |   94.84 |    80.95 |      75 |   94.84 | 26-28,30-31      
 product-dashboard/src/services |   14.28 |      100 |       0 |   14.28 |                  
  api.ts                        |   14.28 |      100 |       0 |   14.28 | 6-19             
 product-dashboard/src/store    |   86.36 |    94.73 |      90 |   86.36 |                  
  favoritesSlice.ts             |     100 |      100 |     100 |     100 |                  
  filtersSlice.ts               |     100 |      100 |     100 |     100 |                  
  index.ts                      |       0 |        0 |       0 |       0 | 1-12             
  productsSlice.ts              |   90.47 |      100 |     100 |   90.47 | 25-26,45-46      
 product-dashboard/src/types    |       0 |        0 |       0 |       0 |                  
  product.ts                    |       0 |        0 |       0 |       0 |                  
--------------------------------|---------|----------|---------|---------|-------------------
```
