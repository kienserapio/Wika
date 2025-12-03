import { StickyWrapper } from "@/components/sticky-wrapper";
import { FeedWrapper } from "@/components/feed-wrapper";
import { Header } from "./header";
import { UserProgress } from "@/components/user-progress";
<<<<<<< HEAD
import { redirect } from "next/dist/client/components/navigation";
import { getLessonPercentage, getCourseProgress, getUnits, getUserProgress } from "@/db/queries";
import { Unit } from "./unit";

const LearnPage = async () => {
  const userProgressData = getUserProgress();
  const courseProgressData = getCourseProgress();
  const lessonPercentageData = getLessonPercentage();
  const unitsData = getUnits();

  const [userProgress, units, courseProgress, lessonPercentage ] = await Promise.all([userProgressData, unitsData, courseProgressData, lessonPercentageData]);
=======
import { userProgress } from '../../../db/schema';
import { redirect } from "next/dist/client/components/navigation";
import { getUserProgress } from "@/db/queries";

const LearnPage = async () => {
  const userProgressData = getUserProgress();

  const [userProgress] = await Promise.all([userProgressData]);
>>>>>>> 0b8c208 (Initial commit w/ NextJS and Neon)

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

<<<<<<< HEAD
  if (!courseProgress) {
    redirect("/courses");
  }

=======
>>>>>>> 0b8c208 (Initial commit w/ NextJS and Neon)
  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
        <StickyWrapper>
            <UserProgress
            activeCourse={userProgress.activeCourse}
            hearts={userProgress.hearts}
            points={userProgress.points}
            hasActiveSubscription={false}
            />
        </StickyWrapper>
        <FeedWrapper>
            <Header title={userProgress.activeCourse.title}/>
<<<<<<< HEAD
            {units.map((unit) => (
                <div key={unit.id} className="mb-10"> 
                <Unit 
                id={unit.id}
                order={unit.order}
                description={unit.description}
                title={unit.title}
                lessons={unit.lessons}
                activeLesson={courseProgress.activeLesson}
                activeLessonPercentage={lessonPercentage}
                />
                </div>
            ))}
=======
>>>>>>> 0b8c208 (Initial commit w/ NextJS and Neon)
       </FeedWrapper>
    </div>
  );
}

export default LearnPage;