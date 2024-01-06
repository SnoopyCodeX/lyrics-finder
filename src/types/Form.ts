/* eslint-disable @typescript-eslint/no-explicit-any */

export type FormProps = {
    onSubmit: any;
    children: React.ReactNode;
    className?: any;
};

export type TextInputProps = {
    placeholder: string;
    name: string;
    disabled?: boolean;
    validator?: any;
    default?: string;
    className?: string;
};

export type ActionProps = {
    children: React.ReactNode;
    disabled?: boolean;
    onClick?: () => void;
};