import { forwardRef } from "react";
import type {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";

/* ---------- Button ---------- */
type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";

const buttonVariants: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-600 shadow-md transition-all",
  secondary:
    "bg-secondary text-slate-900 font-bold hover:bg-white transition-all shadow-md",
  outline:
    "border border-line bg-card text-ink hover:border-secondary transition-colors",
  ghost: "text-ink hover:bg-primary/10 transition-colors",
  danger: "bg-danger text-white hover:opacity-90 transition-all",
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary disabled:pointer-events-none disabled:opacity-60",
        buttonVariants[variant],
        className
      )}
      {...props}
    />
  )
);
Button.displayName = "Button";

/* ---------- Label ---------- */
export const Label = forwardRef<HTMLLabelElement, LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        "block text-xs font-bold uppercase tracking-wider text-ink/80 mb-2",
        className
      )}
      {...props}
    />
  )
);
Label.displayName = "Label";

/* ---------- Input ---------- */
export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "w-full px-4 py-3 rounded-xl border border-line bg-surface text-ink placeholder:text-ink/40 focus:outline-none focus:border-secondary transition-colors",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";

/* ---------- Textarea ---------- */
export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "w-full px-4 py-3 rounded-xl border border-line bg-surface text-ink placeholder:text-ink/40 focus:outline-none focus:border-secondary transition-colors",
      className
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";

/* ---------- Select ---------- */
export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        "w-full px-4 py-3 rounded-xl border border-line bg-surface text-ink focus:outline-none focus:border-secondary transition-colors",
        className
      )}
      {...props}
    />
  )
);
Select.displayName = "Select";

/* ---------- Badge ---------- */
type BadgeTone = "primary" | "success" | "warning" | "danger" | "neutral";
const badgeTones: Record<BadgeTone, string> = {
  primary: "bg-primary/10 text-primary dark:text-secondary",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  danger: "bg-danger/10 text-danger",
  neutral: "bg-ink/5 text-ink/70",
};

export function Badge({
  tone = "primary",
  className,
  children,
}: {
  tone?: BadgeTone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold",
        badgeTones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

/* ---------- Card ---------- */
export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-line bg-card shadow-sm",
        className
      )}
    >
      {children}
    </div>
  );
}
