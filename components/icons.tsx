import { cn } from '@/lib/utils';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  width?: number;
  height?: number;
}

export const ArrowUpIcon = ({
  className,
  width = 28,
  height = 28,
}: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M13.1716 10.1617L7.81659 15.5167C7.36159 15.9717 7.36159 16.7067 7.81659 17.1617C8.27159 17.6167 9.00659 17.6167 9.46159 17.1617L13.9999 12.635L18.5266 17.1617C18.9816 17.6167 19.7166 17.6167 20.1716 17.1617C20.6266 16.7067 20.6266 15.9717 20.1716 15.5167L14.8166 10.1617C14.3733 9.70668 13.6266 9.70668 13.1716 10.1617Z"
        fill="#36414C"
      />
    </svg>
  );
};

export const LogoIcon = ({ className, width = 28, height = 28 }: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
    >
      <path
        d="M5.08875 16.0678C4.52998 16.0698 3.98434 16.2373 3.52066 16.5492C3.05699 16.861 2.69606 17.3032 2.48343 17.8199C2.27079 18.3366 2.21598 18.9048 2.3259 19.4526C2.43581 20.0005 2.70554 20.5035 3.10105 20.8982C3.49655 21.2929 4.00011 21.5617 4.54818 21.6705C5.09625 21.7793 5.66428 21.7234 6.18059 21.5097C6.6969 21.2961 7.13835 20.9343 7.44926 20.47C7.76016 20.0057 7.92657 19.4597 7.9275 18.9009C7.92515 18.1493 7.62513 17.4292 7.09311 16.8982C6.56109 16.3673 5.8404 16.0687 5.08875 16.0678Z"
        fill="#3479EB"
      />
      <path
        d="M2.25 8.75018V12.8072C4.6875 12.8072 7.02844 13.5286 8.75016 15.2499C10.4719 16.9711 11.1877 19.3074 11.1877 21.75H15.2498C15.2498 14.6457 9.35953 8.75018 2.25 8.75018Z"
        fill="#3479EB"
      />
      <path
        d="M2.25 2.25V6.3075C10.9336 6.3075 17.6822 13.0612 17.6822 21.75H21.75C21.75 10.9997 13.0158 2.25 2.25 2.25Z"
        fill="#3479EB"
      />
    </svg>
  );
};

export const CircleArrowDownIcon = ({
  className,
  width = 40,
  height = 40,
}: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
    >
      <rect width={width} height={height} rx="20" fill="#D0D6DB" />
      <path
        d="M12.125 15.5L20 23.375L27.875 15.5"
        stroke="white"
        strokeWidth="2.25"
      />
    </svg>
  );
};
