import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Icons } from "../icons";

const button = cva(
  "relative p-2 disabled:cursor-not-allowed rounded-md font-medium active:scale-95 transition-transform",
  {
    variants: {
      variant: {
        primary: "bg-midnight text-mint hover:bg-zinc-800 disabled:bg-midnight/70",
        secondary: "bg-mint text-midnight hover:bg-mint/70 disabled:bg-mint/70",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {
  isLoading?: boolean;
}

const Button = ({ className, variant, children, isLoading, ...props }: ButtonProps) => {
  return (
    <button className={cn(button({ variant, className }))} disabled={isLoading} {...props}>
      {isLoading && (
        <div className="absolute w-full h-full left-0 top-0 flex justify-center items-center">
          <Icons.spinner
            className="animate-spin"
            color="white"
            width={20}
            height={20}
            strokeWidth={3}
          />
        </div>
      )}
      {children}
    </button>
  );
};

export default Button;
