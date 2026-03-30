"use client";

import React, { useState } from "react";
import { X, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

interface SubmitContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaignTitle?: string;
  onSubmitSuccess?: () => void;
}

export default function SubmitContentModal({ 
  isOpen, 
  onClose, 
  campaignTitle = "Campaign",
  onSubmitSuccess 
}: SubmitContentModalProps) {
  const [contentUrl, setContentUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!contentUrl.trim()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Call success callback
    if (onSubmitSuccess) {
      onSubmitSuccess();
    }
    
    setIsSubmitting(false);
    setContentUrl("");
    onClose();
    
    // Show success message or redirect
    // You can add a toast notification here
  };

  const handleViewSubmissions = () => {
    router.push("/joined/my-submissions");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-card border border-border rounded-2xl shadow-2xl w-full max-w-2xl p-6 sm:p-8 animate-in fade-in zoom-in duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-muted rounded-lg transition-colors"
        >
          <X size={24} className="text-muted-foreground hover:text-foreground" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            Submit Your Content
          </h2>
          {campaignTitle && (
            <p className="text-sm text-muted-foreground">
              for {campaignTitle}
            </p>
          )}
        </div>

        {/* URL Input */}
        <div className="mb-6">
          <input
            type="url"
            placeholder="Paste your content URL here..."
            value={contentUrl}
            onChange={(e) => setContentUrl(e.target.value)}
            className="w-full h-16 px-6 bg-background border-2 border-red-500/50 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-red-500 transition-colors text-lg"
          />
        </div>

        {/* Info Message */}
        <div className="flex items-start gap-3 mb-8 p-4 bg-muted/30 border border-border rounded-xl">
          <AlertCircle size={20} className="text-muted-foreground flex-shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground leading-relaxed">
            Views after submission count toward earnings, submit as soon as you post.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          <button
            onClick={handleViewSubmissions}
            className="px-6 py-3 bg-muted hover:bg-muted/80 text-foreground rounded-xl font-semibold transition-colors order-2 sm:order-1"
          >
            Your Submissions
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3 bg-muted hover:bg-muted/80 text-foreground rounded-xl font-semibold transition-colors order-3 sm:order-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!contentUrl.trim() || isSubmitting}
            className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-muted disabled:to-muted disabled:cursor-not-allowed text-text-primary rounded-xl font-bold transition-all shadow-lg hover:shadow-xl disabled:shadow-none order-1 sm:order-3"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}
