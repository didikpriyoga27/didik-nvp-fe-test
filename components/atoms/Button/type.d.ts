import { ButtonHTMLAttributes } from "react";

export type Variant = "info" | "warning" | "danger" | "success" | "default";

export interface IButtonComponentProps {
  href?: string;
  onClick?: () => void;
  children?: ReactNode;
  className?: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  disabled?: ButtonHTMLAttributes<HTMLButtonElement>["disabled"];
  variant?: Variant;
}

type ButtonVariantsFunction = (props: IButtonComponentProps) => string;
