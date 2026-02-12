import { ImageIcon } from "lucide-react";

type AdVariant = "banner" | "sidebar" | "in-article";

interface AdPlaceholderProps {
  variant: AdVariant;
  label?: string;
}

const variantStyles: Record<
  AdVariant,
  { container: string; iconSize: number }
> = {
  banner: {
    container: "w-full h-[90px] sm:h-[90px] md:h-[100px] lg:h-[120px]",
    iconSize: 32,
  },
  sidebar: {
    container: "w-full h-[250px] sm:h-[250px] md:h-[300px]",
    iconSize: 28,
  },
  "in-article": {
    container: "w-full h-[100px] sm:h-[100px] md:h-[120px]",
    iconSize: 28,
  },
};

export function AdPlaceholder({
  variant,
  label = "Ad will go here",
}: AdPlaceholderProps) {
  const styles = variantStyles[variant];

  return (
    <div
      className={`${styles.container} border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center gap-2 bg-gray-50`}
    >
      <ImageIcon size={styles.iconSize} className="text-gray-300" />
      <span className="font-ad-label">{label}</span>
    </div>
  );
}
