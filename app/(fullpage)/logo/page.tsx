import BrandHeader from "@/components/BrandHeader";
import BrandFooter from "@/components/BrandFooter";
import { acidGroteskFont } from "@/lib/fonts";
import VideoCarousel from "@/components/Videocarousel";

const CheckIcon = () => (
    <svg className="text-brand-neon flex-shrink-0 mt-1" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);

export default function LogoPage() {

    const features = [
        {
            title: "Stop Getting Skipped",
            desc: "Traditional ads get ignored in seconds, but creators deliver content people actually choose to watch. Blend your branding with engaging, creator-driven content.",
            icon: <><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></>
        },
        {
            title: "Build Non-Conscious Brand Recall",
            desc: "Repeated subtle exposure builds trust and positive brand association, ensuring viewers are more likely to remember and choose your brand in the future.",
            icon: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        },
        {
            title: "Boost SEO",
            desc: "Creator mentions and brand-specific hashtags increase your online visibility, making it easier for people to discover your brand.",
            icon: <><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></>
        },
        {
            title: "Smart Analytics Dashboard",
            desc: "Monitor all clips and their performance in one centralized dashboard to take quick, informed action.",
            icon: <><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></>
        },
        {
            title: "AI-Verified Engagement",
            desc: "Every view and interaction is automatically checked to guarantee real, authentic engagement.",
            icon: <><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></>
        },
        {
            title: "Performance-Based Payment",
            desc: "Pay only for content that performs. If it doesn’t generate engagement, you spend nothing.",
            icon: <><path d="M6 3h12"></path><path d="M6 8h12"></path><path d="m6 13 8.5 8"></path><path d="M6 13h3"></path><path d="M9 13c6.667 0 6.667-10 0-10"></path></>
        }
    ];

    const timelineSteps = [
        {
            title: "Campaign Configuration",
            content: (
                <div className="space-y-4 max-w-lg">
                    <p className="font-medium text-lg leading-relaxed text-text-primary/80">
                        e.g., <strong>A top consumer brand launches a campaign</strong> to boost visibility natively using their logo drop.
                    </p>
                    <div className="bg-page-surface border border-page-border rounded-2xl p-6 text-sm md:text-base space-y-4 shadow-xl w-full text-left">
                        <div className="flex justify-between border-b border-page-border pb-3">
                            <span className="text-text-primary/50">Budget</span>
                            <span className="font-bold text-text-primary">₹1 Lac</span>
                        </div>
                        <div className="flex flex-col border-b border-page-border pb-4">
                            <span className="text-text-primary/50 mb-3">Requirements</span>
                            <ul className="grid grid-cols-2 gap-y-3 gap-x-4 font-semibold text-text-primary/90">
                                <li className="flex items-center gap-2"><span className="text-brand-red">&bull;</span> Min followers: 10k</li>
                                <li className="flex items-center gap-2"><span className="text-brand-red">&bull;</span> Niche: Lifestyle</li>
                                <li className="flex items-center gap-2"><span className="text-brand-red">&bull;</span> Demographic: Both</li>
                                <li className="flex items-center gap-2"><span className="text-brand-red">&bull;</span> Assets: Transparent PNG</li>
                            </ul>
                        </div>
                        <div className="flex flex-col border-b border-page-border pb-4">
                            <span className="text-text-primary/50 mb-2">Brief</span>
                            <span className="font-medium text-text-primary/80 leading-relaxed text-sm">
                                Integrate the brand logo creatively into engaging videos or photos. Ensure high visibility.
                            </span>
                        </div>
                        <div className="flex justify-between pt-1">
                            <span className="text-text-primary/50 font-medium">Target Payout</span>
                            <span className="font-extrabold text-brand-neon">₹15k CPM / 100k views</span>
                        </div>
                    </div>
                </div>
            ),
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2564&auto=format&fit=crop"
        },
        {
            title: "Now Impact",
            content: (
                <p className="md:text-xl font-medium leading-relaxed max-w-lg text-text-primary/80">
                    Creators participate by creating highly engaging videos. They seamlessly drop or wear the brand logo within their content and submit the links, creating widespread subliminal impressions across massive audiences.
                </p>
            ),
            image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2574&auto=format&fit=crop"
        },
        {
            title: "Whoofy AI Model",
            content: (
                <div className="space-y-6 max-w-lg">
                    <p className="md:text-xl font-medium leading-relaxed text-text-primary/80">
                        We have built an AI module <strong>Whoofy</strong> to prevent any fake or low performance reels. You set your requirement, we feed your requirements to Whoofy, and Whoofy identifies if every single requirement matches the reel or not.
                    </p>
                    <ul className="space-y-4 text-text-primary/70 md:text-lg text-left inline-block w-full font-medium">
                        <li className="flex items-start gap-3"><CheckIcon /> <span className="flex-1">Scans frame-by-frame for exact logo usage</span></li>
                        <li className="flex items-start gap-3"><CheckIcon /> <span className="flex-1">Identifies requirement match (niche, demographics)</span></li>
                        <li className="flex items-start gap-3"><CheckIcon /> <span className="flex-1">Detects positive or negative brand sentiment</span></li>
                    </ul>
                    <div className="inline-block mt-4 px-4 py-2 bg-brand-neon/10 border border-brand-neon/30 rounded-lg">
                        <p className="text-brand-neon font-bold text-sm uppercase tracking-widest text-left">Once approved</p>
                    </div>
                </div>
            ),
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2670&auto=format&fit=crop"
        },
        {
            title: "Real-time Tracking",
            content: (
                <p className="md:text-xl font-medium leading-relaxed max-w-lg text-text-primary/80">
                    Each and every reel is shown on a dedicated dashboard. If you are not happy with the AI decision, you also get the option to flag it, and our team will review that reel manually.
                </p>
            ),
            image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2564&auto=format&fit=crop"
        },
        {
            title: "Creator Payouts",
            content: (
                <p className="md:text-xl font-medium leading-relaxed max-w-lg text-text-primary/80">
                    Once all the videos get approved, the creators are paid based directly on the views they have earned.
                </p>
            ),
            image: "https://images.unsplash.com/photo-1580048915913-4f8f5cb481c4?q=80&w=2574&auto=format&fit=crop"
        }
    ];

    return (
        <div className="min-h-screen bg-page-bg text-text-primary selection:bg-blue-600 selection:text-text-primary">
            <BrandHeader />

            {/* ── Timeline Section (How it works) ── */}
            {/* <section className="py-24 bg-page-surface-alt border-t border-page-border relative overflow-hidden">
                <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-8 relative z-10">

                    <div className="text-center mb-32">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">The Logo Validation Pipeline</h2>
                        <p className="text-xl text-text-primary/50 max-w-2xl mx-auto font-medium">From campaign creation to payout verification</p>
                    </div>

                    <div className="relative">
                        <div className="absolute left-[24px] md:left-1/2 top-4 bottom-4 w-[2px] bg-text-primary/10 md:-translate-x-1/2 rounded-full hidden md:block"></div>

                        <div className="absolute left-[24px] md:left-1/2 top-4 h-[30%] w-[2px] bg-gradient-to-b from-[#ccff00] to-transparent md:-translate-x-1/2 rounded-full hidden md:block"></div>

                        <div className="flex flex-col gap-24 md:gap-32 relative">
                            {timelineSteps.map((step, index) => {
                                const isEven = index % 2 === 0;
                                return (
                                    <div key={index} className={`relative flex flex-col md:flex-row items-center gap-12 md:gap-0 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>

                                        <div className={`w-full md:w-1/2 flex flex-col justify-center text-center md:text-left ${isEven ? 'md:pr-16 lg:pr-24 md:items-end md:text-right' : 'md:pl-16 lg:pl-24 md:items-start'}`}>
                                            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-8 text-brand-red tracking-tight">{step.title}</h3>
                                            <div className={`w-full flex ${isEven ? 'md:justify-end' : 'md:justify-start'} justify-center`}>
                                                {step.content}
                                            </div>
                                        </div>

                                        <div className="absolute left-[24px] md:left-1/2 w-8 h-8 rounded-full bg-page-surface border-[4px] border-brand-neon transform -translate-x-1/2 shadow-[0_0_20px_rgba(204,255,0,0.3)] z-20 top-0 md:top-auto hidden md:block"></div>

                                        <div className={`w-full md:w-1/2 flex justify-center ${isEven ? 'md:justify-start md:pl-16 lg:pl-24' : 'md:justify-end md:pr-16 lg:pr-24'}`}>
                                            <div className="relative w-full max-w-[550px] aspect-[4/3] rounded-[2rem] overflow-hidden border border-page-border shadow-2xl bg-page-surface group">
                                                <img src={step.image} alt={step.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700 scale-[1.02] group-hover:scale-100 mix-blend-lighten" />
                                            </div>
                                        </div>

                                    </div>
                                );
                            })}
                        </div>
                    </div>

                </div>
            </section> */}

            {/* ── Case Study / Showcase Section ── */}
            <section className="bg-section-highlight text-text-primary w-full overflow-hidden py-24">
                <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16">

                    {/* Header: Logo and Title */}
                    <div className="mb-16">
                        <div className="flex flex-wrap items-center gap-4 mb-4">
                            <h2 className={`${acidGroteskFont.className} text-4xl sm:text-5xl lg:text-[4.3rem] font-medium -tracking-[.055625em] leading-[1.1]`}>Logo Content</h2>
                        </div>
                        <h3 className="text-[20px] pt-4 font-medium text-text-primary/80">What is Logo Promotion?
                            Logo promotion focuses on increasing brand visibility by integrating the brand’s logo naturally within creator content.</h3>
                    </div>

                    {/* Challenge & Solution */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 mb-20 text-text-primary">
                        <div>
                            <h4 className="text-[24px] font-bold mb-4 tracking-tight">Problem</h4>
                            <p className="text-[20px] leading-relaxed font-medium text-text-primary/80">
                                Brands invest heavily in advertisements, but their visual identity often gets lost or does not receive enough exposure in everyday content.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-[24px] font-bold mb-4 tracking-tight">Solution with BennyBucks</h4>
                            <p className="text-[20px] leading-relaxed font-medium text-text-primary/80">
                                With BennyBucks, creators integrate the brand’s logo creatively into their content. When multiple creators showcase the logo across different styles of content, it strengthens brand recognition and helps audiences remember the brand more easily.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Container for Videos (Full Screen Edge-to-Edge) */}
                <div className="w-full px-0 sm:px-4">
                    <div className="bg-page-surface rounded-[2rem] p-4 sm:p-8 md:p-12 lg:py-16 border border-page-border overflow-hidden w-full">
                        <VideoCarousel items={[
                            { video: "https://videos.pexels.com/video-files/3209828/3209828-sd_640_360_25fps.mp4", label: "Minimal Logo Reveal" },
                            { video: "https://videos.pexels.com/video-files/4434242/4434242-hd_1080_1920_24fps.mp4", label: "3D Logo Animation" },
                            { video: "https://videos.pexels.com/video-files/853925/853925-sd_640_360_25fps.mp4", label: "Cinematic Brand Logo Intro" },
                            { video: "https://videos.pexels.com/video-files/2795405/2795405-hd_1080_1920_25fps.mp4", label: "Neon Logo Reveal" },
                            { video: "https://videos.pexels.com/video-files/3188991/3188991-sd_640_360_25fps.mp4", label: "Modern Logo Outro Animation" }
                        ]} />
                    </div>
                </div>
            </section>

            {/* ── Features Grid ── */}
            <section className="py-24 bg-page-surface-alt border-t border-page-border">
                <div className="w-full max-w-[1480px] mx-auto px-4 sm:px-8">
                    <div className="text-center mb-16">
                        <h2 className={`${acidGroteskFont.className} -tracking-[.055625em] leading-[1.1] text-4xl md:text-5xl font-medium mb-6`}>How BennyBucks Helps Your Brand</h2>
                        <p className="text-lg text-text-primary/50 max-w-2xl mx-auto font-medium">Deploy your branding without turning your marketing into a skippable ad.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, i) => (
                            <div key={i} className="bg-page-surface border border-page-border p-8 rounded-[2rem] hover:border-white/30 transition-colors group">
                                <div className="w-14 h-14 bg-text-primary/5 rounded-2xl flex items-center justify-center text-brand-red mb-6 group-hover:bg-brand-red group-hover:text-text-primary transition-colors">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        {feature.icon}
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                                <p className="text-text-primary/60 leading-relaxed font-medium text-sm md:text-base">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <BrandFooter />
        </div>
    );
}
