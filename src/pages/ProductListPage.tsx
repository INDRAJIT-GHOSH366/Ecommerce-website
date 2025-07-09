import React from 'react';
import { Sidebar } from '@/components/products/Sidebar';
import { ProductGrid } from '@/components/products/ProductGrid';
import { SortingHeader } from '@/components/products/SortingHeader';
import { useShop } from '@/context/ShopContext';
import { useState } from 'react';

const ProductListPage = () => {
  const { addProduct } = useShop();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: '',
    inStock: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProduct({
      id: Date.now().toString(),
      name: form.name,
      description: form.description,
      price: Number(form.price),
      image: form.image,
      category: form.category,
      rating: 0,
      reviews: 0,
      inStock: form.inStock,
    });
    setShowForm(false);
    setForm({ name: '', description: '', price: '', image: '', category: '', inStock: true });
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <Sidebar />
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-6">
              <button
                className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/80"
                onClick={() => setShowForm((v) => !v)}
              >
                {showForm ? 'Cancel' : 'Add Product'}
              </button>
            </div>
            {showForm && (
              <form onSubmit={handleSubmit} className="mb-8 p-4 border rounded bg-muted space-y-4">
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Product Name"
                  className="w-full p-2 border rounded"
                  required
                />
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Description"
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="Price"
                  type="number"
                  min="0"
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  placeholder="Image URL"
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  placeholder="Category"
                  className="w-full p-2 border rounded"
                  required
                />
                <button type="submit" className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/80">
                  Add Product
                </button>
              </form>
            )}
            <SortingHeader />
            <ProductGrid />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;