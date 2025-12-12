"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { usePracticeModal } from "@/store/use-practice-modal";

export const PracticeModal = () => {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const { isOpen, close } = usePracticeModal();

    useEffect(() => {
        setIsClient(true);
    }, []);
    
    if (!isClient) {
        return null;
    }

    return (
        <Dialog open={isOpen} onOpenChange={close}>
        <DialogContent className="max-w-md">
            <DialogHeader>
                <div className="flex items-center w-full justify-center mb-5">
                    <Image src="/hearts.png" alt="Hearts" width={80} height={80} />
                </div>
                <DialogTitle className="text-center font-bold text-2xl">
                    Practice Lesson
                </DialogTitle>
                <DialogDescription className="text-center text-base mb-4">
                    Use practice lessons to regain hearts and points.
                </DialogDescription>
                <DialogFooter className="mb-4">
                    <div className="flex flex-col gap-y-4 w-full">
                        <Button variant="primary" className="w-full" size="lg" onClick={close}>
                            I UNDERSTAND
                        </Button>
                    </div>
                </DialogFooter>
            </DialogHeader>
        </DialogContent>
        </Dialog>
    )
}