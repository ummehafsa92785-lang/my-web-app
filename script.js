function initMap() {
  // Centered on Bangladesh
  const bangladesh = { lat: 23.6850, lng: 90.3563 };

  // Create map
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 7,
    center: bangladesh,
  });

  // Example Job Locations
  const jobs = [
    { lat: 23.8103, lng: 90.4125, title: "Dhaka: IT Job Fair" },
    { lat: 22.3475, lng: 91.8123, title: "Chattogram: Textile Jobs" },
    { lat: 24.3636, lng: 88.6241, title: "Rajshahi: Agro Industry Jobs" }
  ];

  // Add markers
  jobs.forEach(job => {
    new google.maps.Marker({
      position: { lat: job.lat, lng: job.lng },
      map,
      title: job.title
    });
  });
}
