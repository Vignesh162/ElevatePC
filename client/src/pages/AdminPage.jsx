import { useState, useEffect } from 'react';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement } from 'chart.js';
import axios from 'axios';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement);

// Backend API base URL
const API_BASE_URL = 'http://localhost:4000/api';

// --- Dummy Data for Charts (Keep as is) ---
const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    datasets: [
        {
            label: 'Monthly Revenue ($)',
            data: [12000, 19000, 30000, 50000, 23000, 45000, 38000, 52000, 41000, 48000],
            backgroundColor: 'rgba(59, 130, 246, 0.6)',
            borderColor: 'rgb(59, 130, 246)',
            borderWidth: 2,
        },
    ],
};

const categorySalesData = {
    labels: ['CPU', 'GPU', 'RAM', 'Storage', 'PSU', 'Cooler'],
    datasets: [
        {
            label: 'Units Sold',
            data: [150, 90, 210, 180, 110, 140],
            backgroundColor: [
                '#3b82f6', '#ef4444', '#f59e0b', 
                '#10b981', '#8b5cf6', '#06b6d4',
            ],
            borderWidth: 2,
            hoverOffset: 8,
        },
    ],
};

const performanceData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    datasets: [
        {
            label: 'Revenue Trend',
            data: [12000, 19000, 30000, 50000, 23000, 45000, 38000, 52000, 41000, 48000],
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            tension: 0.4,
            fill: true,
        },
    ],
};

const recentOrders = [
    { id: 'ORD-1001', customer: 'John Doe', total: 2150.99, status: 'Shipped', date: '2025-10-01' },
    { id: 'ORD-1002', customer: 'Jane Smith', total: 875.50, status: 'Processing', date: '2025-10-02' },
    { id: 'ORD-1003', customer: 'Vignesh Pai', total: 3500.00, status: 'Delivered', date: '2025-10-03' },
    { id: 'ORD-1004', customer: 'Mike Johnson', total: 1899.99, status: 'Pending', date: '2025-10-04' },
];

// --- Status Styling Helper ---
const getStatusClasses = (status) => {
    switch (status) {
        case 'Delivered': return 'bg-green-100 text-green-800';
        case 'Shipped': return 'bg-blue-100 text-blue-800';
        case 'Processing': return 'bg-yellow-100 text-yellow-800';
        case 'Pending': return 'bg-orange-100 text-orange-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};

// --- Main Component ---
export default function AdminPage() {
    const [products, setProducts] = useState([]);
    const [isAdding, setIsAdding] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [newProduct, setNewProduct] = useState({ 
        name: '', 
        category: 'CPU', 
        price: 0, 
        stock: 0,
        brand: '',
        images: [''],
        ratings: 0,
        details: {
            cores: '',
            threads: '',
            speed: '',
            memory: '',
            storage: '',
            wattage: ''
        }
    });

    const [stats, setStats] = useState({
        totalRevenue: 0,
        totalOrders: 0,
        lowStockItems: 0,
        totalProducts: 0
    });

    // Fetch products from backend
    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_BASE_URL}/products`);
            setProducts(response.data.products || response.data);
            setError('');
        } catch (err) {
            console.error('Error fetching products:', err);
            setError('Failed to fetch products');
            // Fallback to empty array if API fails
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    // Fetch products on component mount
    useEffect(() => {
        fetchProducts();
    }, []);

    // Calculate statistics based on fetched products
    useEffect(() => {
        const totalRevenue = recentOrders.reduce((sum, order) => sum + order.total, 0);
        const totalOrders = recentOrders.length;
        const lowStockItems = products.filter(p => p.stock < 10).length;
        const totalProducts = products.length;

        setStats({ totalRevenue, totalOrders, lowStockItems, totalProducts });
    }, [products]);

    // Add Product to Backend
    const handleAddProduct = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const productData = {
                name: newProduct.name,
                price: parseFloat(newProduct.price),
                category: newProduct.category,
                brand: newProduct.brand,
                images: newProduct.images.filter(img => img.trim() !== ''),
                ratings: parseFloat(newProduct.ratings) || 0,
                stock: parseInt(newProduct.stock),
                details: Object.fromEntries(
                    Object.entries(newProduct.details).filter(([_, value]) => value !== '')
                )
            };

            const response = await axios.post(`${API_BASE_URL}/products/add`, productData);
            
            // Add the new product to local state
            setProducts([...products, response.data]);
            
            // Reset form
            setNewProduct({ 
                name: '', 
                category: 'CPU', 
                price: 0, 
                stock: 0,
                brand: '',
                images: [''],
                ratings: 0,
                details: {
                    cores: '',
                    threads: '',
                    speed: '',
                    memory: '',
                    storage: '',
                    wattage: ''
                }
            });
            setIsAdding(false);
            setError('');
        } catch (err) {
            console.error('Error adding product:', err);
            setError(err.response?.data?.message || 'Failed to add product');
        } finally {
            setLoading(false);
        }
    };

    // Update Product in Backend
    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const updateData = {
                name: newProduct.name,
                price: parseFloat(newProduct.price),
                category: newProduct.category,
                brand: newProduct.brand,
                stock: parseInt(newProduct.stock),
                ratings: parseFloat(newProduct.ratings) || 0,
                details: Object.fromEntries(
                    Object.entries(newProduct.details).filter(([_, value]) => value !== '')
                )
            };

            const response = await axios.put(
                `${API_BASE_URL}/products/update/${editingProduct.id}`,
                updateData
            );

            // Update product in local state
            setProducts(products.map(p => 
                p.id === editingProduct.id ? response.data : p
            ));

            // Reset states
            setEditingProduct(null);
            setNewProduct({ 
                name: '', 
                category: 'CPU', 
                price: 0, 
                stock: 0,
                brand: '',
                images: [''],
                ratings: 0,
                details: {
                    cores: '',
                    threads: '',
                    speed: '',
                    memory: '',
                    storage: '',
                    wattage: ''
                }
            });
            setIsAdding(false);
            setError('');
        } catch (err) {
            console.error('Error updating product:', err);
            setError(err.response?.data?.message || 'Failed to update product');
        } finally {
            setLoading(false);
        }
    };

    // Delete Product from Backend
    const handleDeleteProduct = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) {
            return;
        }

        setLoading(true);
        setError('');

        try {
            await axios.delete(`${API_BASE_URL}/products/delete/${id}`);
            
            // Remove product from local state
            setProducts(products.filter(p => p.id !== id));
            setError('');
        } catch (err) {
            console.error('Error deleting product:', err);
            setError(err.response?.data?.message || 'Failed to delete product');
        } finally {
            setLoading(false);
        }
    };

    // Edit Product - populate form with existing data
    const handleEditProduct = (product) => {
        setEditingProduct(product);
        setNewProduct({
            name: product.name || '',
            category: product.category || 'CPU',
            price: product.price || 0,
            stock: product.stock || 0,
            brand: product.brand || '',
            images: product.images || [''],
            ratings: product.ratings || 0,
            details: {
                cores: product.details?.cores || '',
                threads: product.details?.threads || '',
                speed: product.details?.speed || '',
                memory: product.details?.memory || '',
                storage: product.details?.storage || '',
                wattage: product.details?.wattage || ''
            }
        });
        setIsAdding(true);
    };

    // Add image URL input
    const handleAddImageUrl = () => {
        setNewProduct({
            ...newProduct,
            images: [...newProduct.images, '']
        });
    };

    // Update image URL
    const handleImageUrlChange = (index, value) => {
        const updatedImages = [...newProduct.images];
        updatedImages[index] = value;
        setNewProduct({
            ...newProduct,
            images: updatedImages
        });
    };

    // Remove image URL
    const handleRemoveImageUrl = (index) => {
        const updatedImages = newProduct.images.filter((_, i) => i !== index);
        setNewProduct({
            ...newProduct,
            images: updatedImages.length > 0 ? updatedImages : ['']
        });
    };

    // Update details field
    const handleDetailChange = (field, value) => {
        setNewProduct({
            ...newProduct,
            details: {
                ...newProduct.details,
                [field]: value
            }
        });
    };

    // Chart options (same as before)
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: '#9CA3AF',
                    font: {
                        size: 12
                    }
                }
            }
        },
        scales: {
            y: {
                ticks: { color: '#9CA3AF' },
                grid: { color: '#374151' }
            },
            x: {
                ticks: { color: '#9CA3AF' },
                grid: { color: '#374151' }
            }
        }
    };

    const doughnutOptions = {
        ...chartOptions,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: '#9CA3AF',
                    font: {
                        size: 11
                    },
                    padding: 20
                }
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-4 md:p-6 lg:p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-blue-400 mb-4">
                    Admin Dashboard
                </h1>
                <p className="text-gray-400 text-center">Manage your store efficiently</p>
            </div>

            {/* Error Display */}
            {error && (
                <div className="bg-red-900 border border-red-700 text-red-200 p-4 rounded-lg mb-6">
                    <div className="flex justify-between items-center">
                        <span>{error}</span>
                        <button 
                            onClick={() => setError('')}
                            className="text-red-400 hover:text-red-200"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}

            {/* Statistics Cards */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-gray-800 p-6 rounded-xl shadow-lg border-l-4 border-blue-500">
                    <h3 className="text-gray-400 text-sm font-medium mb-2">Total Revenue</h3>
                    <p className="text-2xl font-bold text-white">${stats.totalRevenue.toLocaleString()}</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl shadow-lg border-l-4 border-green-500">
                    <h3 className="text-gray-400 text-sm font-medium mb-2">Total Orders</h3>
                    <p className="text-2xl font-bold text-white">{stats.totalOrders}</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl shadow-lg border-l-4 border-yellow-500">
                    <h3 className="text-gray-400 text-sm font-medium mb-2">Low Stock Items</h3>
                    <p className="text-2xl font-bold text-white">{stats.lowStockItems}</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl shadow-lg border-l-4 border-purple-500">
                    <h3 className="text-gray-400 text-sm font-medium mb-2">Total Products</h3>
                    <p className="text-2xl font-bold text-white">{stats.totalProducts}</p>
                </div>
            </section>

            {/* Charts Section - Keep Dummy Data */}
            <section className="mb-12">
                <h2 className="text-2xl md:text-3xl font-semibold mb-6 border-b border-gray-700 pb-2">
                    Sales Analytics
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
                        <h3 className="text-xl font-medium mb-4 text-blue-400">Revenue Overview</h3>
                        <div className="h-80">
                            <Bar data={salesData} options={chartOptions} />
                        </div>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
                        <h3 className="text-xl font-medium mb-4 text-green-400">Performance Trend</h3>
                        <div className="h-80">
                            <Line data={performanceData} options={chartOptions} />
                        </div>
                    </div>
                </div>
                <div className="mt-8 bg-gray-800 p-6 rounded-xl shadow-lg max-w-2xl mx-auto">
                    <h3 className="text-xl font-medium mb-4 text-amber-400">Sales by Category</h3>
                    <div className="h-80">
                        <Doughnut data={categorySalesData} options={doughnutOptions} />
                    </div>
                </div>
            </section>

            {/* Product Management */}
            <section className="mb-12">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b border-gray-700 pb-2 gap-4">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-semibold">Product Management</h2>
                        <p className="text-gray-400 text-sm">{products.length} products in inventory</p>
                    </div>
                    <button
                        onClick={() => {
                            setIsAdding(!isAdding);
                            setEditingProduct(null);
                            setNewProduct({ 
                                name: '', 
                                category: 'CPU', 
                                price: 0, 
                                stock: 0,
                                brand: '',
                                images: [''],
                                ratings: 0,
                                details: {
                                    cores: '',
                                    threads: '',
                                    speed: '',
                                    memory: '',
                                    storage: '',
                                    wattage: ''
                                }
                            });
                        }}
                        disabled={loading}
                        className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors font-semibold whitespace-nowrap disabled:bg-gray-600 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Loading...' : (isAdding ? 'Cancel' : '+ Add New Product')}
                    </button>
                </div>

                {/* Add/Edit Product Form */}
                {(isAdding || editingProduct) && (
                    <form 
                        onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct} 
                        className="bg-gray-800 p-6 rounded-xl shadow-lg mb-8 space-y-6"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <input
                                type="text"
                                placeholder="Product Name"
                                value={newProduct.name}
                                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                className="p-3 rounded bg-gray-700 border border-gray-600 text-white focus:border-blue-500 focus:outline-none"
                                required
                                disabled={loading}
                            />
                            <select
                                value={newProduct.category}
                                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                                className="p-3 rounded bg-gray-700 border border-gray-600 text-white focus:border-blue-500 focus:outline-none"
                                disabled={loading}
                            >
                                <option value="CPU">CPU</option>
                                <option value="GPU">GPU</option>
                                <option value="RAM">RAM</option>
                                <option value="Storage">Storage</option>
                                <option value="PSU">PSU</option>
                                <option value="Cooler">Cooler</option>
                                <option value="Case">Case</option>
                                <option value="Monitor">Monitor</option>
                            </select>
                            <input
                                type="text"
                                placeholder="Brand"
                                value={newProduct.brand}
                                onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
                                className="p-3 rounded bg-gray-700 border border-gray-600 text-white focus:border-blue-500 focus:outline-none"
                                disabled={loading}
                            />
                            <input
                                type="number"
                                placeholder="Price"
                                value={newProduct.price}
                                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                                className="p-3 rounded bg-gray-700 border border-gray-600 text-white focus:border-blue-500 focus:outline-none"
                                min="0.01"
                                step="0.01"
                                required
                                disabled={loading}
                            />
                            <input
                                type="number"
                                placeholder="Stock"
                                value={newProduct.stock}
                                onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                                className="p-3 rounded bg-gray-700 border border-gray-600 text-white focus:border-blue-500 focus:outline-none"
                                min="0"
                                required
                                disabled={loading}
                            />
                            <input
                                type="number"
                                placeholder="Ratings (0-5)"
                                value={newProduct.ratings}
                                onChange={(e) => setNewProduct({ ...newProduct, ratings: e.target.value })}
                                className="p-3 rounded bg-gray-700 border border-gray-600 text-white focus:border-blue-500 focus:outline-none"
                                min="0"
                                max="5"
                                step="0.1"
                                disabled={loading}
                            />
                        </div>

                        {/* Image URLs */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Image URLs</label>
                            {newProduct.images.map((url, index) => (
                                <div key={index} className="flex gap-2 mb-2">
                                    <input
                                        type="url"
                                        placeholder="Image URL"
                                        value={url}
                                        onChange={(e) => handleImageUrlChange(index, e.target.value)}
                                        className="flex-1 p-3 rounded bg-gray-700 border border-gray-600 text-white focus:border-blue-500 focus:outline-none"
                                        disabled={loading}
                                    />
                                    {newProduct.images.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveImageUrl(index)}
                                            className="px-3 bg-red-600 rounded hover:bg-red-700 disabled:bg-gray-600"
                                            disabled={loading}
                                        >
                                            ✕
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={handleAddImageUrl}
                                className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 text-sm disabled:bg-gray-600"
                                disabled={loading}
                            >
                                + Add Another Image
                            </button>
                        </div>

                        {/* Product Details */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Product Details</label>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <input
                                    type="text"
                                    placeholder="Cores (for CPU)"
                                    value={newProduct.details.cores}
                                    onChange={(e) => handleDetailChange('cores', e.target.value)}
                                    className="p-3 rounded bg-gray-700 border border-gray-600 text-white focus:border-blue-500 focus:outline-none"
                                    disabled={loading}
                                />
                                <input
                                    type="text"
                                    placeholder="Threads (for CPU)"
                                    value={newProduct.details.threads}
                                    onChange={(e) => handleDetailChange('threads', e.target.value)}
                                    className="p-3 rounded bg-gray-700 border border-gray-600 text-white focus:border-blue-500 focus:outline-none"
                                    disabled={loading}
                                />
                                <input
                                    type="text"
                                    placeholder="Speed/Frequency"
                                    value={newProduct.details.speed}
                                    onChange={(e) => handleDetailChange('speed', e.target.value)}
                                    className="p-3 rounded bg-gray-700 border border-gray-600 text-white focus:border-blue-500 focus:outline-none"
                                    disabled={loading}
                                />
                                <input
                                    type="text"
                                    placeholder="Memory/VRAM"
                                    value={newProduct.details.memory}
                                    onChange={(e) => handleDetailChange('memory', e.target.value)}
                                    className="p-3 rounded bg-gray-700 border border-gray-600 text-white focus:border-blue-500 focus:outline-none"
                                    disabled={loading}
                                />
                                <input
                                    type="text"
                                    placeholder="Storage Capacity"
                                    value={newProduct.details.storage}
                                    onChange={(e) => handleDetailChange('storage', e.target.value)}
                                    className="p-3 rounded bg-gray-700 border border-gray-600 text-white focus:border-blue-500 focus:outline-none"
                                    disabled={loading}
                                />
                                <input
                                    type="text"
                                    placeholder="Wattage (for PSU)"
                                    value={newProduct.details.wattage}
                                    onChange={(e) => handleDetailChange('wattage', e.target.value)}
                                    className="p-3 rounded bg-gray-700 border border-gray-600 text-white focus:border-blue-500 focus:outline-none"
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full p-3 bg-emerald-600 rounded-lg hover:bg-emerald-700 font-semibold transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Processing...' : (editingProduct ? 'Update Product' : 'Save Product')}
                        </button>
                    </form>
                )}

                {/* Products Table */}
                {loading && !isAdding ? (
                    <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                        <p className="text-gray-400 mt-4">Loading products...</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto bg-gray-800 rounded-xl shadow-lg">
                        <table className="min-w-full divide-y divide-gray-700">
                            <thead className="bg-gray-700">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Product</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Category</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Price</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Stock</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Brand</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                                {products.map((product) =>{ 
                                    const price = parseFloat(product.price) || 0;
                                    const stock = parseInt(product.stock) || 0;
                                    return(
                                    
                                    <tr key={product.id} className="hover:bg-gray-750 transition-colors">
                                        <td className="px-4 py-4 whitespace-nowrap font-medium">{product.name}</td>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <span className="px-2 py-1 bg-gray-700 rounded-full text-xs">
                                                {product.category}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap">${price.toFixed(2)}</td>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <span className={product.stock < 10 ? 'text-red-400 font-semibold' : 'text-green-400'}>
                                                {stock}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-blue-400">{product.brand}</td>
                                        <td className="px-4 py-4 whitespace-nowrap space-x-2">
                                            <button
                                                onClick={() => handleEditProduct(product)}
                                                disabled={loading}
                                                className="text-blue-500 hover:text-blue-700 text-sm font-medium px-3 py-1 bg-blue-500/10 rounded hover:bg-blue-500/20 transition-colors disabled:opacity-50"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteProduct(product.id)}
                                                disabled={loading}
                                                className="text-red-500 hover:text-red-700 text-sm font-medium px-3 py-1 bg-red-500/10 rounded hover:bg-red-500/20 transition-colors disabled:opacity-50"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                )})}
                            </tbody>
                        </table>
                        {products.length === 0 && !loading && (
                            <div className="text-center py-8 text-gray-400">
                                No products found. Add your first product!
                            </div>
                        )}
                    </div>
                )}
            </section>

            {/* Recent Orders - Keep Dummy Data */}
            <section>
                <h2 className="text-2xl md:text-3xl font-semibold mb-6 border-b border-gray-700 pb-2">
                    Recent Orders
                </h2>
                <div className="overflow-x-auto bg-gray-800 rounded-xl shadow-lg">
                    <table className="min-w-full divide-y divide-gray-700">
                        <thead className="bg-gray-700">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Order ID</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Customer</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Total</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {recentOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-750 transition-colors">
                                    <td className="px-4 py-4 whitespace-nowrap font-medium text-blue-400">{order.id}</td>
                                    <td className="px-4 py-4 whitespace-nowrap">{order.customer}</td>
                                    <td className="px-4 py-4 whitespace-nowrap font-bold">${order.total.toFixed(2)}</td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-400">{order.date}</td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(order.status)}`}>
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