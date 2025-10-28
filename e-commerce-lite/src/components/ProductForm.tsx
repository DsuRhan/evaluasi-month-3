import React, { useState, useEffect } from "react";
import type { Product } from "../types";

interface Props {
  initial?: Partial<Product>;
  onSubmit: (p: Omit<Product, "id"> | Partial<Product>) => void;
  onClose?: () => void;
}

export const ProductForm: React.FC<Props> = ({ initial = {}, onSubmit, onClose }) => {
  const [title, setTitle] = useState(initial.title || "");
  const [price, setPrice] = useState(initial.price?.toString() || "0");
  const [description, setDescription] = useState(initial.description || "");
  const [category, setCategory] = useState(initial.category || "");
  const [image, setImage] = useState(initial.image || "");

  useEffect(() => {
    setTitle(initial.title || "");
    setPrice(initial.price?.toString() || "0");
    setDescription(initial.description || "");
    setCategory(initial.category || "");
    setImage(initial.image || "");
  }, [initial]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      price: Number(price) || 0,
      description,
      category,
      image: image || "https://via.placeholder.com/150",
    });
    onClose?.();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input className="w-full p-2 border rounded" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <input className="w-full p-2 border rounded" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} />
      <input className="w-full p-2 border rounded" placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} />
      <input className="w-full p-2 border rounded" placeholder="Image URL" value={image} onChange={e => setImage(e.target.value)} />
      <textarea className="w-full p-2 border rounded" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
      <div className="flex gap-2">
        <button type="submit" className="px-3 py-1 bg-blue-600 text-white rounded">Save</button>
        <button type="button" onClick={onClose} className="px-3 py-1 border rounded">Cancel</button>
      </div>
    </form>
  );
};
