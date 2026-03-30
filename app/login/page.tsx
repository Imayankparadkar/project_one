"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Camera, ChevronLeft, HelpCircle, Check } from "lucide-react";
import GeometricBackground from "@/components/layout/GeometricBackground";
import { signIn } from "next-auth/react";

/** Exact Whop Logo Approximation */
const WhopLogo = () => (
    <div className="flex items-center justify-center animate-in fade-in duration-700">
        <svg width="82" height="60" viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 10L35 50L50 25L65 50L90 10" stroke="#FF4F17" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    </div>
);

const MOCK_DB = {
    users: [
        { email: "test@example.com", username: "testuser" },
        { email: "admin@bennybucks.in", username: "admin" },
        { email: "creator@gmail.com", username: "creator123" }
    ],
    takenUsernames: ["shivam", "admin", "testuser", "creator123", "benny", "bucks"]
};

// Dummy login credentials
const DUMMY_LOGIN = {
    email: "demo@bennybucks.in",
    otp: "123456",
};

type StepType = "email" | "otp" | "name" | "username" | "dob" | "profile_image";

export default function LoginPage() {
    const [step, setStep] = useState<StepType>("email");
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [name, setName] = useState("");
    const [username, setUsername] = useState("bennybucks.in/@");
    const [dob, setDob] = useState("");
    const [profileImage, setProfileImage] = useState<string | null>(null);

    // New states for username check
    const [isUsernameAvailable, setIsUsernameAvailable] = useState<boolean | null>(null);
    const [suggestions, setSuggestions] = useState<string[]>([]);

    const [isLoading, setIsLoading] = useState(false);
    const [otpError, setOtpError] = useState("");
    const router = useRouter();
    const searchParams = useSearchParams();

    const requestedNext = searchParams.get("next") || "/home";
    const nextPath = requestedNext.startsWith("/") ? requestedNext : "/home";

    const goNext = (nextStep: StepType) => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setStep(nextStep);
        }, 600);
    };

    const goBack = () => {
        const history: Record<StepType, StepType> = {
            "otp": "email",
            "name": "otp",
            "username": "name",
            "dob": "username",
            "profile_image": "dob",
            "email": "email"
        };
        setStep(history[step]);
    };

    const handleEmailSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setOtpError("");
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setStep("otp");
        }, 600);
    };

    const handleOtpSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const enteredOtp = otp.join("");
        if (enteredOtp.length !== 6) return;

        setIsLoading(true);
        setOtpError("");

        setTimeout(() => {
            const normalizedEmail = email.trim().toLowerCase();
            const isDummyLogin =
                normalizedEmail === DUMMY_LOGIN.email &&
                enteredOtp === DUMMY_LOGIN.otp;

            if (!isDummyLogin) {
                setIsLoading(false);
                setOtpError("Invalid email or OTP");
                return;
            }

            // local dummy session
            document.cookie = "dummy_auth=1; Path=/; Max-Age=86400; SameSite=Lax";
            setIsLoading(false);
            router.replace(nextPath);
        }, 400);
    };

    const handleOtpChange = (index: number, value: string) => {
        if (value.length > 1) {
            const pastedData = value.replace(/\D/g, "").split("").slice(0, 6);
            const newOtp = [...otp];
            pastedData.forEach((char, i) => {
                if (i < 6) newOtp[i] = char;
            });

            setOtp(newOtp);
            const nextIndex = Math.min(pastedData.length, 5);
            document.getElementById(`otp-${nextIndex}`)?.focus();
            return;
        }

        const digit = value.replace(/\D/g, "");
        const newOtp = [...otp];
        newOtp[index] = digit;
        setOtp(newOtp);

        if (digit !== "" && index < 5) {
            document.getElementById(`otp-${index + 1}`)?.focus();
        }
    };

    const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && otp[index] === "" && index > 0) {
            document.getElementById(`otp-${index - 1}`)?.focus();
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setProfileImage(url);
        }
    };

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        await signIn("google", { callbackUrl: nextPath });
    };

    const handleFinalSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();
        setIsLoading(true);

        document.cookie = "dummy_auth=1; Path=/; Max-Age=86400; SameSite=Lax";

        setTimeout(() => {
            setIsLoading(false);
            router.replace(nextPath);
        }, 300);
    };

    // Username check logic

    useEffect(() => {
        const timer = setTimeout(() => {
            const cleanUser = username.replace("bennybucks.in/@", "").trim().toLowerCase();
            if (!cleanUser) {
                setIsUsernameAvailable(null);
                setSuggestions([]);
                return;
            }

            const taken = MOCK_DB.takenUsernames.includes(cleanUser);
            setIsUsernameAvailable(!taken);

            if (taken) {
                setSuggestions([
                    `${cleanUser}_1`,
                    `${cleanUser}__`,
                    `real_${cleanUser}`
                ]);
            } else {
                setSuggestions([]);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [username, step]);

    const isProfileStep = (step === "name" || step === "username" || step === "dob" || step === "profile_image");

    const bgStyles = "relative min-h-screen bg-[#0d0d0d] flex flex-col items-center justify-center p-4 selection:bg-[#FF4F17]/30";
    const cardStyles = "w-full max-w-[390px] bg-[#1a1a1a] rounded-[1.8rem] pt-12 pb-10 px-10 relative z-10 flex flex-col items-center shadow-2xl border border-[#ffffff1b]";
    const labelStyles = "text-sm font-normal text-[#ffffffaf] mb-1.5 ml-0.5 block tracking-wide";
    const inputStyles = "placeholder-[#ffffffaf] w-full bg-[#111111] border border-[#222] focus:border-[#2b65e6] rounded-xl px-4 py-3 text-white placeholder:text-[#444] outline-none transition-all text-md font-normal";
    const primaryButtonStyles = "w-full bg-[#1f5ce9] hover:bg-[#1848cc] text-white font-semibold text-lg rounded-xl py-3 mt-4 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center h-[46px]";
    const socialIconBoxStyles = "w-full bg-white rounded-xl flex items-center justify-center transition-colors cursor-pointer group shadow-sm h-[46px]";
    const headingStyles = "text-[25px] font-semibold text-center text-white mb-8 tracking-tight";
    const subHeadingStyles = "text-[#ffffffaf] text-center mb-8 text-[13px] font-medium -mt-6";

    // New styles for profile steps
    const profileHeadingStyles = "text-[32px] font-extrabold tracking-tight text-white mb-2 leading-tight";
    const profileSubHeadingStyles = "text-[#ffffffaf] text-base leading-relaxed mb-8";

    return (
        <div className={bgStyles}>
            <GeometricBackground />

            {isProfileStep ? (
                /* Profile Design */
                <div className="relative z-10 w-full max-w-lg px-6 ">
                    {/* Back Button */}
                    <button
                        onClick={goBack}
                        className="absolute -top-20 left-6 text-[#555] hover:text-white transition-colors bg-transparent z-20"
                        title="Go back"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    {/* Logo */}
                    <div className="flex justify-center mb-16">
                        <WhopLogo />
                    </div>

                    {/* Form Content */}
                    <div className="space-y-6">
                        {/* Header */}
                        <div className="flex items-start justify-between">
                            <div className="space-y-2">
                                <h1 className={profileHeadingStyles}>
                                    {step === "name" && "What's your name?"}
                                    {step === "username" && "Pick a username"}
                                    {step === "dob" && "When's your birthday?"}
                                    {step === "profile_image" && "Add a profile photo"}
                                </h1>
                                <p className={profileSubHeadingStyles}>
                                    {step === "name" && "This will show on your profile and help others know who you are 🎉"}
                                    {step === "username" && "It's like claiming your Instagram handle in 2012 ⚡"}
                                    {step === "dob" && "We need this to verify your identity and show you relevant content."}
                                    {step === "profile_image" && "A photo helps your friends recognize you!"}
                                </p>
                            </div>
                            <button className="mt-2 text-[#ffffffaf] hover:text-white transition-colors">
                                <HelpCircle className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Input Field Area */}
                        <div className="pt-2 relative">
                            {step === "name" && (
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="John Appleseed"
                                    required
                                    autoFocus
                                    className={`${inputStyles} h-12 text-base`}
                                    onKeyDown={(e) => e.key === "Enter" && goNext("username")}
                                />
                            )}
                            {step === "username" && (
                                <div className="space-y-3">
                                    <div className="relative flex items-center">
                                        <input
                                            type="text"
                                            value={username}
                                            onChange={(e) => {
                                                setUsername(e.target.value.toLowerCase());
                                                setIsUsernameAvailable(null);
                                            }}
                                            placeholder="username"
                                            required
                                            autoFocus
                                            className={`${inputStyles} h-12 text-base pr-12 transition-all ${isUsernameAvailable === false ? "border-[#ea4335] focus:border-[#ea4335]" : ""}`}
                                            onKeyDown={(e) => e.key === "Enter" && isUsernameAvailable && goNext("dob")}
                                        />
                                        {isUsernameAvailable && (
                                            <div className="absolute right-4 text-[#34a853] animate-in zoom-in duration-300">
                                                <Check className="w-6 h-6" strokeWidth={3} />
                                            </div>
                                        )}
                                    </div>

                                    {isUsernameAvailable === false && suggestions.length > 0 && (
                                        <div className="flex flex-wrap gap-2 animate-in fade-in slide-in-from-top-2 duration-500">
                                            <p className="w-full text-sm text-[#ea4335] mb-1">Username is taken. Try these:</p>
                                            {suggestions.map((s) => (
                                                <button
                                                    key={s}
                                                    type="button"
                                                    onClick={() => {
                                                        setUsername(`bennybucks.in/@${s}`);
                                                        setIsUsernameAvailable(null);
                                                    }}
                                                    className="px-3 py-1.5 rounded-full bg-[#ffffff0a] border border-[#ffffff1a] text-sm text-[#ffffffaf] hover:bg-[#ffffff1a] hover:text-white transition-all"
                                                >
                                                    @{s}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                            {step === "dob" && (
                                <input
                                    type="date"
                                    value={dob}
                                    onChange={(e) => setDob(e.target.value)}
                                    required
                                    className={`${inputStyles} h-12 text-base [color-scheme:dark]`}
                                    onKeyDown={(e) => e.key === "Enter" && goNext("profile_image")}
                                />
                            )}
                            {step === "profile_image" && (
                                <div className="flex flex-col items-center gap-6 py-4">
                                    <div className="relative group cursor-pointer">
                                        <input type="file" accept="image/*" id="profile-upload" className="hidden" onChange={handleImageUpload} />
                                        <label htmlFor="profile-upload" className="block w-32 h-32 rounded-3xl border border-dashed border-[#ffffff33] group-hover:border-[#2b65e6] overflow-hidden flex items-center justify-center bg-[#111111] transition-all cursor-pointer">
                                            {profileImage ? <Image src={profileImage} alt="Profile" width={128} height={128} className="w-full h-full object-cover" unoptimized /> : <Camera className="w-10 h-10 text-[#ffffff44] group-hover:text-white" />}
                                        </label>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Fixed Next Button */}
                        <div className="pt-2">
                            <button
                                onClick={() => {
                                    if (step === "name") goNext("username");
                                    else if (step === "username") goNext("dob");
                                    else if (step === "dob") goNext("profile_image");
                                    else if (step === "profile_image") handleFinalSubmit();
                                }}
                                disabled={isLoading || (step === "name" && !name) || (step === "username" && (!username || !isUsernameAvailable)) || (step === "dob" && !dob)}
                                className={`${primaryButtonStyles} h-12 text-base font-bold`}
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                ) : (
                                    step === "profile_image" ? "Finish" : "Next"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                /* Card Design for Email/OTP */
                <div className={cardStyles}>
                    {step !== "email" && (
                        <button
                            onClick={goBack}
                            className="absolute top-8 left-8 text-[#555] hover:text-white transition-colors bg-transparent z-20"
                            title="Go back"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                    )}

                    <div className="mb-5">
                        <WhopLogo />
                    </div>

                    {/* Email Step */}
                    {step === "email" && (
                        <div className="w-full animate-in fade-in duration-500">
                            <h1 className={headingStyles}>
                                Enter your email
                            </h1>
                            <form onSubmit={handleEmailSubmit} className="space-y-4 w-full">
                                <div className="w-full">
                                    <label className={labelStyles}>Email</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="johnappleseed@gmail.com"
                                        required
                                        autoFocus
                                        className={inputStyles}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={isLoading || !email}
                                    className={primaryButtonStyles}
                                >
                                    {isLoading ? (
                                        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                    ) : "Continue"}
                                </button>
                            </form>

                            <div className="relative flex items-center py-6 w-full">
                                <div className="flex-grow border-t text-[#999] border-[#262626]"></div>
                                <span className="flex-shrink-0 mx-3 text-sm font-black font-normal uppercase">OR</span>
                                <div className="flex-grow border-t border-[#262626]"></div>
                            </div>

                            <div className="flex justify-center w-full">
                                <button className={socialIconBoxStyles}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                    </svg>
                                </button>
                            </div>

                            <div className="mt-8 text-center animate-in fade-in duration-700 delay-300">
                                <p className="text-sm text-[#ffffffaf] leading-relaxed font-normal">
                                    By signing in you agree to Whop&apos;s <br />
                                    <Link href="#" className="underline text-[#ffffffaf] hover:text-white transition-colors">Terms of Service</Link> and <Link href="#" className="underline text-[#ffffffaf] hover:text-white transition-colors">Privacy Policy</Link>.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* OTP Step */}
                    {step === "otp" && (
                        <div className="w-full animate-in fade-in duration-500 ">
                            <h1 className={headingStyles}>Verify email</h1>
                            <p className={subHeadingStyles}>Enter the 6-digit code sent to your email</p>

                            <p className="text-center text-xs text-[#ffffff8f] -mt-4 mb-4">
                                Demo login: <span className="text-white">demo@bennybucks.in</span> / OTP <span className="text-white">123456</span>
                            </p>

                            <form onSubmit={handleOtpSubmit} className="space-y-8 w-full">
                                <div className="flex justify-between gap-1.5">
                                    {otp.map((digit, i) => (
                                        <input
                                            key={i}
                                            id={`otp-${i}`}
                                            type="text"
                                            inputMode="numeric"
                                            maxLength={1}
                                            value={digit}
                                            onChange={(e) => handleOtpChange(i, e.target.value)}
                                            onKeyDown={(e) => handleOtpKeyDown(i, e)}
                                            className="w-full aspect-square text-center text-xl font-bold bg-[#111111] border border-[#222] focus:border-[#2b65e6] rounded-xl text-white outline-none transition-all"
                                        />
                                    ))}
                                </div>
                                <button
                                    type="submit"
                                    disabled={isLoading || otp.join("").length !== 6}
                                    className={primaryButtonStyles}
                                >
                                    {isLoading ? <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : "Verify Code"}
                                </button>
                            </form>

                            {otpError && (
                                <p className="mt-3 text-center text-sm text-red-400">{otpError}</p>
                            )}

                            <div className="mt-6 text-center">
                                <button
                                    type="button"
                                    className="text-[13px] text-[#ffffff8f] hover:text-white transition-colors"
                                >
                                    Didn&apos;t receive a code? <span className="text-[#2b65e6] font-semibold">Resend</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
