"use client";

import React, { useState, useRef } from "react";
import { X, Image as ImageIcon } from "lucide-react";

interface EditBrandingModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialName: string;
    initialImage: string;
    onSave: (name: string, image: string) => void;
}

export default function EditBrandingModal({
    isOpen,
    onClose,
    initialName,
    initialImage,
    onSave
}: EditBrandingModalProps) {
    const [name, setName] = useState(initialName);
    const [imagePreview, setImagePreview] = useState(initialImage);
    const fileInputRef = useRef<HTMLInputElement>(null);

    if (!isOpen) return null;

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setImagePreview(url);
        }
    };

    return (
        <div
            className="fixed inset-0 z-100 flex items-center justify-center bg-(--color-bg-overlay) backdrop-blur-sm p-4 animate-in fade-in duration-200"
            onClick={onClose}
        >
            <div
                className="w-full max-w-md bg-(--color-bg-secondary) border border-(--color-border) rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-center p-6 pb-4 border-b border-(--color-border-subtle)">
                    <h2 className="text-xl font-bold text-(--color-text-primary)">Edit branding</h2>
                    <button onClick={onClose} className="text-(--color-text-secondary) hover:text-(--color-text-primary) transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-6">
                    {/* Section: Logo & Name */}
                    <div className="flex gap-4 items-center">
                        <div className="w-16 h-16 rounded-xl overflow-hidden border border-(--color-border) shrink-0">
                            <img src={imagePreview} alt="Logo" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 space-y-2">
                            <label className="text-sm font-medium text-(--color-text-secondary)">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-(--color-bg-tertiary) border border-(--color-border) rounded-lg px-4 py-2 text-(--color-text-primary) focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
                            />
                        </div>
                    </div>

                    {/* Section: Banner Image Upload */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-(--color-text-secondary)">Banner image</label>
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="group border border-dashed border-(--color-border) hover:border-orange-500/50 bg-(--color-bg-tertiary) rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-colors"
                        >
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageUpload}
                            />

                            <div className="flex gap-2 mb-4 opacity-50 group-hover:opacity-100 transition-opacity">
                                <div className="w-10 h-12 bg-(--color-icon-bg) rounded-lg border border-(--color-border) rotate-[-10deg] flex items-center justify-center">
                                    <ImageIcon className="w-5 h-5 text-(--color-text-secondary)" />
                                </div>
                                <div className="w-10 h-12 bg-(--color-surface-hover) rounded-lg border border-(--color-border) rotate-[5deg] z-10 flex items-center justify-center">
                                    <ImageIcon className="w-5 h-5 text-(--color-text-primary)" />
                                </div>
                            </div>

                            <p className="text-(--color-text-secondary) font-medium text-sm">
                                Drag an image here or <span className="text-blue-400 underline decoration-blue-400/50">upload a file</span>
                            </p>
                            <p className="text-(--color-text-muted) text-xs mt-2">Recommended ratio: 16:9</p>
                        </div>
                    </div>

                    {/* Save Button */}
                    <button
                        onClick={() => {
                            onSave(name, imagePreview);
                            onClose();
                        }}
                        className="w-full py-3 bg-(--color-bg-tertiary) hover:bg-(--color-surface-elevated) text-(--color-text-primary) rounded-xl font-medium transition-colors"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}