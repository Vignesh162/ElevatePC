import { useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

// --- Dummy Data for Simulation ---

const initialProducts = [
    { id: 1, name: 'RTX 4090', category: 'GPU', price: 1599.99, stock: 15 },
    { id: 2, name: 'Ryzen 7 7700X', category: 'CPU', price: 349.50, stock: 30 },
    { id: 3, name: 'Corsair Vengeance 32GB', category: 'RAM', price: 129.99, stock: 50 },
    { id: 4, name: 'Samsung 980 Pro 2TB', category: 'Storage', price: 149.99, stock: 22 },
];

const salesData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
        {
            label: 'Monthly Revenue ($)',
            data: [12000, 19000, 30000, 50000, 23000, 45000],
            backgroundColor: 'rgba(59, 130, 246, 0.6)', // blue-500
            borderColor: 'rgb(59, 130, 246)',
            borderWidth: 1,
        },
    ],
};

const categorySalesData = {
    labels: ['CPU', 'GPU', 'RAM', 'Storage', 'PSU', 'Cooler'],
    datasets: [
        {
            label: 'Units Sold by Category',
            data: [150, 90, 210, 180, 110, 140],
            backgroundColor: [
                '#3b82f6', // blue-500
                '#ef4444', // red-500
                '#f59e0b', // amber-500
                '#10b981', // emerald-500
                '#8b5cf6', // violet-500
                '#06b6d4', // cyan-500
            ],
            hoverOffset: 4,
        },
    ],
};

const recentOrders = [
    { id: 'ORD-1001', customer: 'John Doe', total: 2150.99, status: 'Shipped', date: '2025-10-01' },
    { id: 'ORD-1002', customer: 'Jane Smith', total: 875.50, status: 'Processing', date: '2025-10-02' },
    { id: 'ORD-1003', customer: 'Vignesh Pai', total: 3500.00, status: 'Delivered', date: '2025-10-03' },
];

// --- Status Styling Helper ---
const getStatusClasses = (status) => {
    switch (status) {
        case 'Delivered': return 'bg-green-100 text-green-800';
        case 'Shipped': return 'bg-blue-100 text-blue-800';
        case 'Processing': return 'bg-yellow-100 text-yellow-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};

// --- Main Component ---
export default function AdminPage() {
    const [products, setProducts] = useState(initialProducts);
    const [isAdding, setIsAdding] = useState(false);
    const [newProduct, setNewProduct] = useState({ name: '', category: 'CPU', price: 0, stock: 0 });

    // 2. Add Product Feature
    const handleAddProduct = (e) => {
        e.preventDefault();
        const product = {
            ...newProduct,
            id: products.length + 1,
            price: parseFloat(newProduct.price),
            stock: parseInt(newProduct.stock),
        };
        setProducts([...products, product]);
        setNewProduct({ name: '', category: 'CPU', price: 0, stock: 0 });
        setIsAdding(false);
    };

    // 3. Manage Product Feature (Simple Delete)
    const handleDeleteProduct = (id) => {
        setProducts(products.filter(p => p.id !== id));
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6 md:p-10">
            <h1 className="text-5xl font-bold mb-10 text-center text-blue-400">Admin Dashboard</h1>

            {/* 1. Charts of Products Sold */}
            <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-6 border-b border-gray-700 pb-2">Sales Analytics</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
                        <h3 className="text-xl font-medium mb-4 text-amber-500">Monthly Revenue</h3>
                        <div className="h-80">
                            <Bar options={{ responsive: true, maintainAspectRatio: false }} data={salesData} />
                        </div>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center">
                        <h3 className="text-xl font-medium mb-4 text-amber-500">Sales by Category (Units)</h3>
                        <div className="h-80 w-80">
                            <Doughnut options={{ responsive: true, maintainAspectRatio: false }} data={categorySalesData} />
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. & 3. Add and Manage Product Features */}
            <section className="mb-12">
                <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-2">
                    <h2 className="text-3xl font-semibold">Product Management ({products.length})</h2>
                    <button
                        onClick={() => setIsAdding(!isAdding)}
                        className="px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                    >
                        {isAdding ? 'Cancel Add' : '+ Add New Product'}
                    </button>
                </div>

                {/* Add Product Form */}
                {isAdding && (
                    <form onSubmit={handleAddProduct} className="bg-gray-800 p-6 rounded-xl shadow-lg mb-8 grid grid-cols-1 md:grid-cols-5 gap-4">
                        <input
                            type="text"
                            placeholder="Product Name"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                            className="p-3 rounded bg-gray-700 border border-gray-600 text-white col-span-1 md:col-span-2"
                            required
                        />
                        <select
                            value={newProduct.category}
                            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                            className="p-3 rounded bg-gray-700 border border-gray-600 text-white"
                        >
                            <option value="CPU">CPU</option>
                            <option value="GPU">GPU</option>
                            <option value="RAM">RAM</option>
                            <option value="Storage">Storage</option>
                            <option value="PSU">PSU</option>
                        </select>
                        <input
                            type="number"
                            placeholder="Price"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                            className="p-3 rounded bg-gray-700 border border-gray-600 text-white"
                            min="0.01"
                            step="0.01"
                            required
                        />
                        <input
                            type="number"
                            placeholder="Stock"
                            value={newProduct.stock}
                            onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                            className="p-3 rounded bg-gray-700 border border-gray-600 text-white"
                            min="0"
                            required
                        />
                        <button type="submit" className="p-3 bg-emerald-600 rounded-lg hover:bg-emerald-700 font-semibold md:col-span-1">
                            Save Product
                        </button>
                    </form>
                )}

                {/* Manage Product Table */}
                <div className="overflow-x-auto bg-gray-800 rounded-xl shadow-lg">
                    <table className="min-w-full divide-y divide-gray-700">
                        <thead className="bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Category</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Price</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Stock</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {products.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-700 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{product.category}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">${product.price.toFixed(2)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{product.stock}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button
                                            onClick={() => handleDeleteProduct(product.id)}
                                            className="text-red-500 hover:text-red-700 text-sm font-medium"
                                        >
                                            Delete
                                        </button>
                                        {/* Edit functionality would be added here */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* 4. View Orders Feature */}
            <section>
                <h2 className="text-3xl font-semibold mb-6 border-b border-gray-700 pb-2">Recent Orders</h2>
                <div className="overflow-x-auto bg-gray-800 rounded-xl shadow-lg">
                    <table className="min-w-full divide-y divide-gray-700">
                        <thead className="bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Order ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Customer</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Total</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {recentOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-700 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap font-medium text-blue-400">{order.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{order.customer}</td>
                                    <td className="px-6 py-4 whitespace-nowrap font-bold">${order.total.toFixed(2)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{order.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}