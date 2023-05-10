import { cva, type VariantProps } from "class-variance-authority";

const button = cva("button", {
  variants: {
    variant: {
      default: "",
    },
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {}

const Button = () => {
  return <div>Button</div>;
};

export default Button;
