

const SkeletonCard = () => (
  <div className="animate-pulse bg-gray-200 rounded-lg shadow-md p-4 flex flex-col">
    {/* Image Placeholder */}
    <div className="h-40 bg-gray-300 rounded-lg mb-4"></div>

    {/* Title Placeholder */}
    <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>

    {/* Description Placeholder */}
    <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
    <div className="h-4 bg-gray-300 rounded w-1/3"></div>
  </div>
);

export default SkeletonCard;
