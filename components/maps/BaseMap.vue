<template>
  <div class="relative w-full h-full">
    <!-- Map container -->
    <div ref="mapContainer" class="absolute inset-0 z-0" />
    <!-- Map overlays slot -->
    <div class="absolute inset-0 pointer-events-none z-10">
      <slot name="overlays" />
    </div>
    <!-- Map controls slot (top right) -->
    <div class="absolute top-4 right-4 z-20 flex flex-col gap-2 pointer-events-auto">
      <slot name="controls" />
    </div>
    <!-- Default slot for any other content -->
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import mapboxgl from 'mapbox-gl';

const mapContainer = ref<HTMLElement | null>(null);
let map: mapboxgl.Map | null = null;

// TODO: Replace with your Mapbox access token
const MAPBOX_TOKEN = 'YOUR_MAPBOX_ACCESS_TOKEN';

onMounted(() => {
  if (mapContainer.value) {
    mapboxgl.accessToken = MAPBOX_TOKEN;
    map = new mapboxgl.Map({
      container: mapContainer.value,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [0, 0],
      zoom: 2,
    });
    // Add default controls (zoom, etc)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');
  }
});

onBeforeUnmount(() => {
  if (map) {
    map.remove();
    map = null;
  }
});
</script>

<!--
USAGE EXAMPLE:
<BaseMap>
  <template #overlays>
    <MyOverlayComponent />
  </template>
  <template #controls>
    <MyCustomControl />
  </template>
</BaseMap>
-->
