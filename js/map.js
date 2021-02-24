import {activateFilter} from './filters.js';
import {activateForm, address} from './form.js';
import {similarCard, generateCard} from './card.js';

const Coordinates = {
  LAT: 35.65841,
  LNG: 139.78145,
};

/* global L:readonly */

const map = L.map('map-canvas')
  .on('load', () => {
    activateFilter();
    activateForm();
    address.value = `${Coordinates.LAT}, ${Coordinates.LNG}`
  })
  .setView({
    lat: Coordinates.LAT,
    lng: Coordinates.LNG,
  }, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinMarker = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const mainMarker = L.marker(
  {
    lat: Coordinates.LAT,
    lng: Coordinates.LNG,
  },
  {
    draggable: true,
    icon: mainPinMarker,
  },
);

mainMarker.addTo(map);

mainMarker.on('moveend', (evt) => {
  address.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
});

const anotherPin = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

similarCard.forEach((card) => {
  const anotherMarker = L.marker(
    {
      lat: card.location.x,
      lng: card.location.y,
    },
    {
      icon: anotherPin,
    },
  );

  anotherMarker
    .addTo(map)
    .bindPopup(generateCard(card));
});