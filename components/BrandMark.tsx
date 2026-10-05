type BrandMarkProps = {
  withWord?: boolean;
  className?: string;
};

export function BrandMark({ withWord = false, className = "" }: BrandMarkProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        aria-hidden="true"
        viewBox="0 0 40 40"
        fill="none"
        className="size-[1.15em] shrink-0"
      >
        <circle cx="20" cy="20" r="17" stroke="currentColor" strokeWidth="2.4" />
        <path
          d="M7.5 21h6.2l3.15-7.4 5.1 14.2 4.15-9.2h6.4"
          stroke="#255CFF"
          strokeWidth="2.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {withWord ? <span>PULSE</span> : null}
    </span>
  );
}
