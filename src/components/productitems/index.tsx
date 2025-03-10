import React from "react";
import Image from "next/image";

interface ProductItemProps {
  item: any;
}

const ProductItem: React.FC<ProductItemProps> = ({ item }) => {
  // Extract the first image from Shopify's data structure or provide a fallback
  const imageEdge = item.images?.edges?.[0];
  const imageUrl = imageEdge?.node?.url || "/placeholder.jpg";
  const altText = imageEdge?.node?.altText || item.title || "Product image";

  return (
    <div className="group">
      {/* Image container uses full width and maintains a square aspect ratio */}
      <div className="relative w-full overflow-hidden flex items-center justify-center rounded-lg bg-[#F6F7FB] mb-4 aspect-square">
        <Image src={imageUrl} alt={altText} fill className="object-cover" />
        {/* Action overlay on hover */}
        <div className="absolute left-0 bottom-0 translate-y-full w-full flex items-center justify-center gap-2.5 pb-5 ease-linear duration-200 group-hover:translate-y-0">
          <button className="px-4 py-2 bg-blue-500 text-white rounded">
            Action
          </button>
        </div>
      </div>
      <h3 className="text-lg font-medium">{item.title}</h3>
      <p className="text-sm text-gray-600">
        ${item.priceRange?.minVariantPrice?.amount}
      </p>
    </div>
  );
};

export default ProductItem;
