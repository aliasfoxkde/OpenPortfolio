// ============================================
// OpenPortfolio - Logo Component
// ONE logo used everywhere - fox icon
// ============================================

export function LogoIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="6" fill="#6366f1"/>
      <path d="M8 24L16 8L24 24M11 19H21" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default LogoIcon;
