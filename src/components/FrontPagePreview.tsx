import Image from "next/image";
import { WPMedia } from "@/app/types";

export function FrontPagePreview({
  image,
  pdf,
}: {
  image: WPMedia | null;
  pdf: WPMedia | null;
}) {
  if (!image) return null;

  const pdfUrl = pdf?.source_url;

  return (
    <div className="bg-white border border-gray-200 p-4 shadow-sm flex flex-col items-center">
      <div className="text-center mb-4">
        <h2 className="text-xl font-merriweather font-black uppercase tracking-tight">
          Today’s Paper
        </h2>
        <p className="text-[10px] font-raleway font-bold text-gray-500 uppercase tracking-widest mt-1">
          {new Date(image.date).toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>

      <a
        href={pdfUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative w-full aspect-[1/1.4] block overflow-hidden border border-gray-300 shadow-md hover:shadow-xl transition-shadow"
      >
        <Image
          src={image.source_url}
          alt={image.alt_text || "Front page"}
          fill
          className="object-cover"
        />

        {pdfUrl && (
          <div className="absolute inset-0 bg-black/0 hover:bg-black/5 transition-colors flex items-center justify-center">
            <div className="bg-black text-white px-4 py-2 text-xs font-bold uppercase tracking-widest opacity-0 hover:opacity-100 transition-opacity">
              Open Full PDF
            </div>
          </div>
        )}
      </a>

      {pdfUrl && (
        <div className="w-full flex flex-col gap-2 mt-4">
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-black text-white text-center py-3 text-[11px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors"
          >
            View Full Screen
          </a>
        </div>
      )}
    </div>
  );
}
