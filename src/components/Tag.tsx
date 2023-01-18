import * as React from "react";

import clsxm from "@/lib/clsxm";

enum TagSize {
  "base",
  "lg",
}

type TagProps = {
  children: React.ReactNode;
  size?: keyof typeof TagSize;
} & React.ComponentPropsWithoutRef<"div">;

export default function Tag({
  children,
  className,
  size = "base",
  ...rest
}: TagProps) {
  return (
    <div
      className={clsxm(
        [
          size === "base" && ["py-0.5 text-xs"],
          size === "lg" && ["py-1 text-sm"],
        ],
        "inline-block rounded-full bg-primary-300 px-3 font-medium text-typo-secondary",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
