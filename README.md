
# ElevatePC (Custom PC Builder Web App)

A React-based web application for building custom PCs by selecting components like CPUs, GPUs, RAM, Storage, and more. Users can view detailed product information and add components to their build.

---

## Features

- Browse products by category: CPU, GPU, RAM, Storage, PSU, Cooler, Case, Monitor, Motherboard, Gaming Peripherals.
- Detailed product pages with:
  - Name, Price, Brand, Category
  - Ratings and Reviews
  - High-quality product images
- Add components to your current build
- Simple navigation between builds and product pages
- Context-based state management for builds and cart

---

## Tech Stack

- **Frontend:** React, React Router
- **State Management:** React Context API
- **Styling:** Tailwind CSS
- **Version Control:** Git

---

## Installation

1. Clone the repository:

git clone https://github.com/your-username/pc-builder.git
cd pc-builder
````

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Start the development server:

```bash
npm start
# or
yarn start
# or
pnpm start
```

The app should now be running at `http://localhost:3000`.

---

## Project Structure

```
src/
 ├─ components/      # Product data and reusable components
 ├─ contexts/        # React Context for builds/cart
 ├─ pages/           # Page components (AllProducts, ProductDescription, PCBuilderPage)
 ├─ App.jsx          # Main app component
 └─ index.js         # Entry point
```

---

## Usage

1. Navigate to `AllProductsPage` to browse products.
2. Click **View** on a product card to see detailed information.
3. Click **Add to Build** to include the product in your PC build.
4. Go to `PCBuilderPage` to see your selected components.

---

## Environment Variables

Add any API keys or environment-specific variables in a `.env` file:

```
.env
```

---

## Contributing

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/my-feature`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/my-feature`.
5. Open a pull request.

---

## License

This project is licensed under the MIT License.

---



