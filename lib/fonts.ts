// utils/fonts.ts
import localFont from "next/font/local";

export const acidGroteskFont = localFont({
  src: [
    {
      path: "../public/fonts/FFF_AcidGrotesk_Regular-s.ec71d0d5.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/FFF_AcidGrotesk_Medium-s.a3f6ca65.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/FFF_AcidGrotesk_Bold-s.49a3bd75.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
});