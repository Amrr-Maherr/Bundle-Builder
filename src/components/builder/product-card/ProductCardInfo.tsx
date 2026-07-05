type ProductCardInfoProps = {
  name: string;
  description: string;
  learnMoreUrl?: string;
};

export function ProductCardInfo({
  name,
  description,
  learnMoreUrl = "#",
}: ProductCardInfoProps) {
  return (
    <>
      <h3 className="text-lg font-bold leading-tight text-foreground">{name}</h3>
      <p className="m-0! pt-[8px] text-[12px] text-[#1F1F1FBF]">
        {description}{" "}
        <a
          href={learnMoreUrl}
          onClick={(e) => e.stopPropagation()}
          className="font-bold text-[#2563eb] underline underline-offset-2 md:hidden"
        >
          Learn More
        </a>
      </p>
      <a
        href={learnMoreUrl}
        onClick={(e) => e.stopPropagation()}
        className="hidden w-fit text-[12px] font-normal text-[#2563eb] underline underline-offset-2 md:block"
      >
        Learn More
      </a>
    </>
  );
}
