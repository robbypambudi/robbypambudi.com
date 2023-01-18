import * as React from "react";
import { IconType } from "react-icons/lib";

import UnstyledLink, {
  UnstyledLinkProps,
} from "@/components/links/UnstyledLink";
import clsxm from "@/lib/clsxm";

enum ButtonVariant {
  "primary",
  "outline",
  "danger",
  "ghost",
}
enum ButtonSize {
  "sm",
  "base",
}

type ButtonLinkProps = {
  size?: keyof typeof ButtonSize;
  variant?: keyof typeof ButtonVariant;
  isIcon?: boolean;
  leftIcon?: IconType;
  rightIcon?: IconType;
  leftIconClassName?: string;
  rightIconClassName?: string;
} & UnstyledLinkProps;

const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  (
    {
      children,
      className,
      variant = "bone",
      size = "medium",
      isIcon = false,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      leftIconClassName,
      rightIconClassName,
      ...rest
    },
    ref
  ) => {
    return (
      <UnstyledLink
        ref={ref}
        {...rest}
        className={clsxm(
          "inline-flex items-center justify-center rounded",
          "focus:outline-none focus-visible:ring focus-visible:ring-primary-500",
          "transition-colors duration-75",
          "border border-primary-100",

          //#region  //*=========== Size Variant ===========
          [
            size === "small" && ["min-h-[32px] py-1 px-[18px]"],
            size === "medium" && ["min-h-[40px] py-2 px-[22px]"],
            size === "large" && ["min-h-[48px] py-3 px-[26px]"],
          ],
          //#endregion  //*======== Size Variant ===========

          //#region  //*=========== Variants ===========
          [
            variant === "primary" && [
              "text-white",
              "hover:bg-danger-500 hover:border-danger-500",
              "active:bg-primary-700",
              "disabled:bg-primary-700 disabled:brightness-90 disabled:hover:bg-primary-700",
            ],
            variant === "outline" && [
              "text-typo-secondary",
              "border border-typo-outline",
              "hover:bg-secondary-200 active:bg-secondary-400",
              "disabled:bg-secondary-300 disabled:brightness-95",
            ],
            variant === "danger" && [
              "bg-danger-400 text-white",
              "shadow-d-100 hover:shadow-d-200 disabled:hover:shadow-d-100",
              "hover:bg-danger-600 active:bg-danger-700",
              "disabled:bg-danger-700 disabled:brightness-95",
            ],
            variant === "ghost" && [
              "bg-clear text-typo-secondary",
              "hover:bg-secondary-200",
              "active:bg-secondary-400 disabled:bg-secondary-400 disabled:brightness-95",
            ],
          ],
          //#endregion  //*======== Variants ===========
          "disabled:cursor-not-allowed",
          isIcon && [
            size === "small" && "!p-1.5",
            size === "medium" && "!p-2",
            size === "large" && "!p-3",
          ],
          className
        )}
        {...rest}
      >
        {LeftIcon && (
          <div className="mr-2">
            <LeftIcon className={clsxm("text-xl", leftIconClassName)} />
          </div>
        )}
        {RightIcon && (
          <div className="ml-2">
            <RightIcon className={clsxm("text-xl", rightIconClassName)} />
          </div>
        )}
        {children}
      </UnstyledLink>
    );
  }
);

export default ButtonLink;
