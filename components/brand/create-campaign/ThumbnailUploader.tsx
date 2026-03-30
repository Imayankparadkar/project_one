import React, { useState, useRef } from "react";
import { Upload, FileText, Video as VideoIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThumbnailUploaderProps {
    previewUrl?: string;
    onFileSelect: (url: string) => void;
    accept?: string;
    helperText?: string;
    fileType?: "Image" | "Video" | "Doc" | "Text" | string;
}

export default function ThumbnailUploader({ previewUrl, onFileSelect, accept, helperText, fileType }: ThumbnailUploaderProps) {
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFile = (file: File) => {
        const url = URL.createObjectURL(file);
        onFileSelect(url);
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    return (
        <div className="space-y-2">
            <div
                className={cn(
                    "group relative border-2 border-(--color-border-input) rounded-xl h-36 flex flex-col items-center justify-center text-(--color-text-muted) transition-all cursor-pointer overflow-hidden"
                )}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    onChange={handleChange}
                    accept={accept || "image/png, image/jpeg"}
                />

                {previewUrl ? (
                    <div className="relative w-full h-full flex flex-col items-center justify-center bg-(--color-bg-secondary)">
                        {(!fileType || fileType === "Image") ? (
                            <img src={previewUrl} alt="Thumbnail Preview" className="w-full h-full object-cover absolute inset-0" />
                        ) : fileType === "Video" ? (
                            <VideoIcon className="w-10 h-10 text-indigo-500 mb-2 z-10" />
                        ) : (
                            <FileText className="w-10 h-10 text-indigo-500 mb-2 z-10" />
                        )}
                        
                        {(fileType && fileType !== "Image") && (
                            <span className="text-xs font-semibold text-(--color-text-primary) z-10 w-full truncate px-4 text-center">
                                File Attached
                            </span>
                        )}

                        <div className={`absolute inset-0 ${(!fileType || fileType === "Image") ? "bg-black/60" : "bg-black/10"} flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20`}>
                            <Upload className={`w-6 h-6 ${(!fileType || fileType === "Image") ? "text-white" : "text-(--color-text-primary)"} mb-2`} />
                            <span className={`text-xs font-medium ${(!fileType || fileType === "Image") ? "text-white" : "text-(--color-text-primary)"}`}>Click to change</span>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="p-3 rounded-full mb-2 transition-transform">
                            <Upload className="w-5 h-5 text-(--color-text-secondary) transition-color" />
                        </div>
                        <span className="text-xs font-medium text-(--color-text-secondary) transition-colors">
                            Upload or drag and drop
                        </span>
                        <span className="text-[10px] text-(--color-text-muted) mt-1">
                            {helperText || "PNG or JPG only"}
                        </span>
                    </>
                )}
            </div>
        </div>
    );
}