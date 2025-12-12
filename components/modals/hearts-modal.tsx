"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useHeartsModal } from "@/store/use-hearts-modal";

export const HeartsModal = () => {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const { isOpen, close } = useHeartsModal();

    useEffect(() => {
        setIsClient(true);
    }, []);

    const onClick = () => {
        close();
        router.push("/shop");
    }
    
    if (!isClient) {
        return null;
    }

    return (
        <Dialog open={isOpen} onOpenChange={close}>
        <DialogContent className="max-w-md">
            <DialogHeader>
                <div className="flex items-center w-full justify-center mb-5">
                    <Image src="/icon.png" alt="Mascot" width={80} height={80} />
                </div>
                <DialogTitle className="text-center font-bold text-2xl">
                    You ran out of hearts!
                </DialogTitle>
                <DialogDescription className="text-center text-base mb-4">
                    Get more hearts to continue your learning journey.
                </DialogDescription>
                <DialogFooter className="mb-4">
                    <div className="flex flex-col gap-y-4 w-full">
                        <Button variant="primary" className="w-full" size="lg" onClick={onClick}>
                            Get more hearts
                        </Button>
                        <Button variant="primaryOutline" className="w-full" size="lg" onClick={close}>
                            Maybe later
                        </Button>
                    </div>
                </DialogFooter>
            </DialogHeader>
        </DialogContent>
        </Dialog>
    )
}