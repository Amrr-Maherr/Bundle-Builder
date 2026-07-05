type ProductCardImageProps = {
  imageSrc: string;
  alt: string;
  discount?: number;
};

export function ProductCardImage({
  imageSrc,
  alt,
  discount = 0,
}: ProductCardImageProps) {
  return (
    <div className="relative flex w-full shrink-0 items-center justify-center py-1 md:w-[101px] md:min-h-[137px] md:py-0">
      {discount > 0 && (
        <span className="absolute left-0 top-0 z-10 rounded-full bg-primary px-2 py-0.5 text-xs font-normal text-primary-foreground">
          Save {discount}%
        </span>
      )}
      {imageSrc && (
        <img
          src={imageSrc}
          alt={alt}
          className="h-[140px] w-full max-w-[220px] object-contain md:h-[137px] md:w-[101px] md:max-w-[101px] md:rounded-[5px]"
        />
      )}
    </div>
  );
}
