import { X, InfinityIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { useExitModal } from "@/store/use-exit-modal";

// Define a type for the possible course languages to ensure type safety
export type CourseLanguage = "cebuano" | "filipino" | "hiligaynon" | "pangasinan" | "ilocano" | "baybayin";

// Define the mapping from language to flag file name
const flagMap: Record<CourseLanguage, string> = {
    "cebuano": "cebu.jpg",
    "filipino": "ph.png",
    "hiligaynon": "iloilo.png", // Assuming this is for Iloilo (Hiligaynon/Ilonggo region)
    "pangasinan": "pangasinan.png",
    "ilocano": "ilocano.png",
    "baybayin": "baybayin.png",
};

type Props = {
    hearts: number;
    percentage: number;
    hasActiveSubscription: boolean;
    // New prop to determine which flag to display
    courseLanguage: CourseLanguage; 
};

export const Header = ({ hearts, percentage, hasActiveSubscription, courseLanguage }: Props) => {
    const { open } = useExitModal();

    // Get the correct flag filename based on the courseLanguage prop
    const flagFileName = flagMap[courseLanguage];
    // Construct the full path to the flag image
    const flagSrc = `/flags/${flagFileName}`;

    return (
        <header className="lg:pt-[50px] pt-[20px] px-10 flex gap-x-7 items-center justify-between max-w-[1140px] mx-auto w-full">
            <Image 
            // Use the dynamically determined flag source
            src={flagSrc}
            alt={`${courseLanguage} flag`}
            height={32} // Added height and width for optimization and layout
            width={48}
            className="rounded-md" // Optional: Add a subtle border radius
            />
            <X 
            onClick={open}
            className="text-slate-500 hover:opacity-75 transition cursor-pointer "
            />
            <Progress value={percentage}/>
            <div className="text-rose-500 flex items-center font-bold">
                <Image
                src="/hearts.png"
                height={28}
                width={28}
                alt="Hearts Icon"
                className="mr-2"
                />
                {hasActiveSubscription ? <InfinityIcon className="h-6 w-6 stroke-[3]" /> : hearts}
            </div>
        </header>
    )
};