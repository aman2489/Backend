import { useEffect, useState } from "react"
import useProduct from "../hooks/useProduct"
import { useParams, Link } from "react-router";
import { useSelector } from "react-redux";

const ProductDetails = () => {
    const {handleGetProductDetails} = useProduct();
    const {productId} = useParams();
    const [productDets, setProductDets] = useState(null);
    const [activeImage, setActiveImage] = useState(null);
    
    // For Navbar matching Home.jsx
    const user = useSelector((state) => state.auth.user);

    async function getProdDets() {
        const data = await handleGetProductDetails(productId)
        setProductDets(data);
        if (data?.images?.length > 0) {
            setActiveImage(data.images[0].url);
        }
    }

    useEffect(() => {
        getProdDets()
    }, [productId]);

    const handleNextImage = () => {
        if (!productDets?.images || productDets.images.length <= 1) return;
        const currentIndex = productDets.images.findIndex((img) => img.url === activeImage);
        const nextIndex = currentIndex === productDets.images.length - 1 ? 0 : currentIndex + 1;
        setActiveImage(productDets.images[nextIndex].url);
    };

    const handlePrevImage = () => {
        if (!productDets?.images || productDets.images.length <= 1) return;
        const currentIndex = productDets.images.findIndex((img) => img.url === activeImage);
        const prevIndex = currentIndex === 0 ? productDets.images.length - 1 : currentIndex - 1;
        setActiveImage(productDets.images[prevIndex].url);
    };

    return (
        <div className="min-h-screen lg:h-screen bg-[#131313] text-[#E5E2E1] flex flex-col font-inter selection:bg-[#FFD700]/30 overflow-y-auto lg:overflow-hidden">
            {/* ── Navbar (Matched exactly from Home.jsx) ── */}
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

            {!productDets ? (
                // Home.jsx style loading
                <div className="flex-1 flex flex-col justify-center items-center">
                    <svg
                        className="animate-spin text-[#FFD700] mb-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                        <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    <p className="text-[#999077] animate-pulse text-sm">
                        Loading product...
                    </p>
                </div>
            ) : (
                // ── Body (Responsive Scrolling Mobile, Locked Desktop) ──
                <div className="flex-1 lg:overflow-hidden p-6 lg:p-10 max-w-[1600px] mx-auto w-full flex flex-col lg:flex-row gap-8 lg:gap-16">
                    
                    {/* Left: Product Imagery */}
                    <div className="flex-none lg:flex-1 flex flex-col-reverse justify-center lg:flex-row gap-4 lg:gap-6 lg:min-h-0 lg:h-full">
                         {/* Thumbnails Gallery */}
                         <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto w-full lg:w-24 shrink-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pr-2 pb-2 lg:pb-0 snap-x">
                            {productDets.images?.map((img) => (
                                <button 
                                    key={img._id} 
                                    onClick={() => setActiveImage(img.url)}
                                    className={`w-20 lg:w-full aspect-[3/4] shrink-0 snap-start rounded-md overflow-hidden border transition-all duration-300 ease-out 
                                        ${activeImage === img.url 
                                            ? 'border-[#FFD700] shadow-[0_0_15px_rgba(255,215,0,0.15)] opacity-100' 
                                            : 'border-[#4D4732]/20 opacity-50 hover:opacity-100 hover:border-[#4d4732]'
                                        }`}
                                >
                                    <img src={img.url} alt="thumbnail" className="w-full h-full object-cover" />
                                </button>
                            ))}
                         </div>
                         
                         {/* Main Hero Image Carousel */}
                         <div className="flex-none lg:flex-1 bg-[#0E0E0E] rounded-xl overflow-hidden border border-[#4D4732]/20 shadow-[0_20px_50px_rgba(0,0,0,0.3)] aspect-[4/5] lg:aspect-auto lg:h-full lg:min-h-0 flex items-center justify-center relative group w-full">
                            {activeImage ? (
                                <>
                                    <img 
                                        src={activeImage} 
                                        alt={productDets.title} 
                                        className="absolute inset-0 w-full h-full object-cover lg:object-contain transition-opacity duration-500" 
                                    />
                                    {productDets.images?.length > 1 && (
                                        <>
                                            <button 
                                                onClick={handlePrevImage}
                                                className="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center rounded-full bg-[#131313]/60 text-[#E5E2E1] border border-[#4D4732]/30 backdrop-blur-md opacity-100 lg:opacity-0 lg:group-hover:opacity-100 hover:bg-[#FFD700] hover:text-[#131313] hover:border-[#FFD700] transition-all duration-300 shadow-xl"
                                                aria-label="Previous image"
                                            >
                                                <svg className="w-4 h-4 lg:w-5 lg:h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
                                            </button>
                                            <button 
                                                onClick={handleNextImage}
                                                className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center rounded-full bg-[#131313]/60 text-[#E5E2E1] border border-[#4D4732]/30 backdrop-blur-md opacity-100 lg:opacity-0 lg:group-hover:opacity-100 hover:bg-[#FFD700] hover:text-[#131313] hover:border-[#FFD700] transition-all duration-300 shadow-xl"
                                                aria-label="Next image"
                                            >
                                                <svg className="w-4 h-4 lg:w-5 lg:h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                                            </button>
                                        </>
                                    )}
                                </>
                            ) : (
                                <div className="text-[#4D4732] flex flex-col items-center">
                                    <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span className="font-inter tracking-wider text-xs uppercase">No Image</span>
                                </div>
                            )}
                         </div>
                    </div>

                    {/* Right: Product Narrative & Actions */}
                    <div className="flex-none lg:flex-1 flex flex-col justify-center gap-6 lg:gap-8 lg:pl-4 lg:overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-8 lg:pb-0">
                        
                        {/* Header */}
                        <div className="flex flex-col gap-2 shrink-0">
                            <h1 className="text-3xl lg:text-4xl tracking-tight text-[#E5E2E1]"
                                style={{
                                    fontFamily: "Manrope, sans-serif",
                                    fontWeight: 300,
                                    letterSpacing: "-0.02em",
                                }}
                            >
                                {productDets.title}
                            </h1>
                            <p className="text-xl lg:text-2xl font-inter text-[#FFD700] tracking-wide">
                                {productDets.price?.currency === "INR" ? '₹' : productDets.price?.currency} {productDets.price?.amount?.toLocaleString()}
                            </p>
                        </div>

                        {/* Minimal Separator */}
                        <div className="w-16 h-px bg-[#4D4732]/50 shrink-0"></div>

                        {/* Description */}
                        <div className="flex flex-col gap-3 shrink-0">
                            <h3 className="text-xs font-inter tracking-[0.2em] uppercase text-[#999077] font-medium">
                                Details
                            </h3>
                            <p className="font-inter text-[#d0c6ab] leading-relaxed font-light text-sm lg:text-base selection:bg-[#FFD700]/30 selection:text-[#E5E2E1]">
                                {productDets.description}
                            </p>
                        </div>
                        
                        {/* Actions */}
                        <div className="pt-2 flex flex-col sm:flex-row gap-4 shrink-0 mt-2">
                            <button className="flex-1 bg-[#FFD700] text-[#131313] font-bold tracking-[0.1em] uppercase text-xs py-4 px-8 rounded-md shadow-lg hover:shadow-xl hover:-translate-y-0.5 hover:bg-[#E9C400] transition-all duration-300 active:scale-95">
                                Buy Now
                            </button>
                            <button className="flex-1 border border-[#4D4732] hover:border-[#999077] hover:bg-[#1C1B1B] text-[#E5E2E1] font-bold tracking-[0.1em] uppercase text-xs py-4 px-8 rounded-md transition-all duration-300 active:scale-95">
                                Add to Cart
                            </button>
                        </div>

                        {/* Distinctions / Micro-copy */}
                        <div className="pt-4 flex items-center justify-between border-t border-[#4D4732]/20 shrink-0">
                            <span className="text-[#999077] text-[10px] uppercase tracking-widest pt-2 block">Complimentary Shipping</span>
                            <span className="text-[#999077] text-[10px] uppercase tracking-widest pt-2 block">Secure Checkout</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProductDetails