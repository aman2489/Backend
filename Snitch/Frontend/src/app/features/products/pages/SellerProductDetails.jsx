import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router";
import useProduct from "../hooks/useProduct";

const SellerProductDetails = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [productDets, setProductDets] = useState(null);
    const [activeImage, setActiveImage] = useState(null);
    const [variants, setVariants] = useState([]);
    const [loading, setLoading] = useState(true);

    const { handleGetProductDetails, handleCreateVariant } = useProduct();

    useEffect(() => {
        async function getProdDets() {
            setLoading(true);
            try {
                const data = await handleGetProductDetails(productId);
                setProductDets(data);
                console.log(data)
                if (data?.images?.length > 0) {
                    setActiveImage(data.images[0].url);
                }
                if (data?.variants) {
                    setVariants(data.variants);
                }
            } catch (err) {
                console.error("Failed to load product", err);
            } finally {
                setLoading(false);
            }
        }
        getProdDets();
    }, [productId]);

    // Local state for the Variant Form
    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    const [formStock, setFormStock] = useState(0);
    const [formPrice, setFormPrice] = useState("");
    const [formCurrency, setFormCurrency] = useState("INR");
    const [formAttributes, setFormAttributes] = useState([{ key: "", value: "" }]);
    const [formImages, setFormImages] = useState([]);

    const resetForm = () => {
        setFormStock(0);
        setFormPrice("");
        setFormCurrency("INR");
        setFormAttributes([{ key: "", value: "" }]);
        setFormImages([]);
        setIsEditing(false);
        setEditIndex(null);
        setShowForm(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const addFiles = (fileList) => {
        const files = Array.from(fileList);
        if (formImages.length + files.length > 7) {
            alert("Maximum 7 images allowed per variant.");
            return;
        }
        const newImages = files.map(file => ({
            file,
            previewUrl: URL.createObjectURL(file)
        }));
        setFormImages(prev => [...prev, ...newImages]);
    };

    const handleFileChange = (e) => {
        if (e.target.files) {
            addFiles(e.target.files);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            addFiles(e.dataTransfer.files);
        }
    };

    const removeFormImage = (index) => {
        setFormImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleAddAttribute = () => {
        setFormAttributes(prev => [...prev, { key: "", value: "" }]);
    };

    const handleAttributeChange = (index, field, val) => {
        const newAttrs = [...formAttributes];
        newAttrs[index][field] = val;
        setFormAttributes(newAttrs);
    };

    const removeAttribute = (index) => {
        setFormAttributes(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmitVariant = async(e) => {
        e.preventDefault();
        
        const validAttrs = formAttributes.filter(attr => attr.key.trim() !== "" && attr.value.trim() !== "");
        if (validAttrs.length === 0) {
            alert("At least one valid attribute (e.g., Size, Color) is required.");
            return;
        }

        const attributesMap = {};
        validAttrs.forEach(attr => {
            attributesMap[attr.key.trim()] = attr.value.trim();
        });

        const finalImages = formImages.map(img => ({
            url: img.previewUrl || img.originalUrl
        }));

        const newVariant = {
            images: formImages.map(img => ({
                file: img.file,
                url: img.previewUrl   // for display
            })),
            stock: Number(formStock),
            attributes: attributesMap,
            price: formPrice ? {
                amount: Number(formPrice),
                currency: formCurrency
            } : null
        };

        if (isEditing && editIndex !== null) {
            const updatedVariants = [...variants];
            updatedVariants[editIndex] = newVariant;
            setVariants(updatedVariants);
        } else {
            setVariants(prev => [...prev, newVariant]);
        }
        
        await handleCreateVariant(productId, newVariant);
        
        resetForm();
    };

    const handleEditVariant = (index) => {
        const variant = variants[index];
        setIsEditing(true);
        setEditIndex(index);
        setShowForm(true);
        
        setFormStock(variant.stock || 0);
        setFormPrice(variant.price?.amount || "");
        setFormCurrency(variant.price?.currency || "INR");
        
        if (variant.attributes) {
            const attrsArr = Object.entries(variant.attributes).map(([k, v]) => ({ key: k, value: v }));
            setFormAttributes(attrsArr.length > 0 ? attrsArr : [{ key: "", value: "" }]);
        } else {
            setFormAttributes([{ key: "", value: "" }]);
        }

        if (variant.images) {
            setFormImages(variant.images.map(img => ({ originalUrl: img.url, previewUrl: img.url })));
        } else {
            setFormImages([]);
        }

        // Scroll to form slightly after opening
        setTimeout(() => {
            document.getElementById("variant-form-section")?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    };

    const handleDeleteVariant = (index) => {
        if(window.confirm("Are you sure you want to delete this variant?")) {
            setVariants(prev => prev.filter((_, i) => i !== index));
            if(isEditing && editIndex === index) {
                resetForm();
            }
        }
    };

    const handleStockAdjustment = (index, delta) => {
        const updatedVariants = [...variants];
        const newStock = Math.max(0, (updatedVariants[index].stock || 0) + delta);
        updatedVariants[index].stock = newStock;
        setVariants(updatedVariants);
    };

    if (loading) {
         return <div className="min-h-screen bg-[#131313] text-[#ffd700] flex items-center justify-center font-manrope">Loading product...</div>
    }

    if (!productDets) {
        return <div className="min-h-screen bg-[#131313] text-[#ffb4ab] flex items-center justify-center font-manrope">Product not found.</div>
    }

    return (
        <div className="min-h-screen flex flex-col bg-[#131313] text-[#e5e2e1] font-manrope selection:bg-[#ffd700] selection:text-[#3a3000]">
            
            {/* ── Navbar ── */}
            <nav className="shrink-0 flex items-center justify-between px-6 lg:px-8 py-4 border-b border-[#4D4732]/20 mb-8 md:mb-12">
                <div className="flex items-center gap-3">
                    <Link
                        to="/"
                        className="text-xl font-bold tracking-[-0.04em] text-[#E5E2E1] hover:text-[#999077] transition-colors duration-200"
                    >
                        snitch<span className="text-[#FFD700]">.</span>
                    </Link>
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

            <div className="max-w-4xl w-full mx-auto flex flex-col gap-12 px-4 md:px-8 pb-32">
                {/* Product Area Header */}
                <div className="flex flex-col md:flex-row gap-10 bg-[#1c1b1b] p-8 md:p-12 rounded-2xl shadow-xl border border-[#2a2a2a]/60">
                    {/* Active Image */}
                    <div className="w-full md:w-1/2 flex flex-col gap-6">
                        <div className="w-full aspect-square bg-[#0e0e0e] rounded-xl overflow-hidden border border-[#2a2a2a]">
                            {activeImage ? (
                                <img src={activeImage} alt="Main product" className="w-full h-full object-cover transition-all" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-[#4d4732]">No Preview</div>
                            )}
                        </div>
                        {/* Image Gallery */}
                        {productDets.images?.length > 0 && (
                            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin">
                                {productDets.images.map((img, i) => (
                                    <img 
                                        key={i} 
                                        src={img.url} 
                                        alt={`Product ${i}`} 
                                        className={`h-20 w-20 object-cover rounded-xl cursor-pointer transition-all border-2 ${activeImage === img.url ? 'border-[#ffd700] p-0.5' : 'border-transparent opacity-60 hover:opacity-100 p-0.5'}`}
                                        onClick={() => setActiveImage(img.url)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Details Info */}
                    <div className="w-full md:w-1/2 flex flex-col gap-4">
                        <div className="mb-2">
                            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-2 leading-tight">{productDets.title}</h1>
                            <p className="text-[#ffd700] text-2xl font-medium tracking-wide">
                                {productDets.price?.currency} {productDets.price?.amount}
                            </p>
                        </div>
                        <div className="w-12 h-0.5 bg-[#4d4732]"></div>
                        <p className="text-[#d0c6ab] text-lg leading-relaxed">{productDets.description}</p>
                    </div>
                </div>

                {/* Sub Action Area */}
                <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between md:items-end border-b border-[#2a2a2a] pb-6">
                    <h2 className="text-3xl font-bold tracking-tight text-center md:text-left">Variants</h2>
                    {!showForm && (
                        <button 
                            onClick={() => {
                                resetForm();
                                setShowForm(true);
                                setTimeout(() => {
                                    document.getElementById("variant-form-section")?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                }, 100);
                            }}
                            className="px-6 py-3 bg-[#e9c400] text-[#3a3000] rounded-full font-bold text-sm tracking-widest shadow-lg hover:shadow-xl hover:bg-[#ffd700] transition flex items-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4"></path></svg>
                            CREATE VARIANT
                        </button>
                    )}
                </div>

                {/* Form Selection (Conditionally rendered) */}
                {showForm && (
                    <div id="variant-form-section" className="bg-[#1c1b1b] rounded-2xl p-6 md:p-8 border border-[#4d4732]/40 relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#e9c400] to-[#ffd700]" />
                        <h2 className="text-xl font-bold mb-6">
                            {isEditing ? "Edit Variant Details" : "Create New Variant"}
                        </h2>

                        <form onSubmit={handleSubmitVariant} className="flex flex-col gap-6 ">
                            
                            <div className="flex flex-col md:flex-row gap-8">
                                {/* Left Side: Media Upload */}
                                <div className="w-full md:w-[40%] flex flex-col gap-3">
                                    <div className="flex items-center justify-between mb-1">
                                        <label className="text-xs uppercase tracking-widest text-[#d0c6ab] font-inter">Images (Max 7)</label>
                                        <span className="text-xs text-[#999077]">{formImages.length}/7</span>
                                    </div>
                                    
                                    <input 
                                        type="file" 
                                        multiple 
                                        accept="image/*" 
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                    {formImages.length < 7 && (
                                        <div 
                                            onClick={() => fileInputRef.current.click()}
                                            onDragOver={handleDragOver}
                                            onDragLeave={handleDragLeave}
                                            onDrop={handleDrop}
                                            className={`w-full aspect-video border border-dashed rounded-xl p-4 flex flex-col justify-center items-center gap-3 cursor-pointer transition-all duration-300 ${isDragging ? 'border-[#ffd700] bg-[#ffd700]/5 text-[#ffd700]' : 'border-[#4d4732] bg-[#131313] text-[#999077] hover:border-[#ffd700] hover:text-[#ffd700]'}`}
                                        >
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                                            <span className="text-sm font-medium tracking-wide">{isDragging ? 'Drop images here' : 'Drop imagery or click here'}</span>
                                        </div>
                                    )}

                                    {formImages.length > 0 && (
                                        <div className="grid grid-cols-4 gap-3 mt-4">
                                            {formImages.map((img, i) => (
                                                <div key={i} className="relative group aspect-square">
                                                    <img src={img.previewUrl} className="w-full h-full object-cover rounded-lg border border-[#353534]" alt="preview" />
                                                    <button 
                                                        type="button"
                                                        onClick={() => removeFormImage(i)}
                                                        className="absolute -top-2 -right-2 bg-[#93000a] text-[#ffdad6] rounded-full p-1 opacity-0 group-hover:opacity-100 transition shadow-lg"
                                                    >
                                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Right Side: Specification Inputs */}
                                <div className="w-full md:w-[60%] flex flex-col gap-8">
                                    
                                    {/* Dynamic Attributes */}
                                    <div className="flex flex-col gap-4">
                                        <label className="text-xs uppercase tracking-widest text-[#d0c6ab] font-inter">Specifications *</label>
                                        <div className="flex flex-col gap-3">
                                            {formAttributes.map((attr, i) => (
                                                <div key={i} className="flex gap-4 items-start">
                                                    <input 
                                                        type="text" 
                                                        placeholder="Key (e.g. Size, Type)"
                                                        value={attr.key}
                                                        onChange={(e) => handleAttributeChange(i, 'key', e.target.value)}
                                                        className="flex-1 bg-[#131313] border-b border-[#4d4732]/40 p-3 text-sm focus:outline-none focus:border-[#ffd700] transition-colors rounded-none placeholder:text-[#4d4732]"
                                                    />
                                                    <input 
                                                        type="text" 
                                                        placeholder="Value (e.g. L, Red, Linen)"
                                                        value={attr.value}
                                                        onChange={(e) => handleAttributeChange(i, 'value', e.target.value)}
                                                        className="flex-1 bg-[#131313] border-b border-[#4d4732]/40 p-3 text-sm focus:outline-none focus:border-[#ffd700] transition-colors rounded-none placeholder:text-[#4d4732]"
                                                    />
                                                    {formAttributes.length > 1 && (
                                                        <button 
                                                            type="button" 
                                                            onClick={() => removeAttribute(i)}
                                                            className="p-3 text-[#544601] hover:text-[#ffb4ab] transition"
                                                        >
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                                        </button>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                        <button 
                                            type="button" 
                                            onClick={handleAddAttribute}
                                            className="self-start text-[#ffd700] text-sm flex items-center gap-1.5 hover:underline mt-1 font-medium tracking-wide"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                                            Add Another Specification
                                        </button>
                                    </div>

                                    {/* Metrics Data */}
                                    <div className="flex flex-col sm:flex-row gap-8">
                                        <div className="flex-1 flex flex-col gap-2">
                                            <label className="text-xs uppercase tracking-widest text-[#d0c6ab] font-inter">Inventory Stock</label>
                                            <input 
                                                type="number" 
                                                min="0"
                                                value={formStock}
                                                onChange={e => setFormStock(e.target.value)}
                                                className="bg-[#131313] border-b border-[#4d4732]/40 p-3 text-lg focus:outline-none focus:border-[#ffd700] transition-colors"
                                            />
                                        </div>

                                        <div className="flex-1 flex flex-col gap-2 min-w-0">
                                            <label className="text-xs uppercase tracking-widest text-[#d0c6ab] font-inter">Price Override (Optional)</label>
                                            <div className="flex bg-[#131313] border-b border-[#4d4732]/40 focus-within:border-[#ffd700] transition-colors overflow-hidden relative">
                                                <select 
                                                    value={formCurrency}
                                                    onChange={e => setFormCurrency(e.target.value)}
                                                    className="bg-transparent text-[#d0c6ab] tracking-widest text-sm p-3 border-r border-[#4d4732]/20 outline-none cursor-pointer flex-shrink-0 appearance-none pr-8"
                                                >
                                                    <option value="INR">INR</option>
                                                    <option value="USD">USD</option>
                                                    <option value="EUR">EUR</option>
                                                    <option value="GBP">GBP</option>
                                                    <option value="JPY">JPY</option>
                                                </select>
                                                {/* Custom Select Arrow */}
                                                <div className="pointer-events-none absolute left-14 top-1/2 -translate-y-1/2 text-[#4d4732] group-hover:text-[#999077] transition-colors ml-1">
                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                                </div>

                                                <input 
                                                    type="number" 
                                                    min="0"
                                                    placeholder="Use base price"
                                                    value={formPrice}
                                                    onChange={e => setFormPrice(e.target.value)}
                                                    className="flex-1 min-w-0 bg-transparent p-3 text-lg focus:outline-none placeholder:text-[#4d4732]"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Actions Set */}
                            <div className="flex flex-col-reverse sm:flex-row gap-4 sm:gap-6 mt-4 pt-8 border-t border-[#2a2a2a] sm:justify-end">
                                <button 
                                    type="button" 
                                    onClick={resetForm}
                                    className="w-full sm:w-auto px-6 sm:px-8 py-3 text-sm font-bold tracking-widest uppercase rounded-full border border-[#4d4732] text-[#e5e2e1] hover:bg-[#2a2a2a] hover:text-white transition focus:outline-none"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit"
                                    className="w-full sm:w-auto px-6 sm:px-10 py-3 bg-gradient-to-br from-[#e9c400] to-[#ffd700] text-[#3a3000] rounded-full font-bold uppercase tracking-widest text-sm shadow-[0_4px_14px_rgba(255,215,0,0.2)] hover:shadow-[0_6px_20px_rgba(255,215,0,0.3)] transition focus:outline-none text-center"
                                >
                                    {isEditing ? "Save Configuration" : "Publish Variant"}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Variants List Expanded */}
                <div className="flex flex-col gap-6">
                    {variants.length === 0 ? (
                        <div className="bg-[#1c1b1b] rounded-2xl p-16 flex flex-col items-center justify-center text-[#999077] border border-[#2a2a2a] shadow-inner">
                            <svg className="w-16 h-16 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
                            <p className="text-xl">No configurations created.</p>
                            <p className="mt-2 text-sm text-[#4d4732]">Expand your product offering by making variants.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {variants.map((v, idx) => (
                                <div key={idx} className={`bg-[#1c1b1b] rounded-2xl p-6 border transition flex flex-col gap-6 shadow-md relative group ${editIndex === idx ? 'border-[#ffd700] shadow-[0_4px_24px_rgba(255,215,0,0.1)]' : 'border-[#2a2a2a] hover:border-[#4d4732]/60'}`}>
                                    
                                    <div className="absolute top-5 right-5 flex gap-2">
                                        <button 
                                            onClick={() => handleEditVariant(idx)}
                                            className="p-2.5 text-[#d0c6ab] hover:text-[#ffd700] transition bg-[#131313] hover:bg-[#0e0e0e] rounded-full border border-[#2a2a2a] shadow-sm"
                                            title="Edit Config"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                                        </button>
                                        <button 
                                            onClick={() => handleDeleteVariant(idx)}
                                            className="p-2.5 text-[#d0c6ab] hover:text-[#ffb4ab] transition bg-[#131313] hover:bg-[#0e0e0e] rounded-full border border-[#2a2a2a] shadow-sm"
                                            title="Delete Config"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                        </button>
                                    </div>

                                    {/* Content Wrapping */}
                                    <div className="flex gap-6">
                                        {/* Main Media */}
                                        <div className="w-28 h-36 bg-[#0e0e0e] rounded-xl overflow-hidden shrink-0 border border-[#2a2a2a]">
                                            {v.images && v.images.length > 0 ? (
                                                <img src={v.images[0].url} className="w-full h-full object-cover" alt="Variant Media" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-[#353534]">
                                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex flex-col gap-4 flex-1 pt-2">
                                            {/* Details mapped directly */}
                                            <div className="flex flex-col gap-3">
                                                <div className="text-xl font-medium tracking-wide">
                                                    {v.price ? `${v.price.currency} ${v.price.amount}` : <span className="text-[#999077] italic text-sm">Follows Base Price</span>}
                                                </div>
                                                
                                                <div className="flex flex-wrap gap-2">
                                                    {v.attributes && Object.entries(v.attributes).map(([key, value]) => (
                                                        <span key={key} className="bg-[#2a2a2a] px-3 py-1.5 rounded-md text-sm text-[#e5e2e1] font-medium border border-[#353534]">
                                                            <span className="text-[#999077] mr-1.5">{key}:</span>{value}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="border-t border-[#2a2a2a] my-1"></div>

                                            {/* Stock Manager Native Line */}
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm tracking-widest uppercase font-inter text-[#999077]">Inventory</span>
                                                <div className="flex items-center bg-[#0e0e0e] rounded-full border border-[#353534] overflow-hidden p-0.5">
                                                    <button 
                                                        onClick={() => handleStockAdjustment(idx, -1)}
                                                        className="px-3 py-1.5 text-[#e5e2e1] hover:bg-[#2a2a2a] hover:text-[#ffb4ab] rounded-l-full transition focus:outline-none"
                                                    >
                                                        &minus;
                                                    </button>
                                                    <span className="px-4 py-1 font-mono text-base font-bold min-w-[3rem] text-center select-none text-[#e5e2e1] bg-transparent">
                                                        {v.stock || 0}
                                                    </span>
                                                    <button 
                                                        onClick={() => handleStockAdjustment(idx, 1)}
                                                        className="px-3 py-1.5 text-[#e5e2e1] hover:bg-[#2a2a2a] hover:text-[#ffd700] rounded-r-full transition focus:outline-none"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}

export default SellerProductDetails;