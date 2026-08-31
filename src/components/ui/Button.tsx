import { Link } from "react-router-dom";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "accent";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-medium rounded-full transition-all duration-200 focus-visible:outline-none disabled:opacity-40 disabled:pointer-events-none whitespace-nowrap tracking-[-0.01em]";

const variants: Record<Variant, string> = {
  primary:
    "bg-foreground text-white hover:bg-[#3a3a3c] active:scale-[0.98]",
  secondary:
    "bg-background-secondary text-foreground hover:bg-[#ebebed] border border-[#d2d2d7]",
  outline:
    "bg-transparent text-foreground border border-[#d2d2d7] hover:border-foreground hover:bg-background-secondary active:scale-[0.98]",
  ghost: "bg-transparent text-foreground hover:bg-background-secondary",
  accent:
    "bg-accent text-white hover:bg-accent-hover active:scale-[0.98]",
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-4 text-[13px]",
  md: "h-10 px-5 text-[13px]",
  lg: "h-12 px-7 text-[15px]",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
};

type AsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { to?: undefined };
type AsLink = CommonProps & {
  to: string;
  onClick?: () => void;
};

export function Button(props: AsButton | AsLink) {
  const {
    variant = "primary",
    size = "md",
    className = "",
    children,
  } = props;
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if ("to" in props && props.to !== undefined) {
    return (
      <Link to={props.to} onClick={props.onClick} className={cls}>
        {children}
      </Link>
    );
  }
  const { variant: _v, size: _s, className: _c, children: _ch, to: _t, ...rest } =
    props as AsButton;
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
