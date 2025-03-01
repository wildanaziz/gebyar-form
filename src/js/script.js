window.onload = function () {
    alertbox.render({
        alertIcon: 'question',
        title: 'Memeriksa Lokasi... selama 1.5 detik',
        message: `Harap tunggu sementara lokasi Anda diperiksa. Pastikan GPS Anda aktif dan Anda berada di dalam radius 55 meter dari lokasi yang disarankan.`,
        border: true,
        themeColor: '#664889',
        btnTitle: '',
        btnColor: '#ffffff',
    });

    setTimeout(checkLocation, 1500); // Delay checking to allow user to see the popup
};

function checkLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var userLat = position.coords.latitude;
            var userLng = position.coords.longitude;

            // Tentukan radius dan lokasi pusat
            var centerLat = -7.9518603; // Ganti dengan latitude pusat
            var centerLng = 112.6157719; // Ganti dengan longitude pusat
            var radius = 55; // Radius dalam meter

            // Hitung jarak antara lokasi pengguna dan pusat
            var distance = calculateDistance(userLat, userLng, centerLat, centerLng);

            if (distance <= radius) {
                alertbox.render({
                    alertIcon: 'success',
                    title: 'Lokasi Sesuai!',
                    message: `Anda berada dalam radius ${distance.toFixed(2)} meter dari lokasi yang disarankan.`,
                    btnTitle: 'Lanjut',
                    btnColor: '#008000',
                    border: true,
                    themeColor: '#008000',
                });
                setTimeout(() => {
                    let alertButton = document.querySelector('.alert-btn');
                    if (alertButton) {
                        alertButton.addEventListener('click', function () {
                            updateUI('Lokasi Sesuai!', `Lokasi anda: Sekitar Sekretariat Bersama Gebyar Ramadhan. Anda berada dalam radius ${distance.toFixed(2)} meter dari pusat.`, false);
                            let formURL = atob('aHR0cHM6Ly9kb2NzLmdvb2dsZS5jb20vZm9ybXMvZC9lLzFGQUlwUUxTZHp5WE9WVHA2NUZNbnIzcjNFMExZWmRsd1pva3djbzlDSl9KdVNiWEUxM3NlVllBL3ZpZXdmb3JtP2VtYmVkZGVkPXRydWUi');
                            document.getElementById("form-container").innerHTML = `<iframe src="${formURL}" style="border:none;width:100%;height:1100px;"></iframe>`;
                            document.getElementById("form-container").style.display = 'block';
                            updateUI('Lokasi Sesuai!', `Lokasi anda: Sekitar Sekretariat Bersama Gebyar Ramadhan. Anda berada dalam radius ${distance.toFixed(2)} meter dari pusat.`, false);
                        });
                    }
                }, 200);

            } else {
                alertbox.render({
                    alertIcon: 'warning',
                    title: 'Lokasi Tidak Sesuai >_<',
                    message: `Akses ke Presensi dibatasi untuk lokasi tertentu. Seharusnya Anda mendekat ke Sekretariat Bersama Gebyar Ramadhan dalam Radius 55 meter. <br><br>Anda berada dalam radius ${distance.toFixed(2)} meter dari pusat. Kurang dekat! Butuh sekitar ${((radius - distance).toFixed(2))} meter lagi.`,
                    btnTitle: 'Coba Lagi',
                    btnColor: '#FFA500',
                    border: true,
                    themeColor: '#FFA500',
                });

                setTimeout(() => {
                    let alertButton = document.querySelector('.alert-btn');
                    if (alertButton) {
                        alertButton.addEventListener('click', function () {
                            location.reload();
                        });
                    }
                }, 200);
            }

        }, function (error) {
            alertbox.render({
                alertIcon: 'error',
                title: 'GPS Tidak Aktif!',
                message: `Gagal mendapatkan lokasi. Pastikan GPS diaktifkan. ${error.message}`,
                btnTitle: 'Cari Tahu?',
                btnColor: '#FF0000',
                border: true,
                themeColor: '#FF0000',
            });

            setTimeout(() => {
                let alertButton = document.querySelector('.alert-btn');
                if (alertButton) {
                    alertButton.addEventListener('click', function () {
                        alertbox.render({
                            alertIcon: 'warning',
                            title: 'IOS and Android Guidances',
                            message: `IOS: Buka Settings > Search "Location Services" > Location Services > Pilih Safari > Pilih "While Using the App" atau "Ask when using the App". <br><br> Android: Buka Settings > Search "Location Services" > Pilih Browser yang Anda gunakan > Permissions > Location. > Pilih "While Using the App" atau "Ask when using the App"`,
                            btnTitle: 'Coba Lagi ^_^',
                            btnColor: '#FFA500',
                            border: true,
                            themeColor: '#FFA500',
                        });

                        setTimeout(() => {
                            let alertButton = document.querySelector('.alert-btn');
                            if (alertButton) {
                                alertButton.addEventListener('click', function () {
                                    location.reload();
                                });
                            }
                        }, 200);
                    });
                }
            }, 200);
        });

    } else {
        alertbox.render({
            alertIcon: 'info',
            title: 'Browser Tidak Mendukung!',
            message: 'Geolocation tidak didukung oleh browser ini. Coba gunakan Google Chrome.',
            border: true,
            themeColor: '#484B89',
        });
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
    return R * c;
}

function updateUI(title, message, showImage) {
    document.getElementById('title').textContent = title;
    document.getElementById('message').textContent = message;
    document.getElementById('location-image').style.display = showImage ? 'block' : 'none';
}
