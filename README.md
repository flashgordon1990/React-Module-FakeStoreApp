🛒 FakeStore React App
A simple React application built with Vite that interacts with the FakeStoreAPI.
This project demonstrates routing, API calls, CRUD operations, and component organization in a clean React setup.

🚀 Features
🏠 Home Page — simple intro and navigation

📦 Product Listing — fetches and displays all products

🔍 Product Details — view full info for a single product

➕ Add Product — submit a new product (FakeStoreAPI simulates success)

✏️ Edit Product — update an existing product (changes appear but don’t persist)

📦 Getting Started
1. Install dependencies
bash
npm install
2. Start the development server
bash
npm run dev
3. Open the app
Visit the URL shown in your terminal (usually something like):

Code
http://localhost:5173
📁 Project Structure
Code
src/
  App.jsx            # Main app + routes
  components/        # Shared UI components (e.g., NavigationBar)
  pages/             # All page views (Home, ProductList, etc.)
  index.css          # Global styles
🧰 Tech Stack
React (functional components + hooks)

React Router (routing + params)

Axios (API requests)

React Bootstrap (UI components)

Vite (fast dev environment)

📝 Notes
FakeStoreAPI simulates POST/PUT/DELETE requests, but changes do not persist after refresh.
This is expected behavior for the API and perfect for practice projects.

