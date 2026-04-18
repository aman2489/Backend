import { useEffect } from "react";
import useProduct from "../hooks/useProduct";
import { useSelector } from "react-redux";
import { Link } from "react-router";

const Dashboard = () => {
  const { handleGetSellerProducts } = useProduct();
  const products = useSelector((state) => state.product.sellerProducts);

  useEffect(() => {
    handleGetSellerProducts();
  }, []);

  const formatPrice = (amount, currency) => {
    if (amount === undefined || amount === null) return "N/A";
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: currency || "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div
      className="min-h-screen bg-[#131313] text-[#E5E2E1] flex flex-col"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {/* ── Navbar ── */}
      <nav className="shrink-0 flex items-center justify-between px-6 lg:px-8 py-4 border-b border-[#4D4732]/20">
        <div className="flex items-center gap-3">
          <span
            className="text-xl font-bold tracking-[-0.04em] text-[#E5E2E1]"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            snitch<span className="text-[#FFD700]">.</span>
          </span>
          <span className="hidden sm:block text-[#4D4732]/60 text-xs select-none">
            |
          </span>
          <span className="hidden sm:block text-[#999077] text-xs tracking-widest uppercase">
            Seller Dashboard
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            to="/seller/create-product"
            className="hidden sm:flex items-center gap-2 text-xs font-semibold tracking-wide uppercase text-[#E9C400] hover:text-[#FFD700] transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
            Add Product
          </Link>
        </div>
      </nav>

      {/* ── Body ── */}
      <div className="flex-1 flex flex-col px-6 lg:px-10 py-8 lg:py-10 mx-auto w-full max-w-[1600px]">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4 shrink-0">
          <div>
            <h1
              className="text-3xl lg:text-4xl tracking-tight text-[#E5E2E1] mb-1"
              style={{
                fontFamily: "Manrope, sans-serif",
                fontWeight: 300,
                letterSpacing: "-0.02em",
              }}
            >
              Inventory
            </h1>
            <p className="text-[#999077] text-sm">
              Manage your premium products and listings.
            </p>
          </div>
          <Link
            to="/seller/create-product"
            className="sm:hidden flex items-center justify-center gap-2 rounded-full py-3 px-6 text-sm font-semibold tracking-wide bg-gradient-to-br from-[#E9C400] to-[#FFD700] text-[#3A3000] hover:brightness-110 transition-all duration-200 shadow-[0_0_30px_rgba(255,215,0,0.10)]"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add New Product
          </Link>
        </div>

        {/* State rendering */}
        {!products ? (
          <div className="flex-1 flex flex-col justify-center items-center py-20">
            <svg
              className="animate-spin text-[#FFD700] mb-4"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-20"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="3"
              />
              <path
                className="opacity-90"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              />
            </svg>
            <p className="text-[#999077] animate-pulse text-sm">
              Loading inventory...
            </p>
          </div>
        ) : products.length === 0 ? (
          <div className="flex-1 flex flex-col justify-center items-center bg-[#0E0E0E] rounded-2xl border border-[#4D4732]/20 py-20 px-4 text-center">
            <div className="w-16 h-16 bg-[#1C1B1B] rounded-full flex items-center justify-center mb-6">
              <svg
                className="w-7 h-7 text-[#999077]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
            <h3 className="text-xl text-[#E5E2E1] font-medium mb-2 tracking-tight">
              No products found
            </h3>
            <p className="text-[#999077] text-sm mb-8 max-w-sm">
              You haven't listed any products yet. Start adding your premium
              inventory to reach customers and grow your brand.
            </p>
            <Link
              to="/seller/create-product"
              className="inline-flex items-center text-sm text-[#FFD700] hover:text-[#E9C400] font-medium transition-colors group"
            >
              Create your first product
              <svg
                className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="group flex flex-col bg-[#0E0E0E] border border-[#4D4732]/20 rounded-xl overflow-hidden hover:border-[#999077]/50 transition-all duration-300"
              >
                {/* Image Gallery Container */}
                <div className="relative aspect-[4/4] overflow-hidden bg-[#1C1B1B] w-full shrink-0">
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={product.images[0].url}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-[#4D4732]">
                      <svg
                        className="w-8 h-8 mb-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="text-xs font-medium uppercase tracking-widest">
                        No Image
                      </span>
                    </div>
                  )}
                  {/* Image counter pill */}
                  {product.images && product.images.length > 1 && (
                    <div className="absolute top-3 right-3 bg-[#131313]/80 backdrop-blur-sm text-[#FFD700] text-[10px] uppercase font-semibold tracking-widest px-2 py-0.5 rounded">
                      {product.images.length} {"Images"}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 lg:p-5 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-2 gap-3">
                    <h3 className="text-sm lg:text-[15px] font-medium text-[#E5E2E1] leading-snug line-clamp-2">
                      {product.title}
                    </h3>
                    <span className="text-[#FFD700] text-sm font-semibold whitespace-nowrap shrink-0">
                      {formatPrice(
                        product.price?.amount,
                        product.price?.currency
                      )}
                    </span>
                  </div>

                  <p className="text-[#999077] text-xs leading-relaxed line-clamp-2 mb-4 flex-grow">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-[#4D4732]/20 mt-auto">
                    <div className="flex items-center text-[10px] font-semibold text-[#999077] uppercase tracking-widest">
                      {formatDate(product.createdAt)}
                    </div>

                    <div className="flex items-center space-x-1">
                      <button
                        className="p-1.5 text-[#999077] hover:text-[#E5E2E1] transition-colors duration-200"
                        title="Edit Product"
                      >
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                          />
                        </svg>
                      </button>
                      <button
                        className="p-1.5 text-[#999077] hover:text-[#ffb4ab] transition-colors duration-200"
                        title="Delete Product"
                      >
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

