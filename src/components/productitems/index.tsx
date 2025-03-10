"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addItemToCart } from "@/redux/features/cart-slice";
import { addItemToWishlist } from "@/redux/features/wishlist-slice";

interface ProductItemProps {
  item: any;
}

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: any;
}

const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  product,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl p-6 max-w-lg w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none"
          aria-label="Close Modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Product Image */}
        {product.image && (
          <img
            src={product.image}
            alt={product.altText || product.title}
            className="w-full h-48 object-cover rounded-md mb-4"
          />
        )}
        <h2 className="text-2xl font-semibold mb-2">{product.title}</h2>
        {product.description && (
          <p className="text-gray-700 mb-4">{product.description}</p>
        )}
        <div className="flex justify-between">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
            onClick={() => console.log("Primary Action Clicked")}
          >
            Primary Action
          </button>
          <button
            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductItem: React.FC<ProductItemProps> = ({ item }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [showModal, setShowModal] = useState(false);

  const handleAddToWishlist = () => {
    dispatch(
      addItemToWishlist({
        ...item,
        status: "available",
        quantity: 1,
      })
    );
  };

  const handleAddToCart = () => {
    dispatch(
      addItemToCart({
        ...item,
        quantity: 1,
      })
    );
  };

  const handleViewDetails = () => {
    setShowModal(true);
  };

  // Extract image from Shopify data structure or use fallback
  const imageEdge = item.images?.edges?.[0];
  const imageUrl = imageEdge?.node?.url || "/placeholder.jpg";
  const altText = imageEdge?.node?.altText || item.title || "Product image";

  return (
    <div className="group relative">
      {/* Product Card */}
      <div className="relative w-full overflow-hidden flex items-center justify-center rounded-lg bg-[#F6F7FB] mb-4 aspect-square">
        <Image src={imageUrl} alt={altText} fill className="object-cover" />
        {/* Overlay on hover with buttons */}
        <div className="absolute left-0 bottom-0 translate-y-full w-full flex items-center justify-center gap-2.5 pb-5 ease-linear duration-200 group-hover:translate-y-0">
          {/* Add to Wishlist Button */}
          <button
            onClick={handleAddToWishlist}
            aria-label="Add to wishlist"
            className="flex items-center justify-center w-9 h-9 rounded-[5px] shadow-1 text-dark bg-white hover:text-blue ease-out duration-200"
          >
            <svg
              className="fill-current"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.74949 2.94946C2.6435 3.45502 1.83325 4.65749 1.83325 6.0914C1.83325 7.55633 2.43273 8.68549 3.29211 9.65318C4.0004 10.4507 4.85781 11.1118 5.694 11.7564C5.89261 11.9095 6.09002 12.0617 6.28395 12.2146C6.63464 12.491 6.94747 12.7337 7.24899 12.9099C7.55068 13.0862 7.79352 13.1667 7.99992 13.1667C8.20632 13.1667 8.44916 13.0862 8.75085 12.9099C9.05237 12.7337 9.3652 12.491 9.71589 12.2146C9.90982 12.0617 10.1072 11.9095 10.3058 11.7564C11.142 11.1118 11.9994 10.4507 12.7077 9.65318C13.5671 8.68549 14.1666 7.55633 14.1666 6.0914C14.1666 4.65749 13.3563 3.45502 12.2503 2.94946C11.1759 2.45832 9.73214 2.58839 8.36016 4.01382C8.2659 4.11175 8.13584 4.16709 7.99992 4.16709C7.864 4.16709 7.73393 4.11175 7.63967 4.01382C6.26769 2.58839 4.82396 2.45832 3.74949 2.94946Z"
                fill=""
              />
            </svg>
          </button>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="inline-flex font-medium text-custom-sm py-[7px] px-5 rounded-[5px] bg-blue text-white ease-out duration-200 hover:bg-blue-dark"
          >
            Add to cart
          </button>

          {/* View Details Button */}
          <button
            onClick={handleViewDetails}
            aria-label="View details"
            className="flex items-center justify-center w-9 h-9 rounded-[5px] shadow-1 text-dark bg-white hover:text-blue ease-out duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M16 8s-3-5.333-8-5.333S0 8 0 8s3 5.333 8 5.333S16 8 16 8zM8 11.333A3.333 3.333 0 1 1 8 4.667a3.333 3.333 0 0 1 0 6.666z" />
              <path d="M8 9.333A1.333 1.333 0 1 0 8 6.667a1.333 1.333 0 0 0 0 2.666z" />
            </svg>
          </button>
        </div>
      </div>
      <h3 className="text-lg font-medium">{item.title}</h3>
      <p className="text-sm text-gray-600">
        ${item.priceRange?.minVariantPrice?.amount}
      </p>

      {/* Product Modal */}
      <ProductModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        product={{ ...item, image: imageUrl, altText: altText }}
      />
    </div>
  );
};

export default ProductItem;
