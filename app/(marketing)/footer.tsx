import { Button } from "@/components/ui/button";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2">
      <div className="max-w-screen-lg mx-auto flex items-center justify-evenly h-full">
        <Button size="lg" variant="ghost">
        <Image 
          src="/flags/ph.png"
          alt="Philippines"
          height={32}
          width={36}
          className="mr-4 rounded-md"
        />
        FILIPINO
        </Button>

        <Button size="lg" variant="ghost">
        <Image 
          src="/flags/baybayin.png"
          alt="Baybayin"
          height={32}
          width={36}
          className="mr-4 rounded-md"
        />
        BAYBAYIN
        </Button>

        <Button size="lg" variant="ghost">
        <Image 
          src="/flags/cebu.jpg"
          alt="Cebuano"
          height={32}
          width={36}
          className="mr-4 rounded-md"
        />
        CEBUANO
        </Button>
        
        <Button size="lg" variant="ghost">
        <Image 
          src="/flags/ilocano.png"
          alt="Ilocano"
          height={32}
          width={36}
          className="mr-4 rounded-md"
        />
        ILOCANO
        </Button>

        <Button size="lg" variant="ghost">
        <Image 
          src="/flags/pangasinan.png"
          alt="Pangasinan"
          height={32}
          width={36}
          className="mr-4 rounded-md"
        />
        PANGASINAN
        </Button>

        <Button size="lg" variant="ghost">
        <Image 
          src="/flags/iloilo.png"
          alt="Hiligaynon"
          height={32}
          width={36}
          className="mr-4 rounded-md"
        />
        HILIGAYNON
        </Button>

      </div>
    </footer>
  );
}