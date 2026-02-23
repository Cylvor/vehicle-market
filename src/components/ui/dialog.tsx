import * as React from "react";
import * as ReactDOM from "react-dom";
import { X } from "lucide-react";

// Simple context for custom Dialog state
const DialogContext = React.createContext<{
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

export function Dialog({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = React.useState(false);

    // Close on escape key
    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        if (open) {
            document.body.style.overflow = "hidden";
            window.addEventListener("keydown", handleKeyDown);
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [open]);

    return (
        <DialogContext.Provider value={{ open, setOpen }}>
            {children}
        </DialogContext.Provider>
    );
}

export function DialogTrigger({ children, asChild }: { children: React.ReactNode; asChild?: boolean }) {
    const context = React.useContext(DialogContext);
    if (!context) throw new Error("DialogTrigger must be used within a Dialog");

    if (asChild) {
        if (React.isValidElement(children)) {
            return React.cloneElement(children as React.ReactElement<any>, {
                onClick: (e: React.MouseEvent) => {
                    context.setOpen(true);
                    const childProps = (children as React.ReactElement<any>).props;
                    if (childProps.onClick) childProps.onClick(e);
                },
            });
        }
        return <>{children}</>;
    }

    return (
        <span onClick={() => context.setOpen(true)} className="cursor-pointer">
            {children}
        </span>
    );
}

export function DialogContent({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    const context = React.useContext(DialogContext);
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!context) throw new Error("DialogContent must be used within a Dialog");

    if (!context.open || !mounted) return null;

    return ReactDOM.createPortal(
        <div className="fixed inset-0 z-[100000] flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-[100000] bg-slate-900/50 backdrop-blur-sm transition-all animate-in fade-in-0"
                onClick={() => context.setOpen(false)}
            />
            {/* Modal */}
            <div
                role="dialog"
                className={`relative z-[100000] grid w-[90%] max-w-lg gap-4 border border-slate-200 bg-white p-6 shadow-xl animate-in zoom-in-95 duration-200 rounded-md ${className}`}
            >
                <button
                    onClick={() => context.setOpen(false)}
                    className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 bg-white"
                >
                    <X className="h-4 w-4 text-slate-500" />
                    <span className="sr-only">Close</span>
                </button>
                {children}
            </div>
        </div>,
        document.body
    );
}

export function DialogHeader({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={`flex flex-col space-y-1.5 text-center sm:text-left ${className}`}>
            {children}
        </div>
    );
}

export function DialogTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <h2 className={`text-lg font-semibold leading-none tracking-tight ${className}`}>
            {children}
        </h2>
    );
}
