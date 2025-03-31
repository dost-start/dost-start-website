import gallery from "@/lib/events/gallery";
import StartDivider from "../StartDivider";
import Image from "next/image";

function chunkGallery(images: string[]) {
  const pattern = [1, 2, 3, 2, 1, 3];
  const chunks = [];
  let i = 0,
    patternIndex = 0;
  while (i < images.length) {
    const chunkSize = pattern[patternIndex % pattern.length];
    chunks.push(images.slice(i, i + chunkSize));
    i += chunkSize;
    patternIndex++;
  }
  return chunks;
}
export default function Gallery({ className }: { className?: string }) {
  const galleryChunks = chunkGallery(gallery);
  return (
    <section className={className}>
      <div className="flex items-center mb-4 gap-2">
        <h2 className="text-4xl font-bold shrink-0 mr-4 my-6">Gallery</h2>
        <StartDivider variant="accent" width="10%" />
        <StartDivider variant="accent" width="20%" />
        <StartDivider variant="accent" width="20%" />
        <StartDivider variant="accent" />
      </div>
      <div className="hidden xl:block space-y-4">
        {galleryChunks.map((chunk, chunkIndex) => (
          <div
            key={`gallery-chunk-${chunkIndex}`}
            className="flex justify-center gap-4"
          >
            {chunk.map((image, imageIndex) => (
              <Image
                key={`gallery-img-${chunkIndex}-${imageIndex}`}
                src={image}
                alt={image || `Gallery image ${chunkIndex}-${imageIndex}`}
                width={300}
                height={200}
                className="rounded-lg shadow-lg w-full object-cover"
                style={{ aspectRatio: "16/9" }}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:hidden gap-4">
        {gallery.map((image, index) => (
          <Image
            key={`gallery-img-${index}`}
            src={image}
            alt={`Gallery image ${index}`}
            width={300}
            height={200}
            className="rounded-lg shadow-lg w-full object-cover"
            style={{ aspectRatio: "16/9" }}
          />
        ))}
      </div>
    </section>
  );
}
