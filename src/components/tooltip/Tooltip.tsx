import { useOverlayPosition } from "@react-aria/overlays";
import { useTooltip } from "@react-aria/tooltip";
import { mergeProps } from "@react-aria/utils";
import { useTooltipTriggerState } from "@react-stately/tooltip";
import React, { ReactPortal, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./styles.module.scss";

const ARROW_SIZE = 5; // in px
const SPACING = 8;

type Position = "top" | "bottom" | "left" | "right";

export type TooltipProps = React.PropsWithChildren<{
  /** An HTML ID attribute that will be attached to the the rendered component. Useful for targeting it from tests */
  id?: string;
  /** React Ref of an HTML Element to position this Tooltip against */
  target: React.RefObject<HTMLElement | SVGSVGElement>;
  /** Position of the tooltip relative to the target. The Tooltip might still be flipped if there isn't enough space. */
  position?: Position;
}>;

/**
 * A tooltip is an overlay that is most commonly used to display a short description about an icon / image
 */

export function Tooltip({ id, children, target, position }: TooltipProps): ReactPortal | null {
  const state = useTooltipTriggerState({ isOpen: true });
  const { tooltipProps } = useTooltip({ id }, state);

  const ref = useRef<HTMLDivElement>(null);

  const {
    overlayProps,
    placement,
    arrowProps: ariaArrowProps,
  } = useOverlayPosition({
    targetRef: target as React.RefObject<HTMLElement>,
    overlayRef: ref,
    shouldFlip: true,
    placement: position,
    offset: SPACING + ARROW_SIZE,
  });

  // Calculate arrow position styles on your own, taking react-aria's position into account
  // We cannot expect react-aria to position the arrow 100% correctly since it does not know what our tooltip looks like
  const [arrowProps, setArrowProps] =
    useState<React.HTMLAttributes<HTMLDivElement>>(ariaArrowProps);

  const checkForResize = () => {
    // Figure out overlay dimensions so we can position the arrow accordingly
    const overlayDimensions = ref.current?.getBoundingClientRect();
    const targetDimensions = target.current?.getBoundingClientRect();

    if (!targetDimensions || !overlayDimensions) {
      return;
    }

    const left =
      Math.abs(overlayDimensions.left - targetDimensions.left) +
      targetDimensions.width / 2 -
      ARROW_SIZE;
    const top =
      Math.abs(overlayDimensions.top - targetDimensions.top) +
      targetDimensions.height / 2 -
      ARROW_SIZE;

    setArrowProps({
      ...arrowProps,
      style: {
        ...arrowProps.style,
        ...(placement === "top"
          ? {
              top: overlayDimensions.height,
              left,
            }
          : undefined),
        ...(placement === "bottom"
          ? {
              left,
            }
          : undefined),
        ...(placement === "left"
          ? {
              left: overlayDimensions.width,
              top,
            }
          : undefined),
        ...(placement === "right"
          ? {
              top,
              left: 0,
            }
          : undefined),
      },
    });
  };
  useLayoutEffect(() => {
    checkForResize();
  }, [placement]);

  useEffect(() => {
    window.addEventListener("resize", checkForResize);
    return () => {
      window.removeEventListener("resize", checkForResize);
    };
  }, []);
  return typeof window === "object"
    ? createPortal(
        <div
          className={styles[placement]}
          ref={ref}
          lens-role="tooltip"
          {...mergeProps(overlayProps, tooltipProps)}
          style={{
            ...overlayProps.style,
            ...(placement === "bottom"
              ? {
                  top: (overlayProps.style!.top as number) - ARROW_SIZE * 2,
                }
              : undefined), // Spacing isn't quite right with this placement, so we adjust it ourselves
            ...(placement === "right"
              ? {
                  left: (overlayProps.style!.left as number) - ARROW_SIZE * 2,
                }
              : undefined), // Spacing isn't quite right with this placement, so we adjust it ourselves
          }}
        >
          <Arrow arrowProps={arrowProps} position={placement as Position} />
          <div
            className={styles.childrenWrapper}
            style={{
              marginTop: placement === "bottom" ? ARROW_SIZE * 2 : undefined,
              marginLeft: placement === "right" ? ARROW_SIZE * 2 : undefined,
            }}
          >
            {children}
          </div>
        </div>,
        document.body
      )
    : null;
}

type ArrowProps = {
  arrowProps: React.HTMLAttributes<HTMLElement>;
  position: Position;
  className?: string;
};

function Arrow({ arrowProps, position }: ArrowProps) {
  return (
    <div
      className={styles.arrowWrapper}
      lens-role="tooltip-arrow"
      {...arrowProps}
      style={{
        ...arrowProps.style,
        borderWidth: 5,
        borderLeftColor: position === "left" ? undefined : "transparent",
        borderRightColor: position === "right" ? undefined : "transparent",
        borderTopColor: position === "top" ? undefined : "transparent",
        borderBottomColor: position === "bottom" ? undefined : "transparent",
      }}
    ></div>
  );
}
