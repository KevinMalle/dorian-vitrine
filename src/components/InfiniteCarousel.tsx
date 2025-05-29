"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface Projet {
  id: number;
  projetNom: string;
  projetImage1: string;
}

interface ImageItem {
  src: string;
}

interface InfiniteCarouselProps {
  projets: Projet[];
  images?: ImageItem[];
}

export default function InfiniteCarousel({
  projets,
  images = [],
}: InfiniteCarouselProps) {
  const hasProjets = projets.length > 0;

  return (
    <div className="infinite-carousel-wrapper">
      <motion.div
        className="infinite-carousel-track"
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      >
        {hasProjets
          ? [...projets, ...projets].map((projet, index) => (
              <motion.div
                className="carousel-card"
                key={`${projet.id}-${index}`}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0.6 }}
                animate={{ opacity: 1 }}
              >
                <Image
                  src={projet.projetImage1 || "/placeholder.jpeg"}
                  alt={projet.projetNom}
                  width={200}
                  height={280}
                  className="carousel-img"
                />
                <p className="carousel-title">{projet.projetNom}</p>
              </motion.div>
            ))
          : images.map((img, index) => (
              <motion.div
                className="carousel-card"
                key={`img-${index}`}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0.6 }}
                animate={{ opacity: 1 }}
              >
                <Image
                  src={img.src || "/placeholder.jpeg"}
                  alt="placeholder"
                  width={200}
                  height={280}
                  className="carousel-img"
                />
              </motion.div>
            ))}
      </motion.div>
    </div>
  );
}
