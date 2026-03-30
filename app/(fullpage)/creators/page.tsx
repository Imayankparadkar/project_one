import BrandHeader from "@/components/BrandHeader";
import BrandFooter from "@/components/BrandFooter";
import localFont from "next/font/local";
import CreatorsSlider from "@/components/CreatorsSlider";


const acidGroteskFont = localFont({
  src: [
    {
      path: "../../../public/fonts/FFF_AcidGrotesk_Regular-s.ec71d0d5.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/FFF_AcidGrotesk_Medium-s.a3f6ca65.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../public/fonts/FFF_AcidGrotesk_Bold-s.49a3bd75.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
});

export default function CreatorsPage() {
  return (
    <div className="min-h-screen bg-page-bg text-text-primary selection:bg-brand-neon selection:text-black">
      <BrandHeader />

      {/* 1) Hero Section */}
      <section className="pt-32 lg:pt-48 pb-16 px-6 sm:px-12 max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center border-b border-text-primary/5">
        {/* Left side Image (Vertical Card like Pearpop) */}
        <div className="lg:col-span-4 flex flex-col items-center lg:items-end">
          <div className="w-full max-w-[300px] h-[500px] bg-page-surface-alt rounded-[2rem] overflow-hidden relative shadow-2xl flex items-center justify-center border border-page-border group">
            {/* Placeholder image resembling Pearpop's creator card */}
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop"
              alt="Creator"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            />
            {/* <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 text-white text-center transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
              <p className="font-extrabold text-xl mb-1">Jordan Halley</p>
              <p className="text-xs font-bold uppercase tracking-wider opacity-80">
                Managed by BennyBucks Talent
              </p>
            </div> */}
          </div>
        </div>

        {/* Right side Text */}
        <div className="lg:col-span-8 text-center lg:text-left">
          <h1
            className={`${acidGroteskFont.className} text-5xl md:text-[5rem] lg:text-[6rem] font-bold -tracking-[.035625em] mb-8 leading-[1.05]`}
          >
            Earn a <span className="text-brand-red">Living</span>
            <br />
            <span className="block  ml-0 md:ml-24 lg:ml-64">Doing What</span>
            <span className="block ml-0 md:ml-12 lg:ml-35">
              You <span className="text-brand-red">Love</span>
            </span>
          </h1>
          {/* <div className="ml-0 lg:ml-24 max-w-2xl text-left">
            <p
              className="
            
            text-xl md:text-2xl text-text-primary/60 max-w-3xl mx-auto leading-relaxed mb-12 font-medium
            "
            >
              To turn every passionate creator into a “creator-preneur” —
              someone who earns, grows, and thrives by doing what they love. We
              want social influence to be accessible to anyone with creativity
              and a loyal audience, no matter their background or platform.
            </p>
            <p className="text-lg md:text-xl font-medium text-text-primary/70 leading-relaxed mt-4">
              Whether you are a niche creator, an influencer, or you run an edit
              page or meme page, you can earn through BennyBucks.
            </p>
          </div> */}
        </div>
      </section>

      <section className="bg-gradient-to-b from-page-bg to-page-surface py-24 border-t border-page-border flex flex-col items-center">
        <div className="w-full max-w-[1480px] mx-auto px-4 sm:px-8">
          {/* <div className="text-center mb-20 md:mb-28">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-text-primary mb-4">
              “The Best Influencer Marketing Platform”
            </h2>
            <div className="text-4xl md:text-6xl font-black tracking-tighter uppercase">Digiday</div>
          </div> */}

          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="w-full lg:w-1/2 text-left mt-8 lg:mt-0">
              <h2
                className={`${acidGroteskFont.className} text-4xl sm:text-5xl lg:text-[4.3rem] font-medium mb-8 -tracking-[.055625em] leading-[1.1]
                
                 
                `}
              >
                Unlimited Earning{" "}
              </h2>
              <p className="text-lg text-text-primary/70 leading-relaxed mb-6 font-medium">
                At BennyBucks, we believe every creator holds the power to
                transform their content into real, sustainable income. Whether
                you&apos;re a UGC creator, run a meme page, produce trending
                edits, or craft content in any niche this is your opportunity to
                become a creator preneur someone who earns, grows, and thrives
                by doing what they love.
              </p>

              <button className="rounded-xl bg-[#dbf505] hover:bg-[#E6FA3A] text-black text-[1.3rem] font-medium px-6 py-4 transition-transform hover:scale-105 tracking-wide">
                <div className="flex items-center gap-2">Start Earning Now</div>
              </button>
            </div>

            <div className="w-full lg:w-1/2">
              <div className="relative group perspective-1000 w-full max-w-xl mx-auto">
                {/* Background glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-neon/20 rounded-full blur-[100px] -z-10 group-hover:bg-brand-neon/30 transition-colors duration-700"></div>

                {/* Main card */}
                <div className="relative z-10 w-full aspect-[4/3] bg-page-surface/40 backdrop-blur-xl border border-page-border rounded-[2.5rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)] flex flex-col items-center justify-center p-8 overflow-hidden transform transition-transform duration-700 hover:scale-[1.02]">
                  {/* Decorative floating elements */}
                  <div className="absolute -top-12 -right-12 w-48 h-48 bg-gradient-to-br from-[#ccff00] to-[#9dae00] rounded-full blur-2xl opacity-50 group-hover:scale-150 transition-transform duration-1000"></div>
                  <div className="absolute -bottom-24 -left-12 w-64 h-64 bg-gradient-to-tr from-[#fa4616] to-pink-500 rounded-full blur-3xl opacity-40 group-hover:scale-150 transition-transform duration-1000"></div>

                  {/* Inner glass pane simulating UI */}
                  <div className="w-full h-full bg-white/20 dark:bg-black/40 backdrop-blur-md rounded-2xl border border-white/20 dark:border-white/10 flex flex-col p-6 shadow-inner relative z-20">
                    {/* Fake UI Header */}
                    <div className="w-full flex items-center justify-between border-b border-white/20 dark:border-white/10 pb-4 mb-4">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                      </div>
                      <div className="h-4 w-32 bg-white/30 dark:bg-white/10 rounded-full"></div>
                    </div>
                    {/* Fake UI Body */}
                    <div className="flex-1 flex gap-4">
                      <div className="w-1/3 flex flex-col gap-4">
                        <div className="h-20 w-full bg-white/20 dark:bg-white/5 rounded-xl"></div>
                        <div className="h-10 w-full bg-white/20 dark:bg-white/5 rounded-xl"></div>
                        <div className="h-10 w-full bg-white/20 dark:bg-white/5 rounded-xl"></div>
                      </div>
                      <div className="w-2/3 bg-white/10 dark:bg-white/5 rounded-xl border border-white/20 dark:border-white/10 p-4 flex flex-col gap-4">
                        <div className="h-12 w-3/4 bg-blue-500/30 rounded-lg"></div>
                        <div className="h-8 w-1/2 bg-white/20 dark:bg-white/10 rounded-lg"></div>
                        <div className="flex-1 w-full bg-gradient-to-br from-brand-neon/30 to-transparent rounded-lg mt-auto backdrop-blur-sm border border-white/10"></div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Earnings Tag */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black text-brand-neon font-black text-4xl px-8 py-4 rounded-full border border-brand-neon/30 shadow-2xl z-30 transform group-hover:scale-110 transition-transform duration-500 flex items-center gap-3">
                    <span className="text-white opacity-80">+</span>{" "}
                    &#8377;20,257
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 relative overflow-hidden bg-page-bg border-y border-page-border">
        {/* Visual Navigation Button */}
        <div className="mx-auto w-full ">
          {/* <div className="absolute right-4 sm:right-12 top-1/2 -translate-y-1/2 z-10 hidden lg:flex items-center justify-center w-12 h-12 rounded-full bg-black text-white hover:scale-110 transition-transform cursor-pointer shadow-[0_0_30px_rgba(0,0,0,0.3)] border border-white/10 group">
            <svg
              className="w-6 h-6 transform group-hover:translate-x-1 transition-transform"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </div> */}

          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="px-4 sm:px-8">
              <h2
                className={`${acidGroteskFont.className} text-center text-4xl font-medium leading-[1.1] -tracking-[0.055625em] sm:text-5xl md:text-left lg:text-[4.3rem]`}
              >
                4 Ways to Earn through{" "}
                <span className="text-[#dbf505]">BennyBucks</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed text-text-primary/65 md:mx-0 md:text-left md:text-lg">
                Whether you are a niche creator, an influencer, or run an edit
                page or meme page, you can earn through BennyBucks.
              </p>
            </div>
          </div>

          <div className="mt-4">
            <CreatorsSlider fontClassName={acidGroteskFont.className} />
          </div>

        </div>
      </section>

      {/* 4) FAQ Section */}
      <section className="py-32 px-6 sm:px-12 max-w-[1200px] mx-auto text-center border-b border-page-border">
        <h2
          className={`${acidGroteskFont.className} text-center text-4xl font-medium leading-[1.1] -tracking-[0.055625em] sm:text-5xl lg:text-[4.3rem] `}
        >
          Have Some Doubts?
        </h2>
        <h3
          className={`${acidGroteskFont.className} text-center text-4xl font-medium leading-[1.1] -tracking-[0.055625em] sm:text-5xl lg:text-[4.3rem] mb-10`}
        >
          Don’t worry! We are here to help!
        </h3>
        <div className="max-w-3xl mx-auto space-y-6 mt-12">
          <p className="text-2xl md:text-3xl font-bold text-text-primary/90">
            Check out our FAQ page for the answers!
          </p>
          <p className="text-lg text-text-primary/70 leading-relaxed mb-6 font-medium">
            Let us make it simpler for you. Check our FAQ section to find
            answers to the most common queries, or contact our support team for
            personalized assistance.
          </p>
        </div>

        <div className="mt-16 flex flex-col sm:flex-row gap-6 justify-center">
          <button className="rounded-xl bg-[#1754d8] hover:bg-[#1240a6] text-white text-[1.3rem] font-medium px-10 py-4 transition-transform hover:scale-105  tracking-wide ">
            FAQ Page
          </button>
          <button className="rounded-full bg-transparent border-2 border-text-primary/30 hover:border-text-primary/60 hover:bg-text-primary/5 text-text-primary flex items-center justify-center gap-3 text-[1.3rem] font-medium px-10 py-4 transition-colors  tracking-wide">
            Contact Support
          </button>
        </div>
      </section>

      <BrandFooter />
    </div>
  );
}
