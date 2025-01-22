/* eslint-disable @typescript-eslint/no-empty-object-type */
import { ComponentProps } from "react";

interface InputProps extends ComponentProps<"input"> {}

export function Input(props: InputProps) {
    return (
        <input
            className="bg-white rounded-lg border border-gray-500 px-3 h-[52px] text-gray-800"
            {...props}
        />
    );
}
