import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  status: string;
}

const SupabaseTest: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // First try to get all products (including pending)
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .limit(10);

        if (error) {
          setError(error.message);
        } else {
          setProducts(data || []);
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="p-4 bg-blue-50 rounded-lg">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto" />
        <p className="text-center mt-2 text-blue-600">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 rounded-lg">
        <p className="text-red-600">❌ Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-green-50 rounded-lg">
      <h3 className="text-lg font-semibold text-green-800 mb-2">
        ✅ Supabase Connection Working!
      </h3>
      <p className="text-green-700 mb-3">
        Found {products.length} products in your database
      </p>
      
      {products.length > 0 && (
        <div className="space-y-2">
          {products.map((product) => (
            <div key={product.id} className="bg-white p-3 rounded border">
              <h4 className="font-medium">{product.name}</h4>
              <p className="text-sm text-gray-600">${product.price} - {product.category}</p>
              <p className="text-xs text-gray-500">Status: {product.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SupabaseTest;
