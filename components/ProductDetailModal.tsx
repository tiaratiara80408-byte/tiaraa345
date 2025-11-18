import React from 'react';
import type { Product } from '../types';
import Modal from './Modal';
import { StarIcon } from './icons';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
};

const RatingStars: React.FC<{ rating: number }> = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
        <div className="flex items-center">
            {[...Array(fullStars)].map((_, i) => <StarIcon key={`full-${i}`} className="h-5 w-5 text-yellow-400" />)}
            {/* Note: Half star implementation is omitted for simplicity, but could be added with an alternative icon */}
            {[...Array(emptyStars)].map((_, i) => <StarIcon key={`empty-${i}`} className="h-5 w-5 text-slate-600" />)}
            <span className="ml-2 text-sm text-gray-400">{rating.toFixed(1)}</span>
        </div>
    );
};

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose, onAddToCart }) => {
  if (!product) return null;

  return (
    <Modal isOpen={!!product} onClose={onClose} title="Detail Produk">
      <div className="flex flex-col space-y-4">
        <div className="aspect-square w-full rounded-lg overflow-hidden bg-slate-700">
          <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
        </div>
        
        <div>
          <p className="text-sm text-indigo-400 font-semibold">{product.category}</p>
          <h3 className="text-2xl font-bold">{product.name}</h3>
        </div>
        
        <div className="flex justify-between items-center">
            <p className="text-3xl font-bold text-indigo-400">{formatPrice(product.price)}</p>
            <RatingStars rating={product.rating} />
        </div>

        <div className="text-sm text-gray-300 leading-relaxed max-h-24 overflow-y-auto pr-2">
            <p>{product.description}</p>
        </div>

        <button 
            onClick={() => onAddToCart(product)}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
        >
          Tambah ke Keranjang
        </button>
      </div>
    </Modal>
  );
};

export default ProductDetailModal;