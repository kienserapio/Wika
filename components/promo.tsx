"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
 

export const Promo = () => {
    return (
        <div className="border-2 rounded-xl p-4 space-y-4">
            <div className="space-y-2">
                <div className="flex items-center gap-x-2">
                    <Image 
                    src="/hearts.png"
                    alt="Hearts"
                    height={26}
                    width={26}
                    />
                    <h3 className="font-bold text-lg">
                        Check out the Wika Shop!
                    </h3>
                </div>
                <p className="text-muted-foreground">
                    Refill your hearts and more!
                </p>
            </div>
                <Button 
                asChild
                variant="secondary"
                className="w-full"
                size="lg"
                >
                <Link href="/shop">
                    CHECK OUT SHOP
                 </Link>
                </Button>
        </div>
    )
}