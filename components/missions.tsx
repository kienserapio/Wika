import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

import { Progress } from "@/components/ui/progress"
import { missions } from "@/constants";

type Props = {
    points: number;
};
 

export const Missions = ({ points }: Props) => {
    return (
        <div className="border-2 rounded-xl p-4 space-y-4">
            <div className="flex items-center justify-between w-full space-y-2">
                <h3 className="font-bold text-lg">
                    Missions
                </h3>
                <Link href="/missions">
                <Button
                size="sm"
                variant="primaryOutline"
                >
                    View All
                </Button>
                </Link>
            </div>
            <ul className="w-full space-y-4">
                {missions.map((mission) => {
                    const progress = (points / mission.value) * 100;
                    return (
                        <div key={mission.title}
                        className="flex items-center w-full pb-4 gap-x-3">
                            <Image 
                            src="/points.png"
                            alt="Points"
                            height={60}
                            width={60}
                            />
                            <div className="flex flex-col gap-y-2 w-full">
                            <p className="text-neutral-700 text-sm font-bold">
                                {mission.title}
                            </p>
                            <Progress 
                            value={progress}
                            className="h-2" 
                            />
                            </div>
                        </div>
                    )
                })}
            </ul>
        </div>
    )
}