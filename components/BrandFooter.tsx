// export default function BrandFooter() {
//     return (
//         <section className="bg-gradient-to-b from-page-bg to-page-surface-alt border-t border-page-border">
//             {/* Top CTA area (Kofluence style) */}
//             <div className="w-full max-w-[1480px] mx-auto px-4 sm:px-8 py-32 text-center relative overflow-hidden">
//                 {/* subtle background pattern to match Kofluence's doodle bg */}
//                 <div className="absolute inset-0 opacity-5 bg-[url('https://images.unsplash.com/photo-1614850715649-1d0106293cb1?q=80&w=2670&auto=format&fit=crop')] bg-cover mix-blend-overlay pointer-events-none"></div>

//                 <div className="relative z-10 flex flex-col items-center">
//                     <h2 className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight text-text-primary mb-8">
//                         Think Influence, Think <span className="text-brand-neon">Bennybucks</span>
//                     </h2>
//                     <p className="text-xl md:text-2xl font-medium text-text-primary/80 max-w-4xl mx-auto leading-relaxed mb-12">
//                         Get the traffic to your website, social media, build brand awareness, and do much more to grow your business by unlocking social influence with Bennybucks.
//                     </p>
//                     <button className="rounded-full bg-brand-red hover:bg-[#c1121f] text-text-primary text-lg font-bold px-10 py-4 transition-colors">
//                         Request Demo
//                     </button>
//                 </div>
//             </div>

//             {/* 6-Column Links Footer */}
//             <div className="w-full max-w-[1480px] mx-auto px-4 sm:px-8 py-16 border-t border-page-border">
//                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr_2.5fr] gap-x-8 gap-y-16">

//                     {/* Col 1: Logo and Trust badges */}
//                     <div className="col-span-2 md:col-span-3 lg:col-span-1 flex flex-col gap-10">
//                         <div className="flex items-center gap-3">
//                             <svg width="40" height="40" viewBox="0 0 28 28" fill="none">
//                                 <path d="M4 6l4 12 6-8 6 8 4-12" stroke="#ccff00" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
//                             </svg>
//                             <span className="text-2xl font-black text-text-primary tracking-tight">Bennybucks</span>
//                         </div>

//                         <div className="flex flex-wrap gap-6 text-text-primary/50 text-xs font-semibold">
//                             <div className="flex items-center gap-2">
//                                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
//                                 Google<br />Secured
//                             </div>
//                             <div className="flex items-center gap-2">
//                                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
//                                 Facebook<br />Secured
//                             </div>
//                             <div className="flex items-center gap-2 w-full mt-2">
//                                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
//                                 ISO<br />Certified
//                             </div>
//                         </div>
//                     </div>

//                     {/* Col 2: Company */}
//                     <div className="flex flex-col gap-5">
//                         <h3 className="text-text-primary font-bold text-lg mb-2">Company</h3>
//                         <a href="#" className="text-text-primary/60 hover:text-text-primary transition-colors text-sm font-medium">About</a>
//                         <a href="#" className="text-text-primary/60 hover:text-text-primary transition-colors text-sm font-medium">Career</a>
//                         <a href="#" className="text-text-primary/60 hover:text-text-primary transition-colors text-sm font-medium">Contact</a>
//                     </div>

//                     {/* Col 3: Product */}
//                     <div className="flex flex-col gap-5">
//                         <h3 className="text-text-primary font-bold text-lg mb-2">Product</h3>
//                         <a href="#" className="text-text-primary/60 hover:text-text-primary transition-colors text-sm font-medium">Creator</a>
//                         <a href="/brand-campaign" className="text-text-primary/60 hover:text-text-primary transition-colors text-sm font-medium">Brand</a>
//                     </div>

//                     {/* Col 4: Resources */}
//                     <div className="flex flex-col gap-5">
//                         <h3 className="text-text-primary font-bold text-lg mb-2">Resources</h3>
//                         <a href="#" className="text-text-primary/60 hover:text-text-primary transition-colors text-sm font-medium">Blog</a>
//                         <a href="#" className="text-text-primary/60 hover:text-text-primary transition-colors text-sm font-medium">Case Studies</a>
//                         <a href="#" className="text-text-primary/60 hover:text-text-primary transition-colors text-sm font-medium">Request Demo</a>
//                         <a href="#" className="text-text-primary/60 hover:text-text-primary transition-colors text-sm font-medium">FAQs</a>
//                     </div>

//                     {/* Col 5: Privacy */}
//                     <div className="flex flex-col gap-5">
//                         <h3 className="text-text-primary font-bold text-lg mb-2">Privacy</h3>
//                         <a href="#" className="text-text-primary/60 hover:text-text-primary transition-colors text-sm font-medium">Privacy Policy</a>
//                         <a href="#" className="text-text-primary/60 hover:text-text-primary transition-colors text-sm font-medium">Terms and Conditions</a>
//                     </div>

//                     {/* Col 6: Follow us & App Links */}
//                     <div className="flex flex-col gap-6 col-span-2 lg:col-span-1 lg:pl-8">
//                         <div>
//                             <h3 className="text-text-primary font-bold text-sm mb-4">Follow us</h3>
//                             <div className="flex gap-4">
//                                 <a href="#" className="text-text-primary/60 hover:text-[#E1306C] transition-colors"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg></a>
//                                 <a href="#" className="text-text-primary/60 hover:text-[#1877F2] transition-colors"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg></a>
//                                 <a href="#" className="text-text-primary/60 hover:text-[#0A66C2] transition-colors"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg></a>
//                                 <a href="#" className="text-text-primary/60 hover:text-text-primary transition-colors"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" /></svg></a>
//                                 <a href="#" className="text-text-primary/60 hover:text-[#FF0000] transition-colors"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg></a>
//                             </div>
//                         </div>

//                         <div>
//                             <h3 className="text-text-primary font-bold text-sm mb-4">Download our creator&apos;s app</h3>
//                             <div className="flex flex-wrap gap-3">
//                                 <a href="#" className="bg-page-surface border border-page-border hover:border-text-primary/20 transition-colors rounded-xl px-4 py-2 flex items-center gap-3">
//                                     <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M16.365 21.432c-1.391.066-2.583-.49-3.79-.49-1.229 0-2.6.59-3.832.55-1.272-.033-2.45-.758-3.08-1.92-1.326-2.316-1.583-5.63-.5-8.08.535-1.206 1.62-1.944 2.805-1.977 1.25-.034 2.378.854 3.003.854.624 0 1.956-.99 3.425-.845 1.503.045 2.846.611 3.585 1.832L17.7 11.53c-1.32.78-1.637 2.46-.777 3.653.642.89 1.625 1.353 2.656 1.428-.62 1.67-1.748 3.515-3.214 4.823zm-3.41-16.14c.483-1.42.046-3.007-.946-4.04-1.018-1.026-2.613-1.41-3.992-1.002-.577 1.442-.158 3.107.962 4.135 1.05 1.02 2.628 1.488 3.976.907z" /></svg>
//                                     <div className="flex flex-col text-left">
//                                         <span className="text-[10px] text-text-primary/60 leading-tight">Available on the</span>
//                                         <span className="text-sm font-bold leading-tight">App Store</span>
//                                     </div>
//                                 </a>
//                                 <a href="#" className="bg-page-surface border border-page-border hover:border-text-primary/20 transition-colors rounded-xl px-4 py-2 flex items-center gap-3">
//                                     <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M3.195 2.162c-.114.12-.195.291-.195.513v18.65c0 .222.081.393.195.513L3.336 22l9.539-9.584V11.58L3.336 2l-.141.162zm10.748 10.822l2.978 2.998-13.385 7.636c-.463.265-1.052.179-1.439-.122l11.846-10.512zM21.16 12l-3.344-1.91-2.029 2.042v.001l2.03 2.044L21.16 12zm-17.65 9.873c.386.302.976.388 1.439.122l13.385-7.636-2.978-2.998-11.846 10.512z" /></svg>
//                                     <div className="flex flex-col text-left">
//                                         <span className="text-[10px] text-text-primary/60 leading-tight">GET IT ON</span>
//                                         <span className="text-sm font-bold leading-tight">Google Play</span>
//                                     </div>
//                                 </a>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="mt-16 text-center text-sm font-medium text-text-primary/40">
//                     © 2026 Bennybucks Tech Private Limited
//                 </div>
//             </div>
//         </section>
// }

export default function BrandFooter() {
    return (
        <footer className="bg-page-surface-alt border-t border-page-border text-text-primary w-full overflow-hidden">
            <div className="max-w-[1480px] mx-auto px-4 sm:px-8 pt-20 pb-4">

                {/* Footer Links Area (Re-aligned to match reference image) */}
                <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-12 lg:gap-24 mb-24 lg:mb-32">

                    {/* Socials */}
                    <div className="flex items-center gap-6 mt-10">
                        {/* YouTube (Replaced TikTok) */}
                        <a href="#" className="hover:opacity-60 transition-opacity text-text-primary">
                            <svg width="50" height="50" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                            </svg>
                        </a>
                        {/* Insta (Changed to outline style per reference) */}
                        <a href="#" className="hover:opacity-60 transition-opacity text-text-primary">
                            <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                            </svg>
                        </a>
                        {/* LinkedIn (Changed to solid block per reference) */}
                        <a href="#" className="hover:opacity-60 transition-opacity text-text-primary">
                            <svg width="50" height="50" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                        </a>
                    </div>

                    {/* Columns */}
                    <div className="flex gap-12 lg:gap-24 text-lg lg:text-[30px] font-extrabold uppercase tracking-widest text-text-primary text-center md:text-left">
                        <div className="flex flex-col gap-3">
                            <a href="#" className="hover:opacity-60 transition-opacity">FOR CREATORS</a>
                            <a href="#" className="hover:opacity-60 transition-opacity">CAREERS</a>
                            <a href="#" className="hover:opacity-60 transition-opacity">PRIVACY POLICY</a>
                        </div>
                        <div className="flex flex-col gap-3">
                            <a href="#" className="hover:opacity-60 transition-opacity">EVENTS</a>
                            <a href="#" className="hover:opacity-60 transition-opacity">GET IN TOUCH</a>
                            <a href="#" className="hover:opacity-60 transition-opacity">TERMS OF USE</a>
                        </div>
                    </div>
                </div>

                {/* Giant Text Logo (Reverted to original size/layout, only changed the SVG) */}
                <div className="gap-9 w-full flex items-center justify-center font-black text-[10vw] tracking-tighter leading-none text-text-primary pb-12 md:pb-20">
                    {/* New Organic Abstract Logo to replace the zigzag */}
                    <svg width="300" height="300" viewBox="0 0 26 26" fill="none">
                        <path
                            d="M4 6l4 12 6-8 6 8 4-12"
                            stroke="#e5383b"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    bennybucks
                </div>

            </div>
        </footer>
    );
}
