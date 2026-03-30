import React, { useState } from "react";
import { ChevronDown, Plus, X, Pencil, GripVertical, Check } from "lucide-react";
import { CampaignFormData } from "../types";
import ThumbnailUploader from "../ThumbnailUploader";

interface Step5SettingsProps {
    formData: CampaignFormData;
    setFormData: React.Dispatch<React.SetStateAction<CampaignFormData>>;
}

export default function Step5Settings({ formData, setFormData }: Step5SettingsProps) {
    const [isAddingQuestion, setIsAddingQuestion] = useState(false);

    // Local state for the new question form
    const [newQuestion, setNewQuestion] = useState({
        text: "",
        type: "Text",
        required: false,
        fileUrl: ""
    });

    // Styles
    const inputClass = "w-full rounded-lg border border-(--color-border-input) bg-(--color-bg-input) bg-yellow-radial px-3 py-2 text-sm leading-5 tracking-[0.14px] text-(--color-text-primary) placeholder-(--color-text-muted) outline-none transition-all focus:border-(--color-border-input-foc) focus:ring-1 focus:ring-(--color-border-input-foc)";

    // --- HELPER FUNCTIONS ---

    const handleAddQuestion = () => {
        if (!newQuestion.text.trim()) return;

        const questionObj = {
            id: Date.now().toString(), // Simple ID
            ...newQuestion
        };

        // We assume formData has an 'applicationQuestions' array. 
        // If not defined in types yet, we fallback to empty array.
        const currentQuestions = (formData as any).applicationQuestions || [];

        setFormData({
            ...formData,
            applicationQuestions: [...currentQuestions, questionObj]
        } as any);

        setNewQuestion({ text: "", type: "Text", required: false, fileUrl: "" });
        setIsAddingQuestion(false);
    };

    const removeQuestion = (idx: number) => {
        const currentQuestions = (formData as any).applicationQuestions || [];
        const updated = currentQuestions.filter((_: any, i: number) => i !== idx);
        setFormData({ ...formData, applicationQuestions: updated } as any);
    };

    const ToggleItem = ({ label, desc, checked, onChange }: { label: string, desc: string, checked: boolean, onChange: () => void }) => (
        <div className="flex items-center justify-between py-2">
            <div className="space-y-0.5">
                <label className="text-sm font-semibold text-(--color-text-primary)">{label}</label>
                <p className="text-xs text-(--color-text-secondary) max-w-[280px]">{desc}</p>
            </div>
            <button
                onClick={onChange}
                className={`relative border w-11 h-6 rounded-full transition-colors shrink-0 ${checked ? "bg-(--color-bg-input) border-(--color-border-input-foc)" : "border-(--color-border)"}`}
            >
                <span className={`absolute top-1 left-1 bg-(--color-input-toggle-button) w-4 h-4 rounded-full transition-transform ${checked ? "translate-x-5" : "translate-x-0"}`} />
            </button>
        </div>
    );

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">

            {/* 1. REQUIRE APPLICATION SECTION */}
            <div className="space-y-4">
                <ToggleItem
                    label="Require Application"
                    desc="Require creators to apply before submitting content"
                    checked={formData.requireApplication}
                    onChange={() => setFormData({ ...formData, requireApplication: !formData.requireApplication })}
                />

                {/* Conditional Questions Area */}
                {formData.requireApplication && (
                    <div className="space-y-3 animate-in slide-in-from-top-2 fade-in duration-200">

                        {/* List of Added Questions */}
                        {((formData as any).applicationQuestions || []).map((q: any, idx: number) => (
                            <div key={idx} className="group relative bg-(--color-bg-card) border border-white/10 rounded-xl p-4 flex items-start gap-3">
                                <div className="mt-1 text-zinc-600 cursor-grab active:cursor-grabbing">
                                    <GripVertical className="w-4 h-4" />
                                </div>
                                <div className="flex-1 space-y-1">
                                    <div className="flex items-center gap-2">
                                        <h4 className="text-sm font-bold text-(--color-text-primary)">{q.text}</h4>
                                        <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-(--color-bg-input) text-[#FFB900] border border-(--color-border-input-foc)">
                                            {q.type}
                                        </span>
                                    </div>
                                    {q.fileUrl && (
                                        <div className="text-xs text-blue-400 mt-1 truncate max-w-[200px]">
                                            <a href={q.fileUrl} target="_blank" rel="noopener noreferrer">View Attached File</a>
                                        </div>
                                    )}
                                    {q.required && (
                                        <div className="flex items-center gap-1.5 text-xs text-(--color-text-secondary)">
                                            <div className="w-3.5 h-3.5 rounded-full bg-(--color-bg-input) flex items-center justify-center border border-(--color-border-input-foc)">
                                                <Check className="w-3 h-3 text-(--color-text-primary)" />
                                            </div>
                                            Required
                                        </div>
                                    )}
                                </div>
                                <div className="flex gap-2">
                                    <button className="p-1.5 text-zinc-500 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                                        <Pencil className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                        onClick={() => removeQuestion(idx)}
                                        className="p-1.5 text-zinc-500 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                                    >
                                        <X className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        ))}

                        {/* Add Question Form or Button */}
                        {isAddingQuestion ? (
                            <div className="bg-(--color-bg-card) border border-white/10 rounded-xl p-5 space-y-4 animate-in zoom-in-95 duration-200">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-(--color-text-secondary)">Question {((formData as any).applicationQuestions?.length || 0) + 1}</label>
                                    <input
                                        type="text"
                                        value={newQuestion.text}
                                        onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })}
                                        className={inputClass}
                                        placeholder="Enter question"
                                        autoFocus
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-(--color-text-secondary)">Question Type</label>
                                    <div className="relative">
                                        <select
                                            value={newQuestion.type}
                                            onChange={(e) => setNewQuestion({ ...newQuestion, type: e.target.value })}
                                            className={`${inputClass} appearance-none cursor-pointer`}
                                        >
                                            <option value="Text">Text</option>
                                            <option value="Image">Image</option>
                                            <option value="Video">Video</option>
                                            <option value="Doc">Doc</option>
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
                                    </div>
                                    <p className="text-[11px] text-(--color-text-secondary)">
                                        {newQuestion.type === "Text" ? "Free text input" : `Upload a ${newQuestion.type.toLowerCase()} file`}
                                    </p>
                                </div>

                                {newQuestion.type !== "Text" && (
                                    <div className="space-y-1.5 pt-2 animate-in fade-in slide-in-from-top-2">
                                        <label className="text-xs font-bold text-(--color-text-secondary)">Reference File (Optional)</label>
                                        <ThumbnailUploader 
                                            previewUrl={newQuestion.fileUrl}
                                            onFileSelect={(url) => setNewQuestion({ ...newQuestion, fileUrl: url })}
                                            fileType={newQuestion.type}
                                            accept={
                                                newQuestion.type === "Video" ? "video/mp4, video/quicktime, video/x-msvideo" :
                                                newQuestion.type === "Doc" ? ".pdf,.doc,.docx,.txt" :
                                                "image/png, image/jpeg"
                                            }
                                            helperText={
                                                newQuestion.type === "Video" ? "MP4, MOV, or AVI only" :
                                                newQuestion.type === "Doc" ? "PDF, DOC, DOCX, TXT only" :
                                                "PNG or JPG only"
                                            }
                                        />
                                    </div>
                                )}

                                <div className="flex items-center gap-2 py-1">
                                    <button
                                        onClick={() => setNewQuestion({ ...newQuestion, required: !newQuestion.required })}
                                        className={`w-4 h-4 rounded border flex items-center justify-center transition-all bg-(--color-bg-input) border-(--color-border-input-foc)`}
                                    >
                                        {newQuestion.required && <Check className="w-3 h-3 text-black" />}
                                    </button>
                                    <label onClick={() => setNewQuestion({ ...newQuestion, required: !newQuestion.required })} className="text-sm font-medium text-(--color-text-secondary) cursor-pointer select-none">
                                        Is required
                                    </label>
                                </div>

                                <div className="flex justify-end gap-2 mt-2">
                                    <button onClick={() => setIsAddingQuestion(false)} className="px-3 py-1.5 text-xs font-medium text-(--color-text-muted) hover:text-(--color-text-secondary) transition-colors">Cancel</button>
                                    <button onClick={handleAddQuestion} className="px-4 py-2 rounded-lg bg-(--color-bg-input-foc) border border-(--color-border-input-foc) text-(--color-text-primary) text-sm font-medium hover:bg-(--color-bg-input) transition-colors py-1.5 text-xs shrink-0">Add Question</button>
                                </div>
                            </div>
                        ) : (
                            <button
                                onClick={() => setIsAddingQuestion(true)}
                                className="w-full py-3 rounded-xl border border-dashed border-(--color-border-input) bg-(--color-bg-input) text-(--color-text-secondary) text-sm font-medium hover:cursor-pointer transition-all flex items-center justify-center gap-2"
                            >
                                <Plus className="w-4 h-4" /> Add question
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}