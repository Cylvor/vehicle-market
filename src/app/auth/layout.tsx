import Link from "next/link";
import { Car } from "lucide-react";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            {/* Left: Branding */}
            <div className="relative hidden lg:flex flex-col bg-muted text-white dark:border-r">
                <div className="absolute inset-0 bg-zinc-900" />
                <Link href="/" className="relative z-20 flex items-center gap-2 text-lg font-medium p-8">
                    <div className="bg-primary text-primary-foreground p-1 rounded-md">
                        <Car className="h-6 w-6" />
                    </div>
                    RideMarket
                </Link>
                <div className="relative z-20 mt-auto p-10">
                    <blockquote className="space-y-2">
                        <p className="text-lg">
                            &ldquo;I sold my car in under 24 hours using RideMarket. The process was seamless and the buyer verification gave me peace of mind.&rdquo;
                        </p>
                        <footer className="text-sm">Sofia Davis</footer>
                    </blockquote>
                </div>
            </div>

            {/* Right: Form */}
            <div className="flex items-center justify-center p-8 bg-background">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    {children}
                </div>
            </div>
        </div>
    );
}
