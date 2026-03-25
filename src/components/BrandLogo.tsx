import clsx from 'clsx';
import logo from '../assets/rscarwash-logo.png';

type BrandLogoProps = {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showWordmark?: boolean;
  className?: string;
  imageClassName?: string;
  textClassName?: string;
};

const sizeClasses = {
  sm: 'h-10 w-10',
  md: 'h-14 w-14',
  lg: 'h-20 w-20',
  xl: 'h-32 w-32',
};

export default function BrandLogo({
  size = 'md',
  showWordmark = true,
  className,
  imageClassName,
  textClassName,
}: BrandLogoProps) {
  return (
    <div className={clsx('flex items-center gap-3', className)}>
      <img
        src={logo}
        alt="RS Carwash logo"
        className={clsx(
          'rounded-[1.4rem] object-cover logo-glow shrink-0',
          sizeClasses[size],
          imageClassName,
        )}
      />
      {showWordmark && (
        <div className={clsx('flex flex-col', textClassName)}>
          <span className="text-base font-extrabold tracking-tight text-current sm:text-lg">
            RsCarwash
          </span>
          <span className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-current/65">
            Interior Cleaning
          </span>
        </div>
      )}
    </div>
  );
}
