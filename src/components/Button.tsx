import classNames from "classnames";
import React, { HTMLAttributes, ReactNode, RefAttributes, RefObject } from "react";
import { Link } from "react-router-dom";
import { PulseLoader } from "react-spinners";

export interface Props extends HTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
  children: ReactNode;
  size: "small" | "regular" | "large";
  href?: string;
  to?: string;
  className?: string;
  icon?: ReactNode;
  loading: boolean;
  iconPosition: "left" | "right";
  disabled: boolean;
  ref?: RefObject<unknown>;
}

const defaultProps = {
  loading: false,
  iconPosition: "left",
  size: "regular",
  disabled: false,
};

export const PrimaryButton = ({ children, className, loading, ...props }: Props & typeof defaultProps) => {
  const rootClass = classNames(
    "bg-primary text-white hover:bg-primary-lighter font-semibold outline-primary-lighter",
    className
  );
  return (
    <Button className={rootClass} {...props}>
      {loading ? (
        <PulseLoader speedMultiplier={0.5} margin={2} size={10} color="#ffffff" className="mx-auto" />
      ) : (
        children
      )}
    </Button>
  );
};

const Button = ({
  children,
  className,
  size,
  icon,
  to,
  iconPosition,
  disabled,
  href,
  ref,
  ...props
}: Props & typeof defaultProps) => {
  const rootClass = classNames(
    "flex items-center rounded-lg outline-offset-2 font-semibold disable:opacity-70 disabled:pointer-events-none",
    className,
    {
      "px-5 py-3": size === "regular",
      "px-8 py-5 text-lg": size === "large",
      "px-3 py-1.5 text-sm": size === "small",
    }
  );

  if (href) {
    return (
      <a href={href} ref={ref as RefObject<HTMLAnchorElement>} className={rootClass} {...props}>
        {iconPosition === "left" && icon}
        {children}
        {iconPosition === "right" && icon}
      </a>
    );
  }

  if (to) {
    return (
      <Link to={to} ref={ref as RefObject<HTMLAnchorElement>} className={rootClass} {...props}>
        {iconPosition === "left" && icon}
        {children}
        {iconPosition === "right" && icon}
      </Link>
    );
  }

  return (
    <button className={rootClass} ref={ref as RefObject<HTMLButtonElement>} {...props}>
      {iconPosition === "left" && icon}
      {children}
      {iconPosition === "right" && icon}
    </button>
  );
};

Button.defaultProps = defaultProps;
PrimaryButton.defaultProps = defaultProps;

export default Button;
