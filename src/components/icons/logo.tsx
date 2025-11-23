import type { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <div className="relative h-9 w-9">
      <div className="absolute inset-0 bg-accent/30 rounded-full blur-lg animate-pulse-slow"></div>
      <svg
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative"
        {...props}
      >
        <path
          d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C19.4674 12 17.1855 12.8759 15.5 14.3333C14.1241 12.8145 13.5 10.9935 13.5 9C13.5 5.96243 15.9624 3.5 19 3.5C16.8145 2.57861 14.4935 2 12 2Z"
          fill="hsl(var(--background))"
        />
        <path
          d="M20 6C17.7909 6 16 7.79086 16 10C16 12.2091 17.7909 14 20 14C20.6694 14 21.3111 13.8716 21.9056 13.642C19.6389 15.8054 16.5122 17 13 17C8.58172 17 5 13.4183 5 9C5 5.48783 7.19456 2.63889 10.0944 1.09442C10.1284 3.75877 12.2412 5.87157 14.9056 5.90558C16.8838 5.95286 18.6674 5.06162 20 3.66667C20 4.78779 20 5.46741 20 6Z"
          fill="hsl(var(--foreground))"
          opacity="0.8"
        />
      </svg>
    </div>
  );
}
