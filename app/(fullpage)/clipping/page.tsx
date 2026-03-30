import BrandHeader from "@/components/BrandHeader";
import BrandFooter from "@/components/BrandFooter";
import { acidGroteskFont } from "@/lib/fonts";
import VideoCarousel from "@/components/Videocarousel";

const CheckIcon = () => (
    <svg className="text-brand-neon flex-shrink-0 mt-1" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);

const features = [
    {
        title: "Content Awareness",
        desc: "Your long videos are transformed into short clips by creators, putting your channel, movie, or series in front of millions of potential viewers.",
        icon: <><circle cx="6" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><line x1="20" y1="4" x2="8.12" y2="15.88"></line><line x1="14.47" y1="14.48" x2="20" y2="20"></line><line x1="8.12" y1="8.12" x2="12" y2="12"></line></>
    },
    {
        title: "Engaging Highlights",
        desc: "clips features the best moments, funniest scenes, or key insights, paired with unique edits and matched audio to instantly connect with your audience.",
        icon: <><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></>
    },
    {
        title: "Organic Reach",
        desc: "Your content spreads naturally across the platform, boosting virality and reaching new audiences without forced promotion.",
        icon: <><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></>
    },
    {
        title: "Smart Analytics Dashboard",
        desc: "Track all your clips and their performance in one simple dashboard so you can monitor results and take action quickly.",
        icon: <><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></>
    },
    {
        title: "AI-Verified Engagement",
        desc: "Every view and interaction is automatically verified to ensure the engagement is real and authentic.",
        icon: <><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></>
    },
    {
        title: "Performance-Based Payment",
        desc: "Pay only for real views and engagement. If the content does not perform, you spend nothing.",
        icon: <><path d="M6 3h12"></path><path d="M6 8h12"></path><path d="m6 13 8.5 8"></path><path d="M6 13h3"></path><path d="M9 13c6.667 0 6.667-10 0-10"></path></>
    }
];

export default function ClippingPage() {

    const timelineSteps = [
        {
            title: "Campaign Configuration",
            content: (
                <div className="space-y-4 max-w-lg">
                    <p className="font-medium text-lg leading-relaxed text-text-primary/80">
                        e.g., <strong>MrBeast launched a campaign</strong>. &quot;Make edits of my youtube channel and upload on Instagram.&quot;
                    </p>
                    <div className="bg-page-surface border border-page-border rounded-2xl p-6 text-sm md:text-base space-y-4 shadow-xl w-full text-left">
                        <div className="flex justify-between border-b border-page-border pb-3">
                            <span className="text-text-primary/50">Budget</span>
                            <span className="font-bold text-text-primary">₹1 Lac</span>
                        </div>
                        <div className="flex flex-col border-b border-page-border pb-4">
                            <span className="text-text-primary/50 mb-3">Page Requirements</span>
                            <ul className="grid grid-cols-1 gap-y-3 font-semibold text-text-primary/90">
                                <li className="flex items-center gap-2"><span className="text-brand-red">&bull;</span> Min followers: 1000</li>
                                <li className="flex items-center gap-2"><span className="text-brand-red">&bull;</span> Page Niche: Everyone except trading pages</li>
                                <li className="flex items-center gap-2"><span className="text-brand-red">&bull;</span> Language: English</li>
                            </ul>
                        </div>
                        <div className="flex flex-col border-b border-page-border pb-4">
                            <span className="text-text-primary/50 mb-2">Brief & Assets</span>
                            <span className="font-medium text-text-primary/80 leading-relaxed text-sm">
                                Make edits of my youtube channel and upload on instagram. Here are assets.
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
                <div className="space-y-4 max-w-lg">
                    <p className="md:text-xl font-medium leading-relaxed text-text-primary/80">
                        Creators who are eligible will participate, create creative videos, and submit their content links.
                    </p>
                    <p className="md:text-xl font-medium leading-relaxed text-text-primary/80">
                        A vast network of clippers discovers the best hooks in your videos, upload on their social media and submit the video link on Bennybucks.
                    </p>
                </div>
            ),
            image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2574&auto=format&fit=crop"
        },
        {
            title: "AI Verification — Whoofy",
            content: (
                <div className="space-y-6 max-w-lg">
                    <p className="md:text-xl font-medium leading-relaxed text-text-primary/80">
                        Our AI module <strong>Whoofy</strong> verifies every single video. Does it belong to MrBeast? Does it match the requirements you mentioned?
                    </p>
                    <ul className="space-y-4 text-text-primary/70 md:text-lg text-left inline-block w-full font-medium">
                        <li className="flex items-start gap-3"><CheckIcon /> <span className="flex-1">First verifies number of followers</span></li>
                        <li className="flex items-start gap-3"><CheckIcon /> <span className="flex-1">Analyzes frame by frame if video belongs to MrBeast or not</span></li>
                        <li className="flex items-start gap-3"><CheckIcon /> <span className="flex-1">Analyzes the sentiments: positive or negative clips</span></li>
                        <li className="flex items-start gap-3"><CheckIcon /> <span className="flex-1">Verifies every single requirement you mentioned</span></li>
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
                    Each and every reel is shown on a dedicated dashboard. If you are not happy with the AI decision, you also get the option to flag it, and our team will review that reel manually. Real-time campaign tracking.
                </p>
            ),
            image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2564&auto=format&fit=crop"
        },
        {
            title: "Creator Payouts",
            content: (
                <p className="md:text-xl font-medium leading-relaxed max-w-lg text-text-primary/80">
                    Once all the videos get approved, the creators are paid based on the views they have earned.
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
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">How It Works</h2>
                        <p className="text-xl text-text-primary/50 max-w-2xl mx-auto font-medium">Scale your clipping campaigns effortlessly</p>
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

            </section> */}

            {/* ── Case Study / Showcase Section ── */}
            <section className="bg-section-highlight text-text-primary w-full overflow-hidden py-24">
                <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16">

                    {/* Header: Logo and Title */}
                    <div className="mb-16">
                        <div className="flex flex-wrap items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-text-primary rounded-lg flex items-center justify-center text-page-surface shrink-0">
                                <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
                                    <path d="M4 6l4 12 6-8 6 8 4-12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <h2 className={`${acidGroteskFont.className} text-4xl sm:text-5xl lg:text-[4.3rem] font-medium -tracking-[.055625em] leading-[1.1]`}>Clipping Content</h2>
                        </div>
                        <h3 className="text-[20px] pt-4 font-medium text-text-primary/80">Clipping is the process of creating short-form content by cutting and repurposing moments from longer videos such as YouTube videos, movie trailers, web series, or TV shows.</h3>
                    </div>

                    {/* Challenge & Solution */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 mb-20 text-text-primary">
                        <div>
                            <h4 className="text-[24px] font-bold mb-4 tracking-tight">Problem</h4>
                            <p className="text-[20px] leading-relaxed font-medium text-text-primary/80">
                                Long-form content often contains valuable moments, but many of these moments remain hidden and never reach the audience they deserve.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-[24px] font-bold mb-4 tracking-tight">Solution with BennyBucks</h4>
                            <p className="text-[20px] leading-relaxed font-medium text-text-primary/80">
                                With BennyBucks, a large network of creators (clippers) identifies the most engaging moments in your videos and turns them into short viral clips that bring millions of viewers back to your original content.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Container for Videos (Full Screen Edge-to-Edge) */}
                <div className="w-full px-0 sm:px-4">
                    <div className="bg-page-surface rounded-[2rem] p-4 sm:p-8 md:p-12 lg:py-16 border border-page-border overflow-hidden w-full">
                        <VideoCarousel items={[
                            { video: "https://samplelib.com/lib/preview/mp4/podcast-viral-clipping.mp4", label: "Youtubers" },
                            { video: "https://samplelib.com/lib/preview/mp4/motivational-speech-clipping.mp4", label: "Personal branding" },
                            { video: "https://samplelib.com/lib/preview/mp4/business-mindset-clipping.mp4", label: "OTT platforms" },
                            { video: "https://samplelib.com/lib/preview/mp4/educational-knowledge-clipping.mp4", label: "Entertainment marketing" },
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
