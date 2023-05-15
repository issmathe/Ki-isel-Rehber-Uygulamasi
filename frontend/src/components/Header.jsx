import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <div className="header">
      <Link to="/" className="logo">
        Kullanıcı Rehberim
      </Link>
      <div className="header-right">
        <Link to="/" className="active">
          Anasayfa
        </Link>
        <Link to="/add" className="active">
          Yeni Kullanıcı Ekle
        </Link>
      </div>
    </div>
  );
};
