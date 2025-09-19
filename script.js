// ----------------- FIREBASE CONFIG -----------------
// Replace the placeholder object below with your Firebase config.
// You get this from Firebase console when you create a web app for your project.
var firebaseConfig = {
  apiKey: "FIREBASE_API_KEY",
  authDomain: "FIREBASE_PROJECT.firebaseapp.com",
  projectId: "FIREBASE_PROJECT",
  storageBucket: "FIREBASE_PROJECT.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

// ----------------- MAP & APP LOGIC -----------------
var map;
var markers = {};
var jobsCol = db.collection('jobs');

function initMap() {
  // Center on Bangladesh
  var bd = { lat: 23.777176, lng: 90.399452 };
  map = new google.maps.Map(document.getElementById('map'), {
    center: bd,
    zoom: 7
  });

  // When user clicks on map, fill latitude and longitude fields
  map.addListener('click', function (event) {
    document.getElementById('job-lat').value = event.latLng.lat().toFixed(6);
    document.getElementById('job-lng').value = event.latLng.lng().toFixed(6);
  });

  // Start listening to jobs collection (real-time)
  listenJobs();
}

// Add job marker to map and to HTML list
function addJobToUI(id, data) {
  // Create or update marker
  if (markers[id]) {
    markers[id].setPosition({ lat: data.lat, lng: data.lng });
  } else {
    var marker = new google.maps.Marker({
      position: { lat: data.lat, lng: data.lng },
      map: map,
      title: data.title
    });
    marker.addListener('click', function () {
      map.setCenter(marker.getPosition());
      map.setZoom(14);
    });
    markers[id] = marker;
  }

  // Update jobs list
  var jobsDiv = document.getElementById('jobs');
  var existing = document.getElementById('job-' + id);
  var html = '<div class="job-card" id="job-' + id + '">';
  html += '<h3>' + escapeHtml(data.title) + '</h3>';
  html += '<p><strong>' + escapeHtml(data.company) + '</strong></p>';
  html += '<p>' + escapeHtml(data.desc || '') + '</p>';
  html += '<p>Lat: ' + data.lat.toFixed(6) + ' Lng: ' + data.lng.toFixed(6) + '</p>';
  html += '<button onclick="zoomToJob(\'' + id + '\')">Show on map</button>';
  html += ' <button onclick="deleteJob(\'' + id + '\')">Delete</button>';
  html += '</div>';

  if (existing) {
    existing.outerHTML = html;
  } else {
    jobsDiv.insertAdjacentHTML('afterbegin', html);
  }
}

function removeJobFromUI(id) {
  if (markers[id]) {
    markers[id].setMap(null);
    delete markers[id];
  }
  var el = document.getElementById('job-' + id);
  if (el) el.remove();
}

function listenJobs() {
  // Real-time listener: when collection changes, update UI
  jobsCol.orderBy('createdAt', 'desc').onSnapshot(function (snapshot) {
    snapshot.docChanges().forEach(function (change) {
      var id = change.doc.id;
      var data = change.doc.data();
      if (change.type === 'added' || change.type === 'modified') {
        addJobToUI(id, data);
      }
      if (change.type === 'removed') {
        removeJobFromUI(id);
      }
    });
  }, function (err) {
    console.error('Listen error: ', err);
  });
}

// When form submitted, save job to Firestore
document.getElementById('job-form').addEventListener('submit', function (e) {
  e.preventDefault();
  var title = document.getElementById('job-title').value.trim();
  var company = document.getElementById('job-company').value.trim();
  var desc = document.getElementById('job-desc').value.trim();
  var lat = parseFloat(document.getElementById('job-lat').value);
  var lng = parseFloat(document.getElementById('job-lng').value);

  if (!title || !company || isNaN(lat) || isNaN(lng)) {
    alert('Please complete title, company and pick a location on the map.');
    return;
  }

  jobsCol.add({
    title: title,
    company: company,
    desc: desc,
    lat: lat,
    lng: lng,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  }).then(function () {
    // clear form
    document.getElementById('job-form').reset();
    alert('Job saved! It will appear on the map shortly.');
  }).catch(function (err) {
    console.error(err);
    alert('Error saving job: ' + err.message);
  });
});

document.getElementById('clear-form').addEventListener('click', function () {
  document.getElementById('job-form').reset();
});

// Delete job
function deleteJob(id) {
  if (!confirm('Delete this job?')) return;
  jobsCol.doc(id).delete().catch(function (err) {
    console.error('Delete error', err);
  });
}

// Zoom map to a job marker
function zoomToJob(id) {
  var marker = markers[id];
  if (marker) {
    map.setCenter(marker.getPosition());
    map.setZoom(14);
  }
}

// small helper to escape HTML (avoid XSS in simple UI)
function escapeHtml(text) {
  if (!text) return '';
  return text.replace(/[&<>"']/g, function (m) {
    return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[m];
  });
}
