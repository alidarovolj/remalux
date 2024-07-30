<template>
  <div class="my-5">
    <div class="mb-4">
      <p class="text-sm text-[#6E6B7B] mb-1">
        {{ $t('addresses.create.provide_address') }}
      </p>
      <div class="relative">
        <div class="flex">
          <input
              v-model="searchQuery"
              class="py-2 px-4 border rounded-md w-full bg-white"
              :placeholder="$t('addresses.create.address_placeholder')"
              type="text"
              @input="updateSuggestions"
          />
        </div>
        <ul
            v-if="showSuggestions"
            class="suggestions bg-white shadow-md">
          <li
              v-for="(suggestion, index) in suggestions"
              :key="index"
              class="px-4 py-1 hover:bg-gray-100 transition-all cursor-pointer"
              @click="selectSuggestion(suggestion)"
          >
            {{ suggestion.displayName }}
          </li>
        </ul>
      </div>
    </div>
    <div id="map" class="mb-3"></div>
  </div>
</template>

<script>
let ymaps;
export default {
  name: 'YandexMap',
  props: {
    ifRegion: {
      type: Object,
      required: false
    }
  },
  emits: ['send_data'],
  data() {
    return {
      mapCoordinates: null,
      address: null,
      placemarks: [],
      searchQuery: '',
      showSuggestions: false,
      suggestions: []
    };
  },
  mounted() {
    document.cookie = 'SameSite=None; Secure';
    if (this.ifRegion) {
      this.searchQuery = this.ifRegion;
    }
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://api-maps.yandex.ru/2.1/?apikey=cb1a41b4-32a9-452b-a763-e703f67e5c0a&lang=ru_RU';
    script.onload = () => {
      ymaps = window.ymaps;
      this.initializeMap();
    }
    document.head.appendChild(script);
  },
  methods: {
    initializeMap() {
      ymaps.ready(() => {
        this.map = new ymaps.Map('map', {
          center: [51.13547408998441, 71.44767822265625],
          zoom: 12,
          controls: [
            'zoomControl',
            'geolocationControl',
            'fullscreenControl',
            'rulerControl'
          ]
        });

        this.map.events.add('click', async (e) => {
          const target = e.get('target');
          if (target && target instanceof ymaps.Placemark) {
            const coords = target.geometry.getCoordinates();
            this.getAddress(coords);
            this.mapCoordinates = coords;
            this.address = target.properties.get('balloonContentHeader');
          } else {
            const coords = e.get('coords');
            this.getAddress(coords);
            this.map.geoObjects.removeAll();
            this.placemarks = [];
            const myPlacemark = new ymaps.Placemark(coords, {}, {});
            this.placemarks.push(myPlacemark);
            this.map.geoObjects.add(myPlacemark);
            this.mapCoordinates = coords;
            const res = await ymaps.geocode(coords);
            const firstGeoObject = res.geoObjects.get(0);
            const address = firstGeoObject.getAddressLine();
            this.address = address;
            this.searchQuery = address;
            this.$emit('send_data', {
              coordinates: this.mapCoordinates,
              address: this.address
            });
          }
        });
      });
    },
    async getAddress(coords) {
      const res = await ymaps.geocode(coords);
      const firstGeoObject = res.geoObjects.get(0);
      const addressDetails = firstGeoObject.properties.get('metaDataProperty').GeocoderMetaData.Address;

      const city = addressDetails.Components.find(component => component.kind === 'locality')?.name || '';
      const country = addressDetails.Components.find(component => component.kind === 'country')?.name || '';
      const state = addressDetails.Components.find(component => component.kind === 'province')?.name || '';
      const zipcode = addressDetails.postal_code || firstGeoObject.properties.get('metaDataProperty').GeocoderMetaData.AddressDetails.Country.AdministrativeArea.SubAdministrativeArea?.Locality?.Thoroughfare?.Premise?.PostalCode?.PostalCodeNumber || '';

      console.log({city, country, state, zipcode});
      this.$emit('send_data', {
        city: city,
        country: country,
        state: state,
        zipcode: zipcode
      });
    },
    updateSuggestions() {
      if (this.searchQuery) {
        console.log('Updating suggestions for:', this.searchQuery);
        ymaps.geocode(this.searchQuery, {
          boundedBy: this.map.getBounds()
        })
            .then((res) => {
              const geoObjects = res.geoObjects.toArray();
              console.log('GeoObjects received:', geoObjects);
              this.suggestions = geoObjects.map(obj => ({
                displayName: obj.getAddressLine(),
                coords: obj.geometry.getCoordinates()
              }));
              this.showSuggestions = true;
            }).catch(error => {
          console.error('Error fetching suggestions:', error);
        });
      } else {
        this.showSuggestions = false;
      }
    },
    selectSuggestion(suggestion) {
      this.searchQuery = suggestion.displayName;
      this.showSuggestions = false;
      this.addPlacemark(suggestion.coords, suggestion.displayName);
      this.map.setCenter(suggestion.coords);
      this.map.setZoom(15);
    },
    addPlacemark(coords, displayName) {
      this.map.geoObjects.removeAll();
      this.placemarks = [];
      const myPlacemark = new ymaps.Placemark(coords, {}, {});
      this.placemarks.push(myPlacemark);
      this.map.geoObjects.add(myPlacemark);
      this.mapCoordinates = coords;
      this.address = displayName;
      this.$emit('send_data', {
        coordinates: this.mapCoordinates,
        address: this.address
      });
    }
  }
};
</script>

<style>
#map {
  height: 300px;
}

.suggestions {
  list-style-type: none;
  padding: 0;
  position: absolute;
  left: 0;
  top: 100%;
  width: 100%;
  height: auto;
  z-index: 15;
}

.suggestions li {
  cursor: pointer;
}
</style>
