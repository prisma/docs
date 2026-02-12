import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

/**
 * Define Avatar variants using CVA
 */
const avatarVariants = cva(
  "bg-background-neutral-reverse hover:bg-background-neutral-reverse-strong text-foreground-neutral-reverse relative flex shrink-0 overflow-hidden rounded-square uppercase flex items-center justify-center font-semibold",
  {
    variants: {
      disabled: {
        true: "opacity-50 cursor-not-allowed",
        false: "",
      },
      size: {
        lg: "not-prose text-2xs",
        xl: "not-prose text-2xs",
        "2xl": "text-sm",
        "3xl": "text-sm",
      },
    },
    defaultVariants: {
      disabled: false,
    },
  },
);

const avatarContentVariants = cva("", {
  variants: {
    format: {
      image: "w-full h-full bg-cover object-cover",
      icon: "",
      initials: "",
    },
  },
  defaultVariants: {
    format: "image",
  },
});

const sizeMap = {
  lg: { width: 28, height: 28 },
  xl: { width: 32, height: 32 },
  "2xl": { width: 36, height: 36 },
  "3xl": { width: 40, height: 40 },
} as const;

/**
 * Avatar component props
 */
export interface AvatarProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children"
> {
  /**
   * The format of the avatar content
   */
  format?: "image" | "icon" | "initials";
  /**
   * The size of the avatar
   */
  size?: "lg" | "xl" | "2xl" | "3xl";
  /**
   * Whether the avatar is disabled
   */
  disabled?: boolean;
  /**
   * The source URL for image format
   */
  src?: string;
  /**
   * Alt text for image format
   */
  alt?: string;
  /**
   * Icon or initials content
   */
  children?: React.ReactNode;
}

/**
 * Avatar component
 *
 * Displays a user avatar as an image, icon, or initials.
 *
 * @example
 * ```tsx
 * // Image avatar
 * <Avatar format="image" src="/avatar.jpg" alt="John Doe" size="lg" />
 * ```
 *
 * @example
 * ```tsx
 * // Initials avatar
 * <Avatar format="initials" size="xl">
 *   JD
 * </Avatar>
 * ```
 *
 * @example
 * ```tsx
 * // Icon avatar
 * <Avatar format="icon" size="2xl">
 *   <UserIcon />
 * </Avatar>
 * ```
 */
const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      className,
      size = "lg",
      disabled = false,
      format = "image",
      src,
      alt,
      children,
      style,
      ...props
    },
    ref,
  ) => {
    const dimensions = sizeMap[size];

    return (
      <div
        ref={ref}
        className={cn(avatarVariants({ size, disabled, className }))}
        style={{
          width: `${dimensions?.width}px`,
          height: `${dimensions?.height}px`,
          ...style,
        }}
        {...props}
      >
        {format === "image" && src ? (
          <img
            src={src}
            alt={alt || "Avatar"}
            className={cn(avatarContentVariants({ format }))}
          />
        ) : (
          <div className={cn(avatarContentVariants({ format }))}>
            {children}
          </div>
        )}
      </div>
    );
  },
);

Avatar.displayName = "Avatar";

export { Avatar, avatarVariants };
