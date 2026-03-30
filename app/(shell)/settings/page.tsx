"use client";

export default function SettingsPage() {
    return (
        <div className="min-h-screen bg-black text-text-primary p-4 md:p-8">
            <div className="max-w-3xl mx-auto relative">
                {/* Header Section */}
                <div className="flex items-center justify-between mb-12">
                    <div className="flex-1" /> {/* Spacer */}
                    <h1 className="text-2xl font-bold text-center flex-1">Edit profile</h1>
                    <div className="flex-1 flex justify-end">
                        <button className="px-5 py-2 bg-zinc-800 text-zinc-500 rounded-xl font-bold text-sm cursor-not-allowed">
                            Save changes
                        </button>
                    </div>
                </div>

                {/* Profile Media Section */}
                <div className="relative mb-12">
                    <div className="w-full h-48 bg-zinc-900 rounded-3xl" />
                    <div className="absolute -bottom-6 left-8">
                        <div className="w-24 h-24 rounded-full bg-orange-600 border-4 border-black relative overflow-hidden group">
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 transition-opacity">
                                <span className="text-[10px] font-bold text-text-primary uppercase tracking-wider">Avatar</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-8 mt-12">
                    <div className="space-y-2">
                        <div className="flex justify-between items-end px-1">
                            <label className="text-[13px] font-bold text-zinc-500 uppercase tracking-wider">Name</label>
                            <span className="text-[10px] text-zinc-600">4/100</span>
                        </div>
                        <input
                            type="text"
                            defaultValue="shiv"
                            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl px-5 py-4 focus:outline-none focus:ring-1 focus:ring-zinc-700 transition-all font-medium"
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-end px-1">
                            <label className="text-[13px] font-bold text-zinc-500 uppercase tracking-wider">Username</label>
                            <span className="text-[10px] text-zinc-600">8/42</span>
                        </div>
                        <input
                            type="text"
                            defaultValue="shivag04"
                            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl px-5 py-4 focus:outline-none focus:ring-1 focus:ring-zinc-700 transition-all font-medium"
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-end px-1">
                            <label className="text-[13px] font-bold text-zinc-500 uppercase tracking-wider">Bio</label>
                            <span className="text-[10px] text-zinc-600">0/200</span>
                        </div>
                        <textarea
                            rows={4}
                            placeholder="No bio"
                            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl px-5 py-4 focus:outline-none focus:ring-1 focus:ring-zinc-700 transition-all font-medium resize-none"
                        />
                    </div>
                </div>

                {/* More Details Section */}
                <div className="mt-16 pt-8 border-t border-zinc-900">
                    <h2 className="text-xl font-bold mb-1">More details</h2>
                    <p className="text-sm text-zinc-500 mb-8">Choose what appears on your profile and other discovery surfaces.</p>

                    <div className="space-y-6">
                        {[
                            { label: "Total earned", icon: "💰" },
                            { label: "Location", icon: "📍" },
                            { label: "Owned whops", icon: "🏠" },
                            { label: "Joined whops", icon: "👥" },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-zinc-900 rounded-lg text-zinc-400">
                                        {/* Placeholder for Lucide icons */}
                                        <span className="text-sm">{item.icon}</span>
                                    </div>
                                    <span className="font-bold">{item.label}</span>
                                </div>
                                <div className="w-10 h-5 bg-blue-600 rounded-full relative">
                                    <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Social Links Section */}
                <div className="mt-16 pt-8 border-t border-zinc-900 pb-20">
                    <h2 className="text-xl font-bold mb-1">Social links</h2>
                    <p className="text-sm text-zinc-500 mb-8">Connect your other accounts to let people know where to find you.</p>

                    <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-zinc-400">Add:</span>
                        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                            <div key={i} className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 cursor-pointer hover:bg-zinc-800 transition-colors" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
