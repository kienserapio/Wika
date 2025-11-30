"use client";

import { challenges, challengeOptions } from "@/db/schema";
import { Header } from "./header";
import { useState, useTransition } from "react";
import { QuestionBubble } from "./question-bubble";
import { Challenge } from "./challenge";
import { Footer } from "./footer";
import { upsertChallengeProgress } from "@/actions/challenge-progress";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Props = {
    initialPercentage: number;
    initialHearts: number;
    initialLessonId: number;
    initialLessonChallenges: (typeof challenges.$inferSelect & {
        completed: boolean;
        challengeOptions: typeof challengeOptions.$inferSelect[];
    })[];
    userSubscription: any;
};

export const Quiz = ({
    initialPercentage,
    initialHearts,
    initialLessonId,
    initialLessonChallenges,
    userSubscription,
}: Props) => {
    const router = useRouter();
    const [pending, startTransition] = useTransition(); 

    const [hearts, setHearts] = useState(initialHearts);
    const [percentage, setPercentage] = useState(initialPercentage);
    const [challenges] = useState(initialLessonChallenges);
    const [activeIndex, setActiveIndex] = useState(() => {
        const uncompletedIndex = challenges.findIndex((challenge) => !challenge.completed);
        return uncompletedIndex === -1 ? 0 : uncompletedIndex;
    });

    const [selectedOption, setSelectedOption] = useState<number>();
    const [status, setStatus] = useState<"correct" | "wrong" | "none" | "completed">("none");
    
    const challenge = challenges[activeIndex];
    const options = challenge?.challengeOptions ?? [];

    const onNext = () => {
        setActiveIndex((current) => current + 1);
    };

    const onSelect = (id: number) => {
        if (status !== "none") return;
        setSelectedOption(id);
    };

    const onContinue = () => {        
        if (!selectedOption) return;

        if (status === "wrong") {
            setStatus("none");
            setSelectedOption(undefined);
            return;
        }

        if (status === "correct") {
            onNext();
            setStatus("none");
            setSelectedOption(undefined);
            return;
        }

        if (status === "completed") {
            router.push("/learn");
            return;
        }

        const correctOption = options.find((option) => option.correct);
        if (!correctOption) return;

        if (correctOption && correctOption.id === selectedOption) {
            startTransition(() => {
                upsertChallengeProgress(challenge.id).then((response) => {
                    if (response?.error === "hearts") {
                        console.log("No hearts left");
                        return;
                    }

                    setStatus("correct");
                    setPercentage((prev) => prev + 100 / challenges.length);

                    if (initialPercentage === 100) {
                        setHearts((prev) => Math.min(prev + 1, 5));
                    }

                    // Check if this was the last challenge
                    if (activeIndex === challenges.length - 1) {
                        setStatus("completed");
                    }
                })
                .catch(() => toast.error("An error occurred while updating progress."))
            });
            
        } else {
            setStatus("wrong");
            if (!userSubscription?.isActive) {
                setHearts((prev) => Math.max(prev - 1, 0));
            }
        }
    };

    // Guard against undefined challenge
    if (!challenge) {
        return (
            <>
                <Header 
                    hearts={hearts}
                    percentage={100}
                    hasActiveSubscription={!!userSubscription?.isActive}
                />
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold mb-4">Lesson Complete!</h1>
                        <p className="text-neutral-600">Redirecting to learn page...</p>
                    </div>
                </div>
                <Footer 
                    disabled={false}
                    status="completed"
                    onCheck={() => router.push("/learn")}
                    lessonId={initialLessonId}
                />
            </>
        );
    }

    const title = challenge.type === "ASSIST" ? "Select the Correct Meaning!" : challenge.question;

    return (
        <> 
        <Header 
            hearts={hearts}
            percentage={percentage}
            hasActiveSubscription={!!userSubscription?.isActive}
        />
        <div className="flex-1">
            <div className="h-full flex items-center justify-center">
                <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12">
                    <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700">
                        {title}
                    </h1>
                    <div>
                        {challenge.type === "ASSIST" && (
                            <QuestionBubble question={challenge.question} />
                        )}
                        <Challenge 
                            options={options}
                            onSelect={onSelect}
                            status={status}
                            selectedOption={selectedOption}
                            disabled={pending}
                            type={challenge.type}
                        />
                    </div>
                </div>
            </div>
        </div>
        <Footer 
            disabled={!selectedOption || pending}
            status={status}
            onCheck={onContinue}
            lessonId={initialLessonId}
        />
        </>
    )
};

export default Quiz;