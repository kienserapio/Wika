import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import LearnPage from "../(main)/learn/page";
export default function Home() {
  return (
    <div className="overflow-x-hidden w-full min-h-screen">

        {/* Small decorative circles (sides) */}
        {/* <div className="absolute top-[100px] left-[-80px] w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] bg-[#FFA345] rounded-full opacity-100 z-0 pointer-events-none" />
        <div className="absolute top-[500px] left-[-70px] w-[100px] h-[100px] sm:w-[100px] sm:h-[100px] bg-[#624185] rounded-full opacity-100 z-0 pointer-events-none" />
        <div className="absolute bottom-[-40px] right-[-36px] w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] bg-[#FFA345] rounded-full opacity-100 z-0 pointer-events-none" />
        <div className="absolute top-[12%] right-[-60px] w-[72px] h-[72px] sm:w-[88px] sm:h-[88px] bg-[#624185] rounded-full opacity-100 z-0 pointer-events-none" /> */}

        {/* Main content */}
        <main className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-6 pt-2 pb-16 font-sans text-center">
          {/* WIKA Logo */}
          <div className="flex flex-col items-center">
            <img
              src="/wika logo.png"
              alt="WIKA Logo"
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 object-contain"
            />
          </div>

          {/* Main heading */}
          <h1 className="text-5xl sm:text-3xl md:text-[64px] font-bold text-[#624185] text-center max-w-xs sm:max-w-2xl md:max-w-5xl mb-4 leading-none">
            Learn the Filipino Languages!
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg md:text-[24px] text-center max-w-xs sm:max-w-xl md:max-w-3xl mb-8 font-semibold text-neutral-800 spacing-tighter">
            Explore, Connect, and Embody the Philippines with Wika.
          </p>

          <div className="flex w-full max-w-[540px] flex-col sm:flex-row items-center justify-center gap-3 mb-10">
            <SignUpButton mode="modal" forceRedirectUrl="/learn">
              <Button variant="primary" size="lg" className="w-full sm:w-[230px]">
                LEARN NOW
              </Button>
            </SignUpButton>

            <SignInButton mode="modal" forceRedirectUrl="/learn">
              <Button variant="secondaryOutline" size="lg" className="w-full sm:w-[230px]">
                CONTINUE LEARNING
              </Button>
            </SignInButton>
          </div>

          {/* Phone mockup */}
          <div className="relative w-full max-w-[260px] sm:max-w-sm md:max-w-sm mx-auto mb-16 z-10">
            <div className="relative aspect-[9/19] bg-black rounded-[2rem] sm:rounded-[3rem] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.6)] border-4 sm:border-8 border-gray-800 overflow-hidden">
              {/* Phone notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-5 sm:h-7 bg-black rounded-b-3xl z-10" />

              {/* Phone screen content placeholder - replace src with your mockup */}
              <div className="w-full h-full bg-white flex items-center justify-center">
                <img
                  src="/wika mockup.png"
                  alt="WIKA App Mockup"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </main>
    </div>
  );
}
