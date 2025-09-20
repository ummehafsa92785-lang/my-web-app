let map;
let markers = [];

// Initialize map
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 23.8103, lng: 90.4125 }, // Dhaka
    zoom: 11,
  });
}

// Add job marker
function addJob() {
  let jobTitle = document.getElementById("jobTitle").value;
  let lat = parseFloat(document.getElementById("lat").value);
  let lng = parseFloat(document.getElementById("lng").value);
  let company = document.getElementById("company").value;

  if (!jobTitle || isNaN(lat) || isNaN(lng) || !company) {
    alert("⚠️ Please fill all fields correctly!");
    return;
  }

  let marker = new google.maps.Marker({
    position: { lat: lat, lng: lng },
    map: map,
    title: jobTitle,
    icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
  });

  let infoWindow = new google.maps.InfoWindow({
    content: `<b>${jobTitle}</b><br>${company}<br>Lat: ${lat}, Lng: ${lng}`
  });

  marker.addListener("click", () => {
    infoWindow.open(map, marker);
  });

  markers.push(marker);

  // Clear form after entry
  document.getElementById("jobTitle").value = "";
  document.getElementById("lat").value = "";
  document.getElementById("lng").value = "";
  document.getElementById("company").value = "";
}
