function ClippyCharacter({ size = 48, animated = false }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={animated ? 'animate-[clippyBounce_3s_ease-in-out_infinite]' : ''}
    >
      {/* Paperclip body */}
      <path
        d="M38 8C38 5.8 36.2 4 34 4H30C27.8 4 26 5.8 26 8V44C26 48.4 29.6 52 34 52H30C25.6 52 22 48.4 22 44V16C22 13.8 23.8 12 26 12H30"
        stroke="#94a3b8"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M38 8V40C38 42.2 36.2 44 34 44H30C27.8 44 26 42.2 26 40"
        stroke="#cbd5e1"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />

      {/* Left eye */}
      <circle cx="29" cy="24" r="5" fill="white" stroke="#94a3b8" strokeWidth="1.5" />
      <circle cx="30" cy="24" r="2.5" fill="#1e293b" />
      <circle cx="31" cy="23" r="1" fill="white" />

      {/* Right eye */}
      <circle cx="39" cy="24" r="5" fill="white" stroke="#94a3b8" strokeWidth="1.5" />
      <circle cx="40" cy="24" r="2.5" fill="#1e293b" />
      <circle cx="41" cy="23" r="1" fill="white" />

      {/* Eyebrows */}
      <path d="M25 18C26 16.5 28 16 30 17" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M43 18C42 16.5 40 16 38 17" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" />

      {/* Mouth (friendly smile) */}
      <path d="M30 32C31.5 34 36.5 34 38 32" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  )
}

export default ClippyCharacter
