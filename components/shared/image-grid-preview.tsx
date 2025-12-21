'use client';

import { useState } from 'react';
import Image from 'next/image';
import ImageCarouselDialog from './image-carrousel-dialog';

interface ImageGridPreviewProps {
  images: string[];
  height?: number;
}

export default function ImageGridPreview({
  images,
  height = 160,
}: ImageGridPreviewProps) {
  const [open, setOpen] = useState(false);

  const count = images.length;
  const remaining = count - 4;

  const renderImage = (
    src: string,
    showOverlay = false
  ) => (
    <button
      onClick={() => setOpen(true)}
      className="relative w-full h-full overflow-hidden rounded-lg"
    >
      <Image src={src} alt="" fill className="object-cover" />

      {showOverlay && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <span className="text-white text-xl font-semibold">
            +{remaining}
          </span>
        </div>
      )}
    </button>
  );

  return (
    <>
      <div
        className="w-full overflow-hidden"
        style={{ height }}
      >
        {/* 1 IMAGE */}
        {count === 1 && (
          <div className="h-full">
            {renderImage(images[0])}
          </div>
        )}

        {/* 2 IMAGES */}
        {count === 2 && (
          <div className="grid grid-rows-2 gap-1 h-full">
            {images.map((img) => (
              <div key={img} className="h-full">
                {renderImage(img)}
              </div>
            ))}
          </div>
        )}

        {/* 3 IMAGES */}
        {count === 3 && (
          <div className="grid grid-cols-2 gap-1 h-full">
            {/* Colonne 1 */}
            <div className="h-full">
              {renderImage(images[0])}
            </div>

            {/* Colonne 2 */}
            <div className="grid grid-rows-2 gap-1 h-full">
              {renderImage(images[1])}
              {renderImage(images[2])}
            </div>
          </div>
        )}

        {/* 4 IMAGES OU PLUS */}
        {count >= 4 && (
          <div className="grid grid-cols-2 grid-rows-2 gap-1 h-full">
            {images.slice(0, 4).map((img, index) => (
              <div key={img} className="h-full">
                {renderImage(
                  img,
                  index === 3 && remaining > 0
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <ImageCarouselDialog
        images={images}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
}
