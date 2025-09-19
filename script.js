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
// Example job locations in Bangladesh
L.marker([23.8103, 90.4125]) // Dhaka
  .addTo(map)
  .bindPopup("Job in Dhaka");

L.marker([22.3569, 91.7832]) // Chittagong
  .addTo(map)
  .bindPopup("Job in Chittagong");

L.marker([24.9045, 91.8611]) // Sylhet
  .addTo(map)
  .bindPopup("Job in Sylhet");

L.marker([24.3745, 88.6042]) // Rajshahi
  .addTo(map)
  .bindPopup("Job in Rajshahi");
// Initialize the map
var map = L.map('map').setView([23.6850, 90.3563], 7);

// Load OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// ✅ Dynamic job markers (using array of objects)
// your existing map initialization code here

const jobs = [
  { lat: 23.8103, lon: 90.4125, title: "IT Job in Dhaka" },
  { lat: 24.8949, lon: 91.8687, title: "Marketing Job in Sylhet" },
  { lat: 22.3569, lon: 91.7832, title: "Sales Job in Chittagong" },
  { lat: 24.3636, lon: 88.6241, title: "Finance Job in Rajshahi" },
  { lat: 23.4500, lon: 89.7500, title: "Customer Support Job in Khulna" },
  { lat: 22.8456, lon: 89.5403, title: "HR Job in Barisal" },
  { lat: 25.7439, lon: 89.2752, title: "Engineer Job in Rangpur" },
  { lat: 23.9405, lon: 90.3781, title: "Design Job in Mymensingh" },
];

jobs.forEach(job => {
  L.marker([job.lat, job.lon])
    .addTo(map)
    .bindPopup(job.title);
});

