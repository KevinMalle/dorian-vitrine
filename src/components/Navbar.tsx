"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Home,
  ListPlus,
  LinkIcon,
  FileText,
  Users,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import "./style/Navbar.css";

const NavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState("/");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Mettre à jour le chemin actuel
    setCurrentPath(window.location.pathname);

    // Vérifier si l'écran est mobile
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  const handleLogout = () => {
    window.location.href = "/login";
  };

  // Fonction pour vérifier si un chemin est actif
  const isActive = (path: string): boolean => {
    if (path === "/") {
      return currentPath === path;
    }
    if (path === "/admin/ajouter") {
      return currentPath === path;
    }
    return (
      currentPath === path ||
      (currentPath.startsWith(path) &&
        currentPath.split("/").length === path.split("/").length + 1)
    );
  };

  const navItems = [
    {
      text: "Accueil",
      path: "/",
      icon: <Home className="nav-icon" />,
      visible: true,
    },
    {
      text: "Ajouter un modèle",
      path: "/admin/ajouter",
      icon: <ListPlus className="nav-icon" />,
      visible: true,
    },
    {
      text: "Liens",
      path: "/links",
      icon: <LinkIcon className="nav-icon" />,
      visible: true,
    },
    {
      text: "CV",
      path: "#cv",
      icon: <FileText className="nav-icon" />,
      visible: true,
    },
    {
      text: "Droits Utilisateurs",
      path: "/gestion/droits-user",
      icon: <Users className="nav-icon" />,
      visible: true,
    },
    {
      text: "Déconnexion",
      path: "#",
      icon: <LogOut className="nav-icon" />,
      visible: true,
      action: handleLogout,
    },
  ];

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link href="/" className="logo-link">
            <div className="logo-container">
              <Image
                alt="Logo"
                src="/placeholder.svg"
                width={40}
                height={40}
                className="logo-image"
              />
            </div>
            <div className="logo-text">
              <span className="logo-title">MODÈLES 3D</span>
              <span className="logo-version">v1</span>
            </div>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        {isMobile && (
          <button className="mobile-menu-button" onClick={toggleDrawer}>
            {drawerOpen ? <X /> : <Menu />}
          </button>
        )}

        {/* Desktop Navigation */}
        {!isMobile && (
          <nav className="desktop-nav">
            <ul className="nav-list">
              {navItems
                .filter((item) => item.visible)
                .map((item, index) => {
                  if (item.action) {
                    return (
                      <li key={index} className="nav-item">
                        <button
                          onClick={item.action}
                          className={`nav-button ${
                            isActive(item.path) ? "active" : ""
                          }`}
                        >
                          {item.icon}
                          <span>{item.text}</span>
                        </button>
                      </li>
                    );
                  } else {
                    return (
                      <li key={index} className="nav-item">
                        <Link
                          href={item.path}
                          className={`nav-link ${
                            isActive(item.path) ? "active" : ""
                          }`}
                        >
                          {item.icon}
                          <span>{item.text}</span>
                        </Link>
                      </li>
                    );
                  }
                })}
            </ul>
          </nav>
        )}
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${drawerOpen ? "open" : ""}`}>
        <div className="drawer-header">
          <div className="drawer-logo">
            <Image
              alt="Logo"
              src="/placeholder.svg"
              width={40}
              height={40}
              className="logo-image"
            />
            <div className="logo-text">
              <span className="logo-title">MODÈLES 3D</span>
              <span className="logo-version">v1</span>
            </div>
          </div>
          <button className="drawer-close" onClick={toggleDrawer}>
            <X />
          </button>
        </div>
        <div className="drawer-divider"></div>
        <nav className="drawer-nav">
          <ul className="drawer-list">
            {navItems
              .filter((item) => item.visible)
              .map((item, index) => {
                if (item.action) {
                  return (
                    <li key={index} className="drawer-item">
                      <button
                        onClick={() => {
                          toggleDrawer();
                        }}
                        className={`drawer-button ${
                          isActive(item.path) ? "active" : ""
                        }`}
                      >
                        {item.icon}
                        <span>{item.text}</span>
                      </button>
                    </li>
                  );
                } else {
                  return (
                    <li key={index} className="drawer-item">
                      <Link
                        href={item.path}
                        className={`drawer-link ${
                          isActive(item.path) ? "active" : ""
                        }`}
                        onClick={toggleDrawer}
                      >
                        {item.icon}
                        <span>{item.text}</span>
                      </Link>
                    </li>
                  );
                }
              })}
          </ul>
        </nav>
      </div>

      {/* Overlay pour fermer le drawer en cliquant à l'extérieur */}
      {drawerOpen && (
        <div className="drawer-overlay" onClick={toggleDrawer}></div>
      )}
    </header>
  );
};

export default NavBar;
