import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Github, Mail } from "lucide-react";

export default function SignUpPage() {
    return (
        <>
            <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                    Create an account
                </h1>
                <p className="text-sm text-muted-foreground">
                    Enter your email below to create your account
                </p>
            </div>
            <div className="grid gap-6">
                <form>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                placeholder="John Doe"
                                type="text"
                                autoCapitalize="words"
                                autoCorrect="off"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                placeholder="name@example.com"
                                type="email"
                                autoCapitalize="none"
                                autoComplete="email"
                                autoCorrect="off"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" />
                        </div>
                        <Link href="/dashboard">
                            <Button className="w-full">
                                Create Account
                            </Button>
                        </Link>
                    </div>
                </form>
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                            Or continue with
                        </span>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline">
                        <Github className="mr-2 h-4 w-4" />
                        Github
                    </Button>
                    <Button variant="outline">
                        <Mail className="mr-2 h-4 w-4" />
                        Google
                    </Button>
                </div>
            </div>
            <p className="px-8 text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                    href="/auth/signin"
                    className="underline underline-offset-4 hover:text-primary"
                >
                    Sign in
                </Link>
            </p>
        </>
    );
}
