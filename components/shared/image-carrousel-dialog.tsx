"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Props {
  images: string[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ImageCarouselDialog({
  images,
  open,
  onOpenChange,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
    bg-amber-50 border-none rounded-[24px]
    w-[80vw] max-w-[1400px]
    max-h-[90vh]
  "
      >
        <DialogHeader>
          <DialogTitle>Images ({images.length})</DialogTitle>
        </DialogHeader>
        <Carousel className="w-full">
          <CarouselContent>
            {images.map((src, index) => (
              <CarouselItem key={index}>
                <div className="relative w-full h-[60vh] flex items-center justify-center">
                  <img
                    src={src}
                    alt=""
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="bg-amber-600 text-white ml-8 hover:bg-amber-700 hover:text-" />
          <CarouselNext className="bg-amber-600 text-white mr-8 hover:bg-amber-700" />
        </Carousel>
      </DialogContent>
    </Dialog>
  );
}
