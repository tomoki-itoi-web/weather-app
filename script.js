const map = L.map('map').setView([35.6895, 139.6917], 5);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        try {
            const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,weather_code`;
            const res = await fetch(url);
            const data = await res.json();
            
            const temp = data.current.temperature_2m;
            const code = data.current.weather_code;
            const desc = code <= 1 ? "晴れ" : (code <= 3 ? "曇り" : "雨/雪");

            map.setView([lat, lng], 15);
            L.marker([lat, lng]).addTo(map)
                .bindPopup(`<b>現在地</b><br>気温: ${temp}°C<br>天気: ${desc}`)
                .openPopup();
        } catch (e) {
            console.error(e);
        }
    });
}