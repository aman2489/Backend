import { useEffect } from "react";
import useProduct from "../hooks/useProduct";
import { useSelector } from "react-redux";
import { Link } from "react-router";

const Home = () => {
    const products = useSelector((state) => state.product.products);
    const user = useSelector((state) => state.auth.user);
    const { handleGetAllProducts } = useProduct();

    useEffect(() => {
        handleGetAllProducts();
    }, []);

    const formatPrice = (amount, currency) => {
        if (amount === undefined || amount === null) return "N/A";
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: currency || "INR",
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <div
            className="min-h-screen bg-[#131313] text-[#E5E2E1] flex flex-col"
            style={{ fontFamily: "Inter, sans-serif" }}
        >
            {/* ── Navbar ── */}
            <nav className="shrink-0 flex items-center justify-between px-6 lg:px-8 py-4 border-b border-[#4D4732]/20 sticky top-0 z-50 bg-[#131313]/90 backdrop-blur-md">
                <div className="flex items-center gap-3">
                    <Link
                        to="/"
                        className="text-xl font-bold tracking-[-0.04em] text-[#E5E2E1] hover:text-[#999077] transition-colors duration-200"
                        style={{ fontFamily: "Manrope, sans-serif" }}
                    >
                        snitch<span className="text-[#FFD700]">.</span>
                    </Link>
                    <span className="hidden sm:block text-[#4D4732]/60 text-xs select-none">
                        |
                    </span>
                    <span className="hidden sm:block text-[#999077] text-xs tracking-widest uppercase">
                        Store
                    </span>
                </div>
                <div className="flex items-center gap-6">
                    {user ? (
                        <span className="hidden sm:block text-[#E5E2E1] text-sm font-medium">
                            Hello, <span className="capitalize">{user.fullname?.split(' ')[0] || user.name?.split(' ')[0] || "User"}</span>
                        </span>
                    ) : (
                        <Link
                            to="/login"
                            className="hidden sm:block text-[#999077] hover:text-[#E5E2E1] text-sm font-medium transition-colors"
                        >
                            Sign In
                        </Link>
                    )}
                    {user?.role !== "buyer" && (
                        <Link
                            to="/seller/dashboard"
                            className="text-xs font-semibold tracking-wide uppercase text-[#E9C400] hover:text-[#FFD700] transition-colors duration-200"
                        >
                            Seller Mode
                        </Link>
                    )}
                </div>
            </nav>

            {/* ── Body ── */}
            <div className="flex-1 flex flex-col px-6 lg:px-10 py-8 lg:py-10 mx-auto w-full max-w-[1600px]">
                {/* Header Section */}
                <div className="flex flex-col mb-8 sm:mb-10 shrink-0">
                    <h1
                        className="text-3xl lg:text-4xl tracking-tight text-[#E5E2E1] mb-2"
                        style={{
                            fontFamily: "Manrope, sans-serif",
                            fontWeight: 300,
                            letterSpacing: "-0.02em",
                        }}
                    >
                        New Arrivals
                    </h1>
                    <p className="text-[#999077] text-sm max-w-lg">
                        Discover the latest premium menswear collection, designed to elevate your everyday style.
                    </p>
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
                            Loading collection...
                        </p>
                    </div>
                ) : products.length === 0 ? (
                    <div className="flex-1 flex flex-col justify-center items-center bg-[#0E0E0E] rounded-2xl border border-[#4D4732]/20 py-20 px-4 text-center">
                        <div className="w-16 h-16 bg-[#1C1B1B] rounded-full flex items-center justify-center mb-6">
                            <svg className="w-7 h-7 text-[#999077]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                        </div>
                        <h3 className="text-xl text-[#E5E2E1] font-medium mb-2 tracking-tight">
                            No products available
                        </h3>
                        <p className="text-[#999077] text-sm mb-8 max-w-sm">
                            We're currently updating our catalog. Please check back soon for our latest curated arrivals.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                        {products.map((product) => (
                            <Link
                                to={`/product/${product._id}`}
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
                                            <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <span className="text-xs font-medium uppercase tracking-widest">
                                                No Image
                                            </span>
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
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;