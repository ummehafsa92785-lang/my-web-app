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
const jobs = [
  { lat: 23.8103, lon: 90.4125, title: "Job in Dhaka" },
  { lat: 22.3569, lon: 91.7832, title: "Job in Chittagong" },
  { lat: 24.9045, lon: 91.8611, title: "Job in Sylhet" },
  { lat: 24.3745, lon: 88.6042, title: "Job in Rajshahi" },
  { lat: 23.4607, lon: 91.1809, title: "Job in Comilla" }
];

// Loop through jobs and create markers
jobs.forEach(job => {
  L.marker([job.lat, job.lon])
    .addTo(map)
    .bindPopup(job.title);
});

