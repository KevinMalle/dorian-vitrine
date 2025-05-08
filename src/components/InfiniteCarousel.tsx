import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import Image from "next/image";

interface CarouselImage {
  src: string;
  alt?: string;
}

interface InfiniteCarouselProps {
  images: CarouselImage[];
}

const InfiniteCarousel: React.FC<InfiniteCarouselProps> = ({ images }) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="carousel-container">
      <div className="carousel-track">
        {images.map((img, index) => (
          <motion.div
            key={img.src + index}
            className="carousel-card"
            onHoverStart={() => setHovered(index)}
            onHoverEnd={() => setHovered(null)}
          >
            <AnimatePresence>
              {hovered === index && (
                <motion.div
                  className="carousel-overlay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
            </AnimatePresence>
            <Image
              src={img.src}
              alt={img.alt || `carousel-img-${index}`}
              width={300}
              height={200}
              className="carousel-image"
            />
          </motion.div>
        ))}
      </div>
      <style jsx>{`
        .carousel-container {
          width: 100%;
          overflow-x: scroll;
          white-space: nowrap;
          padding: 20px 0;
        }

        .carousel-track {
          display: flex;
          gap: 16px;
        }

        .carousel-card {
          position: relative;
          flex: 0 0 auto;
          width: 300px;
          height: 200px;
          border-radius: 12px;
          overflow: hidden;
          background: #ccc;
          cursor: pointer;
        }

        .carousel-image {
          object-fit: cover;
          border-radius: 12px;
        }

        .carousel-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 2;
        }
      `}</style>
    </div>
  );
};

export default InfiniteCarousel;
