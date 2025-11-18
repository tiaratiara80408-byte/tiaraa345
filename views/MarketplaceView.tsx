import React, { useState } from 'react';
import { products } from '../data/mockData';
import type { Product } from '../types';
import ProductDetailModal from '../components/ProductDetailModal';

interface ProductCardProps {
    product: Product;
    onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
    };

    return (
        <div className="bg-slate-800 rounded-lg overflow-hidden group cursor-pointer" onClick={onClick}>
            <div className="aspect-square w-full overflow-hidden">
                <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="p-4">
                <h3 className="font-bold text-md truncate">{product.name}</h3>
                <p className="text-sm text-gray-400">{product.category}</p>
                <div className="flex justify-between items-center mt-3">
                    <p className="font-bold text-lg text-indigo-400">{formatPrice(product.price)}</p>
                </div>
            </div>
        </div>
    );
};

interface MarketplaceViewProps {
    onAddToCart: (product: Product) => void;
}

const MarketplaceView: React.FC<MarketplaceViewProps> = ({ onAddToCart }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleAddToCartFromModal = (product: Product) => {
    onAddToCart(product);
    setSelectedProduct(null); // Close modal after adding to cart
  };

  return (
    <>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Toko</h2>
          <p className="text-gray-400">Temukan perlengkapan voli terbaik</p>
        </div>
        
        <div className="relative">
            <input 
              type="text"
              placeholder="Cari produk..."
              className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
            </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {products.map(product => (
            <ProductCard key={product.id} product={product} onClick={() => setSelectedProduct(product)} />
          ))}
        </div>
      </div>
      
      {selectedProduct && (
        <ProductDetailModal 
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={handleAddToCartFromModal}
        />
      )}
    </>
  );
};

export default MarketplaceView;