/* ==================== KAKAO MAP ==================== */

var mapContainer = document.getElementById("map");

var mapOption = {
    center: new kakao.maps.LatLng(37.4979, 127.0276),
    level: 4
};

var map = new kakao.maps.Map(mapContainer, mapOption);


/* ==================== STORE MARKER ==================== */

var markerPosition = new kakao.maps.LatLng(
    37.4979,
    127.0276
);

var marker = new kakao.maps.Marker({
    position: markerPosition
});

marker.setMap(map);