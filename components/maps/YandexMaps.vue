<template>
  <div>
    <div id="map" style="width: 100%; height: 335px;"></div>
  </div>
</template>

<script>
export default {
  name: 'MapWithSearch',
  data() {
    return {
      map: null,
      searchControl: null,
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      ymaps.ready(() => {
        this.map = new ymaps.Map('map', {
          center: [43.273564, 76.914851],
          zoom: 10,
          controls: ['zoomControl', 'searchControl'],
        });

        this.searchControl = this.map.controls.get('searchControl');

        this.searchControl.events.add('resultselect', (e) => {
          const index = e.get('index');
          this.searchControl.getResult(index).then((result) => {
            const address = result.properties.get('text');
            this.$emit('send_data', {address});
          }).catch((error) => {
            console.error('Error retrieving search result:', error);
          });
        });
      });
    },
  },
};
</script>