"use client";

import type React from "react";
import { useState } from "react";
import { Sparkles, Upload, Wand2, ImageIcon, Check, X } from "lucide-react";
import "../../../styles/globals.css";
import Image from "next/image";

export default function AjouterProjet() {
  const [formData, setFormData] = useState({
    projetNom: "",
    projetDescription: "",
    projetUid: "",
    projetIsCompatible: false,
    projetImage1: "",
    projetImage2: "",
    projetImage3: "",
    projetImage4: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;

    const newValue = type === "checkbox" ? target.checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, userId: 1 }),
      });

      if (res.ok) {
        alert("Modèle ajouté avec succès!");

        // Reset form
        setFormData({
          projetNom: "",
          projetDescription: "",
          projetUid: "",
          projetIsCompatible: false,
          projetImage1: "",
          projetImage2: "",
          projetImage3: "",
          projetImage4: "",
        });
      } else {
        alert("Erreur: Impossible d'ajouter le modèle. Veuillez réessayer.");
      }
    } catch (error) {
      alert("Erreur: Une erreur s'est produite. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-container">
      <div className="form-card">
        <div className="form-container">
          {/* Effet de particules magiques en haut */}
          <div className="magic-particles-top"></div>

          <form onSubmit={handleSubmit} className="magic-form">
            <div className="form-header">
              <div className="title-container">
                <Wand2 className="icon-wand" />
                <h1 className="form-title">Ajouter un Modèle 3D</h1>
                <Wand2 className="icon-wand" />
              </div>
              <p className="form-subtitle">
                Partagez votre création avec le monde
              </p>
            </div>

            <div className="form-fields">
              <div className="form-group">
                <label htmlFor="projetNom" className="form-label">
                  <Sparkles className="icon-sparkle" />
                  Nom du modèle
                </label>
                <input
                  id="projetNom"
                  name="projetNom"
                  value={formData.projetNom}
                  placeholder="Le nom de votre création..."
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="projetDescription" className="form-label">
                  <Sparkles className="icon-sparkle" />
                  Description
                </label>
                <textarea
                  id="projetDescription"
                  name="projetDescription"
                  value={formData.projetDescription}
                  placeholder="Décrivez votre modèle et son histoire..."
                  onChange={handleChange}
                  required
                  className="form-textarea"
                />
              </div>

              <div className="form-group">
                <label htmlFor="projetUid" className="form-label">
                  <Sparkles className="icon-sparkle" />
                  UID Sketchfab
                </label>
                <input
                  id="projetUid"
                  name="projetUid"
                  value={formData.projetUid}
                  placeholder="Identifiant unique de votre modèle..."
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-switch">
                <input
                  type="checkbox"
                  id="projetIsCompatible"
                  name="projetIsCompatible"
                  checked={formData.projetIsCompatible}
                  onChange={handleChange}
                  className="switch-input"
                />
                <label htmlFor="projetIsCompatible" className="switch-label">
                  {formData.projetIsCompatible ? (
                    <Check className="icon-check" />
                  ) : (
                    <X className="icon-x" />
                  )}
                  Compatible avec notre visualiseur
                </label>
              </div>

              <div className="image-grid">
                <div className="form-group">
                  <label htmlFor="projetImage1" className="form-label">
                    <ImageIcon className="icon-image" />
                    Image principale
                  </label>
                  <input
                    id="projetImage1"
                    name="projetImage1"
                    value={formData.projetImage1}
                    placeholder="URL de l'image..."
                    onChange={handleChange}
                    className="form-input"
                  />
                  {formData.projetImage1 && (
                    <div className="image-preview">
                      <Image
                        src={formData.projetImage1 || "/placeholder.svg"}
                        alt="Aperçu"
                        className="preview-img"
                        width={150}
                        height={80}
                        onError={(e) => {
                          const img = e.target as HTMLImageElement;
                          img.src = "/placeholder.svg";
                        }}
                      />
                      <div className="preview-overlay">
                        <p className="preview-text">Aperçu</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="projetImage2" className="form-label">
                    <ImageIcon className="icon-image" />
                    Image secondaire
                  </label>
                  <input
                    id="projetImage2"
                    name="projetImage2"
                    value={formData.projetImage2}
                    placeholder="URL de l'image..."
                    onChange={handleChange}
                    className="form-input"
                  />
                  {formData.projetImage2 && (
                    <div className="image-preview">
                      <Image
                        src={formData.projetImage2 || "/placeholder.svg"}
                        alt="Aperçu"
                        className="preview-img"
                        width={150}
                        height={80}
                        onError={(e) => {
                          const img = e.target as HTMLImageElement;
                          img.src = "/placeholder.svg";
                        }}
                      />
                      <div className="preview-overlay">
                        <p className="preview-text">Aperçu</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="projetImage3" className="form-label">
                    <ImageIcon className="icon-image" />
                    Image supplémentaire
                  </label>
                  <input
                    id="projetImage3"
                    name="projetImage3"
                    value={formData.projetImage3}
                    placeholder="URL de l'image..."
                    onChange={handleChange}
                    className="form-input"
                  />
                  {formData.projetImage3 && (
                    <div className="image-preview">
                      <Image
                        src={formData.projetImage3 || "/placeholder.svg"}
                        alt="Aperçu"
                        className="preview-img"
                        width={150}
                        height={80}
                        onError={(e) => {
                          const img = e.target as HTMLImageElement;
                          img.src = "/placeholder.svg";
                        }}
                      />
                      <div className="preview-overlay">
                        <p className="preview-text">Aperçu</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="projetImage4" className="form-label">
                    <ImageIcon className="icon-image" />
                    Image supplémentaire
                  </label>
                  <input
                    id="projetImage4"
                    name="projetImage4"
                    value={formData.projetImage4}
                    placeholder="URL de l'image..."
                    onChange={handleChange}
                    className="form-input"
                  />
                  {formData.projetImage4 && (
                    <div className="image-preview">
                      <Image
                        src={formData.projetImage4 || "/placeholder.svg"}
                        alt="Aperçu"
                        className="preview-img"
                        width={150}
                        height={80}
                        onError={(e) => {
                          const img = e.target as HTMLImageElement;
                          img.src = "/placeholder.svg";
                        }}
                      />
                      <div className="preview-overlay">
                        <p className="preview-text">Aperçu</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button
                type="submit"
                disabled={isSubmitting}
                className="submit-button"
              >
                <span className="button-content">
                  {isSubmitting ? (
                    <>
                      <div className="spinner"></div>
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Upload className="icon-upload" />
                      Ajouter le modèle
                    </>
                  )}
                </span>
              </button>
            </div>
          </form>

          {/* Effet de particules magiques en bas */}
          <div className="magic-particles-bottom"></div>
        </div>
      </div>
    </div>
  );
}

// "use client";

// import { useState } from "react";

// export default function AjouterProjet() {
//   const [formData, setFormData] = useState({
//     projetNom: "",
//     projetDescription: "",
//     projetUid: "",
//     projetIsCompatible: false,
//     projetImage1: "",
//     projetImage2: "",
//     projetImage3: "",
//     projetImage4: "",
//   });

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const target = e.target as HTMLInputElement;
//     const { name, value, type } = target;

//     const newValue = type === "checkbox" ? target.checked : value;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: newValue,
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const res = await fetch("/api/projects", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ ...formData, userId: 1 }), // ← fixe: userId en dur
//     });

//     if (res.ok) {
//       alert("Projet ajouté !");
//     } else {
//       alert("Erreur !");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h1>Ajouter un projet</h1>
//       <input
//         name="projetNom"
//         placeholder="Nom"
//         onChange={handleChange}
//         required
//       />
//       <textarea
//         name="projetDescription"
//         placeholder="Description"
//         onChange={handleChange}
//         required
//       />
//       <input
//         name="projetUid"
//         placeholder="UID Sketchfab"
//         onChange={handleChange}
//         required
//       />
//       <label>
//         Compatible ?
//         <input
//           type="checkbox"
//           name="projetIsCompatible"
//           onChange={handleChange}
//         />
//       </label>
//       <input
//         name="projetImage1"
//         placeholder="Image 1 URL"
//         onChange={handleChange}
//       />
//       <input
//         name="projetImage2"
//         placeholder="Image 2 URL"
//         onChange={handleChange}
//       />
//       <input
//         name="projetImage3"
//         placeholder="Image 3 URL"
//         onChange={handleChange}
//       />
//       <input
//         name="projetImage4"
//         placeholder="Image 4 URL"
//         onChange={handleChange}
//       />
//       <button type="submit">Envoyer</button>
//     </form>
//   );
// }
