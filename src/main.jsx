import React from "react"; // Mengimport modul React dari pustaka React
import ReactDOM from "react-dom/client"; // Mengimport modul ReactDOM dari pustaka React untuk manajemen rendering

import "./index.css"; // Mengimport file CSS yang diperlukan untuk tampilan aplikasi

import App from "./App.jsx"; // Mengimport komponen App yang akan di-render

ReactDOM.createRoot(document.getElementById("root")) // Membuat root untuk rendering di dalam elemen HTML dengan ID 'root'
  .render(
    // Melakukan rendering elemen React di dalam elemen HTML menggunakan metode render
    <React.StrictMode>
      {" "}
      {/* StrictMode digunakan untuk mendeteksi dan memberi peringatan pada praktik-praktik yang sudah usang */}
      <App /> {/* Merender komponen App */}
    </React.StrictMode>
  );
