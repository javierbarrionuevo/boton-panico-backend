const express = require("express");
const fetch = require("node-fetch");

const app = express();
app.use(express.json());

// 🔑 TU TOKEN DEL BOT
const BOT_TOKEN = "8468879482:AAEk04Hfb0ZjiJ5onZ2IhfI1Bd9-emyjYZg";

// 🧠 Base simple (device_id → chat_id)
let devices = {
  "ABC123": "-1003901489130"
};

// 📡 Endpoint de alerta
app.get("/alert", async (req, res) => {
  const deviceId = req.query.device_id;

  console.log("Alerta de:", deviceId);

  const chatId = devices[deviceId];

  if (!chatId) {
    console.log("Dispositivo no registrado");
    return res.send("Dispositivo no registrado");
  }

  const mensaje = "🚨 ALERTA BOTON PANICO";

  try {
    // ✅ Envío SIMPLE (como el navegador)
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(mensaje)}`);

    const data = await response.text();
    console.log("Respuesta Telegram:", data);

    res.send("Alerta enviada");
  } catch (error) {
    console.log("Error:", error);
    res.send("Error al enviar alerta");
  }
});

// 🚀 Iniciar servidor
app.listen(3000,"0.0.0.0", () => {
  console.log("Servidor corriendo en puerto 8080");
});