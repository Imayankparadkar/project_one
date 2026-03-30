
export function LandingAbout() {
    return (
        <section className="py-32 bg-zinc-950 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay"></div>
            <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="container px-4 md:px-6 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">

                <div className="space-y-8 animate-fade-in-up">
                    <div className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-400">
                        About Us
                    </div>
                    <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-text-primary leading-tight">
                        Empowering <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Creativity</span> & Commerce
                    </h2>
                    <div className="space-y-6 text-zinc-400 text-lg leading-relaxed">
                        <p>
                            At Bennybucks, we believe in the power of authentic connection. Our mission is to bridge the gap between creative talent and visionary brands, creating a marketplace where value is exchanged transparently and efficiently.
                        </p>
                        <p>
                            We exist to remove the friction from influencer marketing, ensuring creators get paid fairly for their influence and brands get real, measurable results. No more guesswork, just growth.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-8 pt-8 border-t border-page-border">
                        <div className="flex items-center gap-4 group cursor-default">
                            <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-blue-500 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-text-primary transition-all duration-300 shadow-xl">
                                <span className="font-bold text-xl">100%</span>
                            </div>
                            <div>
                                <p className="font-bold text-lg text-text-primary group-hover:text-blue-400 transition-colors">Transparency</p>
                                <p className="text-sm text-zinc-500">No hidden fees, ever.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 group cursor-default">
                            <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-purple-500 group-hover:scale-110 group-hover:bg-purple-500 group-hover:text-text-primary transition-all duration-300 shadow-xl">
                                <span className="font-bold text-xl">24/7</span>
                            </div>
                            <div>
                                <p className="font-bold text-lg text-text-primary group-hover:text-purple-400 transition-colors">Support</p>
                                <p className="text-sm text-zinc-500">We're here to help.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative aspect-square w-full max-w-[600px] mx-auto lg:order-last order-first">
                    {/* 3D-ish Abstract Visual Placeholder */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-700 opacity-20 blur-[100px] rounded-full animate-pulse-slow"></div>

                    <div className="relative w-full h-full rounded-[3rem] overflow-hidden border border-page-border bg-zinc-900/80 backdrop-blur-xl shadow-2xl flex items-center justify-center">
                        {/* Globe/Network Effect Placeholder */}
                        <div className="absolute inset-0 grid grid-cols-[repeat(20,minmax(0,1fr))] grid-rows-[repeat(20,minmax(0,1fr))] opacity-[0.03]">
                            {Array.from({ length: 400 }).map((_, i) => (
                                <div key={i} className="border-[0.5px] border-white"></div>
                            ))}
                        </div>

                        <div className="z-10 text-center space-y-6 transform hover:scale-105 transition-transform duration-500 p-8 rounded-3xl bg-black/40 border border-page-border backdrop-blur-md shadow-2xl skew-y-1">
                            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.5)] animate-float">
                                <span className="text-4xl">🌍</span>
                            </div>
                            <div>
                                <p className="font-bold text-3xl text-text-primary mb-2">Global Reach</p>
                                <p className="text-zinc-400 font-medium max-w-[200px] mx-auto">Connecting creators from over 50 countries.</p>
                            </div>
                        </div>

                        {/* Floating Avatars */}
                        <div className="absolute top-10 left-10 w-12 h-12 rounded-full border-2 border-zinc-900 bg-zinc-800 animate-float" style={{ animationDelay: '0s' }}></div>
                        <div className="absolute bottom-20 right-10 w-16 h-16 rounded-full border-2 border-zinc-900 bg-zinc-700 animate-float" style={{ animationDelay: '2s' }}></div>
                        <div className="absolute top-1/2 right-10 w-10 h-10 rounded-full border-2 border-zinc-900 bg-zinc-600 animate-float" style={{ animationDelay: '1s' }}></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
