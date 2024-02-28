import React, { useEffect, useRef } from "react";

export const OutsideClickHandler = ({
  children,
  onOutsideClick,
}: {
  children: React.ReactNode;
  onOutsideClick: () => void;
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event: Event) => {
      if (
        containerRef.current &&
        !(containerRef.current as any).contains(event.target)
      ) {
        onOutsideClick();
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [onOutsideClick]);

  return <main ref={containerRef}>{children}</main>;
};
