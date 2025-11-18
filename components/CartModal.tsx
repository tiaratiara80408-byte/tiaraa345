import React from 'react';
import type { Product } from '../types';
import Modal from './Modal';
import { TrashIcon } from './icons';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: Product[];
  onRemove: (productId: number) => void;
  onCheckout: () => void;
}

const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
};

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose, cart, onRemove, onCheckout }) => {
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Keranjang (${cart.length})`}>
      <div className="flex flex-col space-y-4 max-h-[60vh]">
        {cart.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-400">Keranjang Anda kosong.</p>
            <p className="text-sm text-gray-500">Ayo mulai belanja!</p>
          </div>
        ) : (
          <>
            <div className="flex-grow overflow-y-auto pr-2 space-y-3">
                {cart.map((item, index) => (
                <div key={`${item.id}-${index}`} className="flex items-center space-x-4 bg-slate-700/50 p-2 rounded-lg">
                    <img src={item.imageUrl} alt={item.name} className="w-16 h-16 rounded-md object-cover" />
                    <div className="flex-grow">
                    <p className="font-semibold text-sm">{item.name}</p>
                    <p className="text-indigo-400 text-xs font-bold">{formatPrice(item.price)}</p>
                    </div>
                    <button onClick={() => onRemove(item.id)} className="p-2 text-gray-400 hover:text-red-400 hover:bg-slate-700 rounded-full">
                    <TrashIcon className="h-5 w-5" />
                    </button>
                </div>
                ))}
            </div>
            <div className="border-t border-slate-700 pt-4 space-y-4">
              <div className="flex justify-between items-center font-bold">
                <span>Total</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <button onClick={onCheckout} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors">
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default CartModal;
