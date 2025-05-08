"use client";

import React, { useEffect, useState } from "react";
import styles from "@/styles/Home.module.css";
import Image from "next/image";
import Link from "next/link";

interface Projet {
  id: number;
  projetNom: string;
  projetDescription: string;
  projetUid: string;
  projetIsCompatible: boolean;
  projetImage1: string;
  projetImage2: string;
  projetImage3: string;
  projetImage4: string;
  createdAt: string;
  userId: number;
}

export default function Home() {
  const [projets, setProjets] = useState<Projet[] | null>(null);

  useEffect(() => {
    async function fetchProjets() {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        setProjets(data);
      } catch (err) {
        console.error("Erreur projets:", err);
      }
    }
    fetchProjets();
  }, []);

  return (
    <>
      <Link href="/admin/ajouter">
        <button className={styles.gridButton}>Ajouter un projet</button>
      </Link>

      <section className={styles.contentSection}>
        <Image
          src="/tien.jpg"
          alt="profil"
          width={100}
          height={100}
          className={styles.profileImage}
        />
        <p className={styles.loremText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
          risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec,
          ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula
          massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci
          nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl
          sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae,
          consequat in, pretium a, enim. Pellentesque congue.
        </p>
      </section>

      <section className={styles.heroSection}>
        <h1 className={styles.title}>Bienvenue sur mon site vitrine</h1>
        <div className={styles.carouselWrapper}>
          <div className={styles.carouselWrapper}>
            {projets?.map((projet) => (
              <div key={projet.id} className={styles.projectCard}>
                <h2>{projet.projetNom}</h2>
                <iframe
                  title={projet.projetNom}
                  width="100%"
                  height="300"
                  src={`https://sketchfab.com/models/${projet.projetUid}/embed`}
                  frameBorder="0"
                  allow="autoplay; fullscreen; vr"
                  allowFullScreen
                ></iframe>
              </div>
            ))}
          </div>
        </div>
        <button className={styles.gridButton}>vue grille</button>
      </section>
    </>
  );
}
