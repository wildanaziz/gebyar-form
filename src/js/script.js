function checkLocation() {
  if (!navigator.geolocation) {
      updateUI('Coba pake browser Google Chrome yak :)', 
               'Geolocation tidak didukung oleh browser ini.', 
               true);
      return;
  }

  navigator.permissions?.query({ name: 'geolocation' }).then(permission => {
      if (permission.state === 'denied') {
          updateUI('Izin Lokasi Ditolak!', 
                   'Silakan aktifkan izin lokasi di pengaturan browser.', 
                   true);
          return;
      }

      navigator.geolocation.getCurrentPosition(
          function (position) {
              let userLat = parseFloat(position.coords.latitude.toFixed(6));
              let userLng = parseFloat(position.coords.longitude.toFixed(6));

              let centerLat = -7.9518603; // Pusat lokasi
              let centerLng = 112.6157719;
              let radius = 50; // Meter

              let distance = calculateDistance(userLat, userLng, centerLat, centerLng);

              if (distance <= radius) {
                  let formURL = atob('aHR0cHM6Ly9kb2NzLmdvb2dsZS5jb20vZm9ybXMvZC9lLzFGQUlwUUxTZHp5WE9WVHA2NUZNbnIzcjNFMExZWmRsd1pva3djbzlDSl9KdVNiWEUxM3NlVllBL3ZpZXdmb3JtP2VtYmVkZGVkPXRydWUi');
                  document.getElementById("form-container").innerHTML = `<iframe src="${formURL}" style="border:none;width:100%;height:1100px;"></iframe>`;
                  document.getElementById("form-container").style.display = 'block';
                  updateUI('Lokasi Sesuai!', 
                           `Lokasi anda: Sekitar Sekretariat Bersama Gebyar Ramadhan. Anda berada dalam radius ${distance.toFixed(2)} meter dari pusat.`, 
                           false);
              } else {
                  updateUI('Lokasi Tidak Sesuai >_<', 
                           `Akses ke Google Form dibatasi untuk lokasi tertentu. Anda berada dalam radius ${distance.toFixed(2)} meter dari pusat.`, 
                           true);
              }
          },
          function (error) {
              let errorMessage = getGeolocationErrorMessage(error);
              updateUI('Nyalain dulu dong GPS Lokasinya :(', errorMessage, true);
          },
          { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
  });
}

function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371000; // Radius Bumi dalam meter
  const rad = Math.PI / 180;
  const dLat = (lat2 - lat1) * rad;
  const dLng = (lng2 - lng1) * rad;

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * rad) * Math.cos(lat2 * rad) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);

  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

function updateUI(title, message, showImage) {
  document.getElementById('title').textContent = title;
  document.getElementById('message').textContent = message;
  document.getElementById('alert').textContent = message;
  document.getElementById('location-image').style.display = showImage ? 'block' : 'none';
}

function getGeolocationErrorMessage(error) {
  switch (error.code) {
      case error.PERMISSION_DENIED:
          return 'Akses lokasi ditolak. Pastikan izin lokasi diaktifkan di pengaturan browser.';
      case error.POSITION_UNAVAILABLE:
          return 'Informasi lokasi tidak tersedia. Coba lagi nanti.';
      case error.TIMEOUT:
          return 'Permintaan lokasi melebihi batas waktu. Coba lagi.';
      default:
          return 'Terjadi kesalahan saat mendapatkan lokasi.';
  }
}

window.onload = checkLocation;
