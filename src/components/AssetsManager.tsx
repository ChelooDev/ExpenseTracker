import React, { useState } from 'react';
import { useExpense } from '../context/ExpenseContext';
import { type Asset, type AssetCategory } from '../context/ExpenseContext';
import { formatCurrency } from '../utils/formatting';

export default function AssetsManager() {
    const { state, dispatch } = useExpense();
    const [showAssetForm, setShowAssetForm] = useState(false);
    const [showCategoryForm, setShowCategoryForm] = useState(false);
    const [editingAsset, setEditingAsset] = useState<Asset | null>(null);
    const [editingCategory, setEditingCategory] = useState<AssetCategory | null>(null);
    const [assetFormData, setAssetFormData] = useState({
        name: '',
        category: '',
        value: '',
        purchaseDate: new Date().toISOString().split('T')[0],
        description: '',
    });

    const formatNumberInput = (value: string) => {
        // If empty, return empty
        if (!value) return '';

        // Remove all non-digit characters
        let cleanValue = value.replace(/[^\d]/g, '');

        // If empty after cleaning, return empty
        if (!cleanValue) return '';

        // Format with automatic decimal points after every 3 digits from the right
        let formattedValue = '';
        for (let i = cleanValue.length - 1; i >= 0; i--) {
            formattedValue = cleanValue[i] + formattedValue;
            // Add dot every 3 digits from the right
            if ((cleanValue.length - i) % 3 === 0 && i > 0) {
                formattedValue = '.' + formattedValue;
            }
        }

        return formattedValue;
    };

    const parseNumberInput = (formattedValue: string) => {
        // Remove dots (thousand separators) and convert to number
        const cleanValue = formattedValue.replace(/\./g, '');
        return cleanValue ? parseFloat(cleanValue) : 0;
    };
    const [categoryFormData, setCategoryFormData] = useState({
        name: '',
        color: '#3b82f6',
    });

    const colors = [
        '#ef4444', '#3b82f6', '#8b5cf6', '#f59e0b', '#10b981',
        '#ec4899', '#22c55e', '#06b6d4', '#84cc16', '#f97316',
        '#6366f1', '#14b8a6', '#eab308', '#ef4444', '#8b5cf6'
    ];

    const handleAssetSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!assetFormData.name || !assetFormData.category || !assetFormData.value) {
            alert('Please fill in all required fields');
            return;
        }

        const assetData: Asset = {
            id: editingAsset?.id || Date.now().toString(),
            name: assetFormData.name.trim(),
            category: assetFormData.category,
            value: parseNumberInput(assetFormData.value),
            purchaseDate: assetFormData.purchaseDate,
            description: assetFormData.description.trim(),
        };

        if (editingAsset) {
            dispatch({ type: 'UPDATE_ASSET', payload: assetData });
        } else {
            dispatch({ type: 'ADD_ASSET', payload: assetData });
        }

        setShowAssetForm(false);
        setEditingAsset(null);
        setAssetFormData({
            name: '',
            category: '',
            value: '',
            purchaseDate: new Date().toISOString().split('T')[0],
            description: '',
        });
    };

    const handleCategorySubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!categoryFormData.name.trim()) {
            alert('Please enter a category name');
            return;
        }

        const categoryData: AssetCategory = {
            id: editingCategory?.id || Date.now().toString(),
            name: categoryFormData.name.trim(),
            color: categoryFormData.color,
        };

        if (editingCategory) {
            dispatch({ type: 'UPDATE_ASSET_CATEGORY', payload: categoryData });
        } else {
            dispatch({ type: 'ADD_ASSET_CATEGORY', payload: categoryData });
        }

        setShowCategoryForm(false);
        setEditingCategory(null);
        setCategoryFormData({ name: '', color: '#3b82f6' });
    };

    const handleEditAsset = (asset: Asset) => {
        setEditingAsset(asset);
        setAssetFormData({
            name: asset.name,
            category: asset.category,
            value: formatNumberInput(asset.value.toString()),
            purchaseDate: asset.purchaseDate,
            description: asset.description,
        });
        setShowAssetForm(true);
    };

    const handleEditCategory = (category: AssetCategory) => {
        setEditingCategory(category);
        setCategoryFormData({
            name: category.name,
            color: category.color,
        });
        setShowCategoryForm(true);
    };

    const handleDeleteAsset = (id: string) => {
        if (window.confirm('Are you sure you want to delete this asset?')) {
            dispatch({ type: 'DELETE_ASSET', payload: id });
        }
    };

    const handleDeleteCategory = (id: string) => {
        if (window.confirm('Are you sure you want to delete this category? This will not delete associated assets.')) {
            dispatch({ type: 'DELETE_ASSET_CATEGORY', payload: id });
        }
    };

    const getCategoryName = (categoryId: string) => {
        const category = state.assetCategories.find(c => c.id === categoryId);
        return category?.name || 'Unknown';
    };

    const getCategoryColor = (categoryId: string) => {
        const category = state.assetCategories.find(c => c.id === categoryId);
        return category?.color || '#6b7280';
    };

    const totalAssetsValue = state.assets.reduce((sum, asset) => sum + asset.value, 0);

    const assetsByCategory = state.assetCategories.map(category => {
        const categoryAssets = state.assets.filter(asset => asset.category === category.id);
        const categoryValue = categoryAssets.reduce((sum, asset) => sum + asset.value, 0);
        return {
            category,
            assets: categoryAssets,
            value: categoryValue,
        };
    }).filter(item => item.assets.length > 0);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Assets</h2>
                <div className="flex space-x-2">
                    <button
                        onClick={() => setShowCategoryForm(true)}
                        className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
                    >
                        Manage Categories
                    </button>
                    <button
                        onClick={() => setShowAssetForm(true)}
                        disabled={state.assetCategories.length === 0}
                        className={`px-4 py-2 rounded-md transition-colors ${state.assetCategories.length === 0
                            ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                            }`}
                        title={state.assetCategories.length === 0 ? 'Please add a category first' : 'Add Asset'}
                    >
                        Add Asset
                    </button>
                </div>
            </div>

            {/* Total Net Worth */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Total Assets Value</h3>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {formatCurrency(totalAssetsValue)}
                </p>
            </div>

            {/* Asset Form Modal */}
            {showAssetForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                            {editingAsset ? 'Edit Asset' : 'Add Asset'}
                        </h3>

                        <form onSubmit={handleAssetSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Asset Name *
                                </label>
                                <input
                                    type="text"
                                    value={assetFormData.name}
                                    onChange={(e) => setAssetFormData({ ...assetFormData, name: e.target.value })}
                                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Category *
                                </label>
                                {state.assetCategories.length === 0 ? (
                                    <div className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
                                        No categories available. Please add a category first.
                                    </div>
                                ) : (
                                    <select
                                        value={assetFormData.category}
                                        onChange={(e) => setAssetFormData({ ...assetFormData, category: e.target.value })}
                                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                        required
                                    >
                                        <option value="">Select a category</option>
                                        {state.assetCategories.map(category => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Value (GS) *
                                </label>
                                <input
                                    type="text"
                                    value={assetFormData.value}
                                    onChange={(e) => {
                                        const formatted = formatNumberInput(e.target.value);
                                        setAssetFormData({ ...assetFormData, value: formatted });
                                    }}
                                    placeholder="100.000"
                                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Purchase Date *
                                </label>
                                <input
                                    type="date"
                                    value={assetFormData.purchaseDate}
                                    onChange={(e) => setAssetFormData({ ...assetFormData, purchaseDate: e.target.value })}
                                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    required
                                />
                            </div>


                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Description
                                </label>
                                <textarea
                                    value={assetFormData.description}
                                    onChange={(e) => setAssetFormData({ ...assetFormData, description: e.target.value })}
                                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    rows={3}
                                />
                            </div>

                            <div className="flex space-x-3 pt-4">
                                <button
                                    type="submit"
                                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                                >
                                    {editingAsset ? 'Update' : 'Add'} Asset
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowAssetForm(false);
                                        setEditingAsset(null);
                                        setAssetFormData({
                                            name: '',
                                            category: '',
                                            value: '',
                                            purchaseDate: new Date().toISOString().split('T')[0],
                                            description: '',
                                        });
                                    }}
                                    className="flex-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-md hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Category Form Modal */}
            {showCategoryForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                            {editingCategory ? 'Edit Category' : 'Add Category'}
                        </h3>

                        <form onSubmit={handleCategorySubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Category Name
                                </label>
                                <input
                                    type="text"
                                    value={categoryFormData.name}
                                    onChange={(e) => setCategoryFormData({ ...categoryFormData, name: e.target.value })}
                                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Color
                                </label>
                                <div className="grid grid-cols-5 gap-2">
                                    {colors.map(color => (
                                        <button
                                            key={color}
                                            type="button"
                                            onClick={() => setCategoryFormData({ ...categoryFormData, color })}
                                            className={`w-8 h-8 rounded-full border-2 ${categoryFormData.color === color ? 'border-gray-900 dark:border-white' : 'border-gray-300'
                                                }`}
                                            style={{ backgroundColor: color }}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="flex space-x-3 pt-4">
                                <button
                                    type="submit"
                                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                                >
                                    {editingCategory ? 'Update' : 'Add'} Category
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowCategoryForm(false);
                                        setEditingCategory(null);
                                        setCategoryFormData({ name: '', color: '#3b82f6' });
                                    }}
                                    className="flex-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-md hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Assets by Category */}
            {assetsByCategory.length === 0 ? (
                <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow text-center">
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                        {state.assetCategories.length === 0
                            ? 'No asset categories available. Please add a category first.'
                            : 'No assets added yet'
                        }
                    </p>
                    {state.assetCategories.length === 0 ? (
                        <button
                            onClick={() => setShowCategoryForm(true)}
                            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
                        >
                            Add Your First Category
                        </button>
                    ) : (
                        <button
                            onClick={() => setShowAssetForm(true)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                        >
                            Add Your First Asset
                        </button>
                    )}
                </div>
            ) : (
                <div className="space-y-6">
                    {assetsByCategory.map(({ category, assets, value }) => (
                        <div key={category.id} className="bg-white dark:bg-gray-800 rounded-lg shadow">
                            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div
                                            className="w-4 h-4 rounded-full"
                                            style={{ backgroundColor: category.color }}
                                        />
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                            {category.name}
                                        </h3>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                                            ({assets.length} assets)
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                            {formatCurrency(value)}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4">
                                <div className="space-y-3">
                                    {assets.map(asset => (
                                        <div key={asset.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-900 dark:text-white">{asset.name}</p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    Purchased {new Date(asset.purchaseDate).toLocaleDateString('en-GB')}
                                                </p>
                                                {asset.description && (
                                                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                                        {asset.description}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="flex items-center space-x-2">
                                                <span className="font-semibold text-gray-900 dark:text-white">
                                                    {formatCurrency(asset.value)}
                                                </span>

                                                <div className="flex space-x-1">
                                                    <button
                                                        onClick={() => handleEditAsset(asset)}
                                                        className="p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                                                        title="Edit"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                        </svg>
                                                    </button>

                                                    <button
                                                        onClick={() => handleDeleteAsset(asset.id)}
                                                        className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                                                        title="Delete"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
