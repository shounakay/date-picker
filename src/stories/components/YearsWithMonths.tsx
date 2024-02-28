import React, { useEffect, useRef } from "react";

const YEARS = Array.from({ length: 70 }, (_, i) => 1975 + i);
const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);

export const YearsWithMonths = ({
  onMonthSelection,
}: {
  onMonthSelection: (year: number, month: number) => void;
}) => {
  const scrollContainerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Set the initial scroll position to 50%
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        (scrollContainerRef.current.scrollHeight -
          scrollContainerRef.current.clientHeight) /
        2;
    }
  }, []);
  return (
    <section
      ref={scrollContainerRef}
      className="h-48 overflow-y-auto flex flex-col w-52 py-2"
    >
      {YEARS.map((year) => (
        <div className="flex items-center gap-4 text-xs text-neutral-500 border-t border-b border-neutral-300 py-1">
          <div>{year}</div>
          <div className="flex flex-wrap gap-2">
            {MONTHS.map((month) => (
              <p
                onClick={() => onMonthSelection(year, month)}
                className="cursor-pointer"
              >
                {month}
              </p>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};
