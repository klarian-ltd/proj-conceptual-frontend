<template>
	<div>
		<div class="flex flex-row py-4">
			<div class="border-primary-500 flex w-full flex-col rounded-md border">
				<h1 class="mt-2 flex justify-center text-2xl font-bold">Preview</h1>
				<USeparator class="p-4" color="primary" />
				<div class="flex flex-row">
					<MapboxMap
						map-id="map"
						:options="{
							style, // style URL
							center: [lnglat[0], lnglat[1]], // starting position [lng, lat]
							zoom: 15, // starting zoom
						}"
						:style="{
							height: `450px`,
							borderRadius: '10px',
							margin: '10px',
						}"
					>
						<MapboxLayer v-if="enabled" :layer="layerRef" @click="showAlert" />
						<MapboxDefaultMarker
							v-model:lnglat="lnglat"
							marker-id="marker1"
							:options="{
								draggable: true,
							}"
						>
							<MapboxDefaultPopup
								popup-id="popup1"
								:lnglat="[0, 0]"
								:options="{
									closeOnClick: false,
								}"
							>
								<h1 class="test">
									Hello World! {{ lnglat }}
									<UButton @click="showAlert">Click Me!</UButton>
								</h1>
							</MapboxDefaultPopup>
						</MapboxDefaultMarker>
						<TestMarker
							marker-id="marker2"
							:options="{
								lnglat,
							}"
						/>
						<TestControl />
						<MapboxGeocoder
							ref="geocoderRef"
							v-model="geocoderRes"
							position="top-left"
							:options="{
								version: 'v6',
							}"
							@result="
								(result) => {
									console.log(result);
								}
							"
						/>
						<MapboxAttributionControl />
						<MapboxScaleControl />
						<MapboxNavigationControl />
						<MapboxGeolocateControl />
					</MapboxMap>
				</div>
			</div>
			<div class="ml-4 flex w-full flex-col gap-2">
				<UButton class="w-full justify-center" @click="changeLngLat">
					Move Marker
				</UButton>
				<UButton class="w-full justify-center" @click="changeStyle">
					Random Style
				</UButton>
			</div>
		</div>
		<UButton class="w-full justify-center" @click="applyMap">Apply Map</UButton>
	</div>
</template>

<script setup lang="ts">
	import { ref } from '#imports';
	import { MapboxGeocoder } from '#components';
	import type { FillLayerSpecification } from 'mapbox-gl';

	function showAlert() {
		alert('Wow');
	}

	const geocoderRes = ref();

	const enabled = ref(true);

	const lnglat = ref([-3.455318840685571, 50.73115849744835] as [
		number,
		number,
	]);
	function changeLngLat() {
		lnglat.value = [lnglat.value[0] + 1, lnglat.value[1] + 1];
	}

	const style = ref('mapbox://styles/mapbox/standard');
	function changeStyle() {
		const styles = [
			'satellite-streets-v12',
			'light-v11',
			'dark-v11',
			'streets-v12',
		];
		const randStyle = styles[Math.floor(Math.random() * styles.length)];
		style.value = `mapbox://styles/mapbox/${randStyle}`;
	}

	const layerRef = ref<FillLayerSpecification>({
		source: 'geojson',
		id: 'geojson-layer',
		type: 'fill',
		paint: {
			'fill-color': 'rgb(0,0,0)',
		},
	});

	function applyMap() {
		console.log('applyMap');
	}
</script>
