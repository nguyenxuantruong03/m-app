import Image from "next/image";
import { cn } from "@/lib/utils";
import Marquee from "@/components/ui/marquee";

const reviews = [
  {
    href: "",
    img: "/images/dienquang-logo.png",
  },
  {
    href: "",
    img: "/images/bachtuyet-logo.jpg",
  },
  {
    href: "",
    img: "/images/binhminh-logo.png",
  },
  {
    href: "",
    img: "/images/cadivi-logo.png",
  },
  {
    href: "",
    img: "/images/daphaco-logo.png",
  },
  {
    href: "",
    img: "/images/sino-logo.webp",
  },
  {
    href: "",
    img: "/images/kimtin-logo.jpg",
  },  
  {
    href: "",
    img: "/images/panasonic-logo.jpg",
  },
  {
    href: "",
    img: "/images/rangdong-logo.jpg",
  },
  {
    href: "",
    img: "/images/senko-logo.png",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);

const ReviewCard = ({
  img,
}: {
  img: string;
}) => {
  return (
    <figure
    className={cn(
      "relative w-48 h-20 cursor-pointer overflow-hidden rounded-xl border",
      // light styles
      "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
      // dark styles
      "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
    )}
  >
    <div className="flex justify-center items-center h-full">
      <Image
          src={img}
          alt=""
          height="120"
          width="120"
      />
    </div>
  </figure>
  );
};

export default function Marquees() {
  return (
    <div className="relative flex h-[160px] w-full flex-col items-center justify-center overflow-hidden bg-background md:shadow-xl">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.href} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
}
