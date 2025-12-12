import { StickyWrapper } from '@/components/sticky-wrapper';
import { UserProgress } from '@/components/user-progress';
import { getTopTenUsers, getUserProgress } from '@/db/queries';
import { redirect } from 'next/navigation';
import { FeedWrapper } from '@/components/feed-wrapper';
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';
import { Promo } from '@/components/promo';
import { missions } from '@/constants';

const MissionsPage = async () => {
    const userProgressData = getUserProgress();

    const [userProgress] = await Promise.all([userProgressData]);

    if (!userProgress || !userProgress.activeCourse) {
        redirect("/courses");
    }

    return (
        <div className="flex flex-row-reverse gap-[48px] px-6">
            <StickyWrapper>
                <UserProgress 
                    activeCourse={userProgress.activeCourse}
                    hearts={userProgress.hearts}
                    points={userProgress.points}
                    hasActiveSubscription={false}
                />
            <Promo />
            </StickyWrapper>
            <FeedWrapper>
                <div className="w-full flex flex-col items-center">
                    <Image 
                    src="/icon.png"
                    alt="Missions"
                    height={90}
                    width={90}
                    />
                    <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
                        Mission
                    </h1>
                    <p className="text-muted-foreground text-center text-lg mb-6">
                        Complete missions to earn points and hearts!
                    </p>
                    <ul className="w-full">
                        {missions.map((mission) => {
                            const progress = (userProgress.points / mission.value) * 100;
                            return (
                                <div key={mission.title}
                                className="flex items-center w-full p-4 gap-x-4 border-t-2">
                                    <Image 
                                    src="/points.png"
                                    alt="Points"
                                    height={60}
                                    width={60}
                                    />
                                    <div className="flex flex-col gap-y-2 w-full">
                                    <p className="text-neutral-700 text-xl font-bold">
                                        {mission.title}
                                    </p>
                                    <Progress 
                                    value={progress}
                                    className="h-3" 
                                    />
                                    </div>
                                </div>
                            )
                        })}
                    </ul>
                </div>
            </FeedWrapper>
        </div>
    );
};

export default MissionsPage;