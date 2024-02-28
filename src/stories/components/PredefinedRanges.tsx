import React from "react";

export const PredefinedRanges = ({
  onLastDaysSelection,
}: {
  onLastDaysSelection: (days: number) => void;
}) => {
  return (
    <div className="flex items-center justify-between text-xs border-t py-1">
      <button
        onClick={() => onLastDaysSelection(7)}
        className="rounded-md text-neutral-500 transition-all hover:bg-neutral-400 px-1 py-1 hover:text-neutral-100"
      >
        Last 7 days
      </button>
      <button
        onClick={() => onLastDaysSelection(30)}
        className="rounded-md text-neutral-500 hover:text-neutral-100 transition-all hover:bg-neutral-400 px-1 py-1"
      >
        Last 30 days
      </button>
    </div>
  );
};
