import Image from "next/image";
import { company } from "@/lib/site";

/** 중앙이앤비 심볼 마크. */
export default function Logo({
  className = "",
  size = 40,
  priority = false,
}: {
  className?: string;
  size?: number;
  priority?: boolean;
}) {
  return (
    <Image
      src="/logo.png"
      alt={`${company.nameKo} 로고`}
      width={size}
      height={size}
      priority={priority}
      className={className}
      sizes={`${size}px`}
    />
  );
}
