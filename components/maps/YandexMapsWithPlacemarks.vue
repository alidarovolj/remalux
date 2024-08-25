<template>
  <div>
    <div id="map" style="width: 100%; height: 335px;"></div>
  </div>
</template>

<script>
import {markRaw} from 'vue';

export default {
  name: 'MapWithSearch',
  data() {
    return {
      map: null,
      placemark: null,
    };
  },
  props: {
    location: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    this.initMap();
  },
  watch: {
    location: {
      handler(newLocation) {
        if (this.map) {
          // Update the map's center
          this.map.setCenter([newLocation.longitude, newLocation.latitude]);

          // Force the map to refresh and display tiles correctly
          this.map.container.fitToViewport();

          // Safely update the placemark
          if (this.placemark) {
            this.map.geoObjects.remove(this.placemark); // Remove the existing placemark
            this.addPlacemark(newLocation); // Add a new placemark with the updated location
          } else {
            this.addPlacemark(newLocation); // Create a new placemark if it doesn't exist
          }
        }
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    initMap() {

      ymaps.ready(() => {
        this.map = markRaw(new ymaps.Map('map', {
          center: [this.location.longitude, this.location.latitude],
          zoom: 16,
          controls: ['zoomControl'],
        }));

        // Add an initial placemark
        this.addPlacemark(this.location);
      });
    },
    addPlacemark(location) {
      if (!this.map) return;

      this.placemark = markRaw(new ymaps.Placemark(
          [location.longitude, location.latitude],
          {},
          {
            preset: 'islands#icon',
            iconColor: '#0095b6',
          }
      ));

      this.map.geoObjects.add(this.placemark);
    },
  },
};
</script>
