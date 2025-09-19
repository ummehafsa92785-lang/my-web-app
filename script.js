// Centered on Bangladesh
var map = L.map('map').setView([23.6850, 90.3563], 7);

// Use OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Sample job marker
L.marker([23.8103, 90.4125]) // Dhaka
  .addTo(map)
  .bindPopup('Job in Dhaka')
  .openPopup();

