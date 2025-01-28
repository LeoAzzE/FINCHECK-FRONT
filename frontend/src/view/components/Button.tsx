import { ComponentProps } from "react";
import { cn } from "../../app/utils/cn";
import { Spinner } from "./Spinner";

interface ButtonProps extends ComponentProps<"button"> {
    isLoading?: boolean;
}

export function Button({
    className,
    children,
    isLoading,
    disabled,
    ...props
}: ButtonProps) {
    return (
        <button
            disabled={disabled || isLoading}
            {...props}
            className={cn(
                "bg-teal-900 hover:bg-teal-800 disabled:cursor-not-allowed disabled:bg-transparent disabled:text-gray-400 px-6 h-12 rounded-2xl font-medium text-white transition-all flex items-center justify-center ",
                className
            )}
        >
            {!isLoading && children}
            {isLoading && <Spinner className="w-6 h-6" />}
        </button>
    );
}
