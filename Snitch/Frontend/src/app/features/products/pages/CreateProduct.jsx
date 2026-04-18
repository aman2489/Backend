import React, { useState, useRef } from 'react';
import useProduct from "../hooks/useProduct";
import { useNavigate } from "react-router";

const MAX_IMAGES = 7;

const CreateProduct = () => {
    const { handleCreateProduct } = useProduct();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priceAmount: '',
        priceCurrency: 'INR',
    });
    const [images, setImages] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const addFiles = (files) => {
        const imageFiles = Array.from(files).filter(f => f.type.startsWith('image/'));
        const remaining = MAX_IMAGES - images.length;
        if (remaining <= 0) return;
        if (imageFiles.length > remaining) setError(`Only ${remaining} more image${remaining > 1 ? 's' : ''} allowed.`);
        else setError(null);
        setImages(prev => [...prev, ...imageFiles].slice(0, MAX_IMAGES));
    };

    const handleImageChange = (e) => addFiles(e.target.files);
    const removeImage = (index) => { setImages(prev => prev.filter((_, i) => i !== index)); setError(null); };

    const handleDragOver  = (e) => { e.preventDefault(); e.stopPropagation(); setIsDragging(true); };
    const handleDragLeave = (e) => { e.preventDefault(); e.stopPropagation(); setIsDragging(false); };
    const handleDrop      = (e) => { e.preventDefault(); e.stopPropagation(); setIsDragging(false); addFiles(e.dataTransfer.files); };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        const uploadData = new FormData();
        uploadData.append('title', formData.title);
        uploadData.append('description', formData.description);
        uploadData.append('priceAmount', formData.priceAmount);
        uploadData.append('priceCurrency', formData.priceCurrency);
        images.forEach(img => uploadData.append('images', img));
        try {
            await handleCreateProduct(uploadData);
            navigate('/seller/dashboard');
        } catch (err) {
            setError(err?.response?.data?.message || err.message || 'Failed to create product');
        } finally {
            setIsSubmitting(false);
        }
    };

    const atLimit = images.length >= MAX_IMAGES;

    return (
        <div
            className="min-h-screen lg:h-screen lg:overflow-hidden flex flex-col bg-[#131313] text-[#E5E2E1]"
            style={{ fontFamily: 'Inter, sans-serif' }}
        >
            {/* ── Navbar ── */}
            <nav className="shrink-0 flex items-center justify-between px-6 lg:px-8 py-4 border-b border-[#4D4732]/20">
                <div className="flex items-center gap-3">
                    <span
                        className="text-xl font-bold tracking-[-0.04em] text-[#E5E2E1]"
                        style={{ fontFamily: 'Manrope, sans-serif' }}
                    >
                        snitch<span className="text-[#FFD700]">.</span>
                    </span>
                    <span className="hidden sm:block text-[#4D4732]/60 text-xs select-none">|</span>
                    <span className="hidden sm:block text-[#999077] text-xs tracking-widest uppercase">Seller Studio</span>
                </div>
                <button
                    type="button"
                    onClick={() => navigate('/seller/dashboard')}
                    className="flex items-center gap-2 text-xs text-[#999077] hover:text-[#E5E2E1] transition-colors duration-200"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <path d="M19 12H5M12 5l-7 7 7 7"/>
                    </svg>
                    <span className="hidden sm:inline">Back</span>
                </button>
            </nav>

            {/* ── Body ── */}
            <div className="flex-1 min-h-0 flex flex-col lg:flex-row">

                {/* ════════════════════════════════════
                    LEFT COLUMN — Details + Submit btn
                ════════════════════════════════════ */}
                <div className="flex-1 flex flex-col px-6 lg:px-10 py-8 lg:py-10 lg:pr-8">

                    {/* Page heading */}
                    <div className="mb-8 shrink-0">
                        <h1
                            className="text-3xl lg:text-4xl tracking-tight text-[#E5E2E1] mb-1"
                            style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 300, letterSpacing: '-0.02em' }}
                        >
                            New Product
                        </h1>
                        <p className="text-[#999077] text-sm">Fill in the details to publish your listing.</p>
                    </div>

                    {/* Form — grow to fill, button pinned at bottom */}
                    <form
                        id="create-product-form"
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-5 flex-1"
                    >
                        {/* Title */}
                        <div>
                            <label htmlFor="title" className="block text-[10px] font-semibold tracking-[0.12em] uppercase text-[#999077] mb-1.5">
                                Product Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                placeholder="e.g. Obsidian Trench Coat"
                                className="w-full bg-[#0E0E0E] text-[#E5E2E1] placeholder-[#353534] px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#999077]/40 transition-all duration-200"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="description" className="block text-[10px] font-semibold tracking-[0.12em] uppercase text-[#999077] mb-1.5">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                rows="4"
                                placeholder="Describe the texture, fit, and essence..."
                                className="w-full bg-[#0E0E0E] text-[#E5E2E1] placeholder-[#353534] px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#999077]/40 resize-none transition-all duration-200"
                            />
                        </div>

                        {/* Price + Currency */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="priceAmount" className="block text-[10px] font-semibold tracking-[0.12em] uppercase text-[#999077] mb-1.5">
                                    Price
                                </label>
                                <input
                                    type="number"
                                    id="priceAmount"
                                    name="priceAmount"
                                    value={formData.priceAmount}
                                    onChange={handleChange}
                                    required
                                    min="0"
                                    step="0.01"
                                    placeholder="0.00"
                                    className="w-full bg-[#0E0E0E] text-[#E5E2E1] placeholder-[#353534] px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#999077]/40 transition-all duration-200"
                                />
                            </div>
                            <div>
                                <label htmlFor="priceCurrency" className="block text-[10px] font-semibold tracking-[0.12em] uppercase text-[#999077] mb-1.5">
                                    Currency
                                </label>
                                <div className="relative">
                                    <select
                                        id="priceCurrency"
                                        name="priceCurrency"
                                        value={formData.priceCurrency}
                                        onChange={handleChange}
                                        className="w-full bg-[#0E0E0E] text-[#E5E2E1] px-4 py-3 pr-9 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#999077]/40 appearance-none cursor-pointer transition-all duration-200"
                                    >
                                        <option value="INR">INR (₹)</option>
                                        <option value="USD">USD ($)</option>
                                        <option value="EUR">EUR (€)</option>
                                        <option value="GBP">GBP (£)</option>
                                    </select>
                                    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#999077]">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ── Publish button — desktop only, pinned at bottom of form ── */}
                        <div className="hidden lg:block mt-auto pt-2">
                            {error && (
                                <p className="text-xs text-[#ffb4ab] mb-3 bg-[#93000a]/20 px-4 py-2 rounded-lg">{error}</p>
                            )}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full flex items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold tracking-wide bg-gradient-to-br from-[#E9C400] to-[#FFD700] text-[#3A3000] hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-[0_0_30px_rgba(255,215,0,0.10)] hover:shadow-[0_0_50px_rgba(255,215,0,0.22)]"
                                style={{ fontFamily: 'Manrope, sans-serif' }}
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                                        </svg>
                                        Publishing…
                                    </>
                                ) : 'Publish Product'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Vertical divider — desktop only */}
                <div className="hidden lg:block w-px bg-[#4D4732]/20 my-8 shrink-0" />

                {/* ════════════════════════════════════
                    RIGHT COLUMN — Image Gallery
                ════════════════════════════════════ */}
                <div className="w-full lg:w-[44%] shrink-0 flex flex-col px-6 lg:px-10 pb-8 lg:py-10 lg:pl-8 lg:min-h-0">

                    {/* Gallery header */}
                    <div className="shrink-0 flex items-center justify-between mb-4">
                        <h2 className="text-[10px] font-semibold tracking-[0.12em] uppercase text-[#999077]">
                            Gallery
                        </h2>
                        <span className="text-[10px] font-mono text-[#4D4732] bg-[#1C1B1B] px-2 py-0.5 rounded">
                            {images.length} / {MAX_IMAGES}
                        </span>
                    </div>

                    {/* Drop zone — hidden when at limit */}
                    {!atLimit && (
                        <label
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            className={`shrink-0 group flex flex-col items-center justify-center gap-2.5 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-300 py-7 mb-4
                                ${isDragging
                                    ? 'border-[#FFD700] bg-[#FFD700]/5 scale-[1.01]'
                                    : 'border-[#4D4732]/40 bg-[#0E0E0E] hover:border-[#999077]/50 hover:bg-[#111]'
                                }`}
                        >
                            <div className={`p-2.5 rounded-full transition-colors duration-300 ${isDragging ? 'bg-[#FFD700]/15 text-[#FFD700]' : 'bg-[#1C1B1B] text-[#999077] group-hover:text-[#E5E2E1]'}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                    <polyline points="16 16 12 12 8 16"/>
                                    <line x1="12" y1="12" x2="12" y2="21"/>
                                    <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
                                </svg>
                            </div>
                            <div className="text-center">
                                <p className={`text-sm font-medium transition-colors duration-200 ${isDragging ? 'text-[#FFD700]' : 'text-[#D0C6AB] group-hover:text-[#E5E2E1]'}`}>
                                    {isDragging ? 'Drop to add' : 'Drop images here'}
                                </p>
                                <p className="text-xs text-[#4D4732] mt-0.5">
                                    or{' '}
                                    <span className="text-[#999077] underline underline-offset-2">click to browse</span>
                                    {images.length > 0 && ` · ${MAX_IMAGES - images.length} left`}
                                </p>
                            </div>
                            <input ref={fileInputRef} type="file" multiple accept="image/*" className="hidden" onChange={handleImageChange} />
                        </label>
                    )}

                    {/* Image grid — scrollable on desktop */}
                    {images.length > 0 && (
                        <div
                            className="lg:flex-1 lg:min-h-0 lg:overflow-y-auto pr-0.5"
                            style={{ scrollbarWidth: 'thin', scrollbarColor: '#4D4732 transparent' }}
                        >
                            <div className="grid grid-cols-3 gap-2">
                                {/* Primary image — full width */}
                                <div className="col-span-3 aspect-[16/9] relative group rounded-xl overflow-hidden bg-[#0E0E0E]">
                                    <img
                                        src={URL.createObjectURL(images[0])}
                                        alt="Primary preview"
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <span className="absolute top-2 left-2 text-[9px] font-semibold tracking-widest uppercase bg-[#131313]/80 backdrop-blur-sm text-[#FFD700] px-2 py-0.5 rounded">
                                        Primary
                                    </span>
                                    <div className="absolute inset-0 bg-[#131313]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                                        <button type="button" onClick={() => removeImage(0)} className="p-1.5 bg-[#ffb4ab] text-[#690005] rounded-full hover:scale-110 transition-transform">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
                                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                {/* Additional thumbnails */}
                                {images.slice(1).map((img, idx) => (
                                    <div key={idx + 1} className="aspect-square relative group rounded-lg overflow-hidden bg-[#0E0E0E]">
                                        <img
                                            src={URL.createObjectURL(img)}
                                            alt={`Preview ${idx + 2}`}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-[#131313]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                                            <button type="button" onClick={() => removeImage(idx + 1)} className="p-1.5 bg-[#ffb4ab] text-[#690005] rounded-full hover:scale-110 transition-transform">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
                                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                {/* Add-more tile */}
                                {!atLimit && (
                                    <label className="aspect-square rounded-lg border-2 border-dashed border-[#4D4732]/30 hover:border-[#999077]/50 bg-[#0E0E0E] flex items-center justify-center cursor-pointer transition-all duration-200 group">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className="text-[#4D4732] group-hover:text-[#999077] transition-colors">
                                            <line x1="12" y1="5" x2="12" y2="19"/>
                                            <line x1="5" y1="12" x2="19" y2="12"/>
                                        </svg>
                                        <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageChange} />
                                    </label>
                                )}
                            </div>
                        </div>
                    )}

                    {atLimit && (
                        <p className="shrink-0 mt-3 text-xs text-center text-[#999077]">
                            Max {MAX_IMAGES} images reached. Remove one to add another.
                        </p>
                    )}
                </div>

                {/* ── Mobile-only publish button — below gallery ── */}
                <div className="lg:hidden px-6 pb-8">
                    {error && (
                        <p className="text-xs text-[#ffb4ab] mb-3 bg-[#93000a]/20 px-4 py-2 rounded-lg">{error}</p>
                    )}
                    <button
                        type="submit"
                        form="create-product-form"
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold tracking-wide bg-gradient-to-br from-[#E9C400] to-[#FFD700] text-[#3A3000] hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-[0_0_30px_rgba(255,215,0,0.10)]"
                        style={{ fontFamily: 'Manrope, sans-serif' }}
                    >
                        {isSubmitting ? (
                            <>
                                <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                                </svg>
                                Publishing…
                            </>
                        ) : 'Publish Product'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateProduct;