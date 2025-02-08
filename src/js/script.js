function checkLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var userLat = position.coords.latitude;
        var userLng = position.coords.longitude;

        // Tentukan radius dan lokasi pusat
        var centerLat = -7.9518603; // Ganti dengan latitude pusat
        var centerLng = 112.6157719; // Ganti dengan longitude pusat
        var radius = 50; // Radius dalam meter

        // Hitung jarak antara lokasi pengguna dan pusat
        var distance = calculateDistance(userLat, userLng, centerLat, centerLng);

        var messageElement = document.getElementById('message');
        var titleElement = document.getElementById('title');
        var imageElement = document.getElementById('location-image');
        var alertElement = document.getElementById('alert');
        
        if (distance <= radius) {
          var encodedURL = 'aHR0cHM6Ly9kb2NzLmdvb2dsZS5jb20vZm9ybXMvZC9lLzFGQUlwUUxTZHp5WE9WVHA2NUZNbnIzcjNFMExZWmRsd1pva3djbzlDSl9KdVNiWEUxM3NlVllBL3ZpZXdmb3JtP2VtYmVkZGVkPXRydWUiIHdpZHRoPSI2NDAiIGhlaWdodD0iMjEwOSIgZnJhbWVib3JkZXI9IjAiIG1hcmdpbmhlaWdodD0iMCIgbWFyZ2lud2lkdGg9IjA=';
          var formURL = atob(encodedURL);
          document.getElementById("form-container").innerHTML = '<iframe src="' + formURL + '" style="border:none;width:100%;height:1100px;"></iframe>';
          document.getElementById('form-container').style.display = 'block';
          titleElement.textContent = 'Lokasi Sesuai!';
          messageElement.textContent = 'Lokasi anda: Sekitar Sekretariat Bersama Gebyar Ramadhan '+ 'Anda berada dalam radius ' + distance.toFixed(2) + ' meter dari pusat.';
          imageElement.style.display = 'none';
        } else {
          titleElement.textContent = 'Lokasi Tidak Sesuai >_<';
          document.getElementById('message').textContent = 'Akses ke Google Form dibatasi untuk lokasi tertentu. zona radius yang disarankan: ' + radius + ' meter';
          alertElement.textContent = 'Lokasi anda: Sekitar Diluar MRP,'+ ' Anda berada dalam radius ' + distance.toFixed(2) + ' meter dari pusat.';
          imageElement.style.display = 'block';
        }
      }, function(error) {
        titleElement.textContent = 'Nyalain dulu dong GPS Lokasinya :(';
        document.getElementById('message').textContent = 'Gagal mendapatkan lokasi. Pastikan lokasi diaktifkan.' + error.message;
        imageElement.style.display = 'block';
      });
    } else {
      titleElement.textContent = 'Coba pake browser google chrome yak :)';
      document.getElementById('message').textContent = 'Geolocation tidak didukung oleh browser ini.';
      imageElement.style.display = 'block';
    }
}

function calculateDistance(lat1, lng1, lat2, lng2) {
    var R = 6371000; // Radius bumi dalam meter
    var dLat = (lat2 - lat1) * Math.PI / 180;
    var dLng = (lng2 - lng1) * Math.PI / 180;
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
}

window.onload = checkLocation;