import { getLesson, getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";
import { Quiz } from "../quiz";

type Props = {
    params: {
        lessonId: string;
    };
};


const LessonIdPage = async ({ params }: Props) => {
    const lessonIdNum = Number(params.lessonId);
    const lessonData = getLesson(lessonIdNum);
    const userProgressData = getUserProgress();

    const [lesson, userProgress,] = await Promise.all([lessonData, userProgressData]);

    if (!lesson || !userProgress || !userProgress.activeCourse) {
        redirect("/learn");
    }

    const initialPercentage = lesson.challenges.filter((challenge) => challenge.completed).length
    / lesson.challenges.length * 100;

    return (
        <Quiz 
        initialLessonId={lesson.id}
        initialLessonChallenges={lesson.challenges}
        initialHearts={userProgress.hearts}
        initialPercentage={initialPercentage}
        userSubscription={null}
        courseTitle={userProgress.activeCourse.title}
        />
    )
};

export default LessonIdPage;