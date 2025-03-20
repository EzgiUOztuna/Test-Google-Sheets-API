import React, { useEffect, useState } from "react";

const sheetId = "19q2hnui40Jky_W5QN-PM2OmNlA3mOv6aGQrQn2OmDVk"; // Google Sheets ID'yi buraya ekleyin
const apiKey = "AIzaSyDyaru1_xPfoza-yMBKJSOGrgQy4Uw2Tdc"; // Google Cloud API Key buraya ekleyin
const range = "Sheet1"; // Çalışma sayfasının adı

const App = () => {
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          const rows = data.values.slice(1); // Başlıkları atla
          const formattedData = rows.map((row) => ({
            name: row[0], // Şube Adı
            address: row[1], // Adres
            imageUrl: row[2], // Resim URL
            status: row[3], // Durum (Açık / Açıldı)
            openingDate: row[4], // Açılış Tarihi
          }));
          setBranches(formattedData);
        })
        .catch((error) => console.error("Hata:", error));
    };

    fetchData();
    const interval = setInterval(fetchData, 60000); // Her 1 dakikada bir güncelle
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Şubelerimiz</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {branches.map((branch, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "10px",
              width: "250px",
            }}
          >
            <img
              src={branch.imageUrl}
              alt={branch.name}
              style={{ width: "100%", borderRadius: "10px" }}
            />
            <h3>{branch.name}</h3>
            <p>{branch.address}</p>
            <p><strong>Durum:</strong> {branch.status}</p>
            <p><strong>Açılış Tarihi:</strong> {branch.openingDate}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
