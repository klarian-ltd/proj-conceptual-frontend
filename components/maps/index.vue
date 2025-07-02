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
							center: [-3.455318840685571, 50.73115849744835], // starting position [lng, lat]
							zoom: 15, // starting zoom
						}"
						:style="{
							height: `450px`,
							borderRadius: '10px',
							margin: '10px',
						}"
					>
						<MapboxLayer v-if="enabled" :layer="layerRef" @click="showAlert" />
						<MapboxSource v-if="enabled" source-id="geojson" :source="source" />
						<MapboxDefaultMarker
							marker-id="customHTMLMarker"
							:lnglat="{ lng: -3.455318840685571, lat: 50.73115849744835 }"
							:options="{
								draggable: true,
							}"
						>
							<template #marker>
								<UButton @click="showAlert">Map Button!</UButton>
							</template>
						</MapboxDefaultMarker>
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
				<UButton class="w-full justify-center" @click="changeData">
					Change Data
				</UButton>
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
	import {
		computed,
		ref,
		useMapboxMarkerRef,
		useMapboxPopup,
		useMapboxPopupRef,
		useMapboxRef,
	} from '#imports';
	import { MapboxGeocoder } from '#components';
	import type { SourceSpecification, FillLayerSpecification } from 'mapbox-gl';
	function showAlert() {
		alert('Wow');
	}

	const source = ref<SourceSpecification>({
		type: 'geojson',
		data: '/test.geojson',
	});

	const enabled = ref(true);

	const mapRef = useMapboxRef('map2');

	const mapStyle = computed(() => {
		return mapRef.value?.getStyle();
	});

	const marker = useMapboxMarkerRef('');
	const popup = useMapboxPopupRef('');

	const markerLatLng = computed(() => {
		return marker.value?.getLngLat();
	});

	function changeData() {
		source.value = {
			type: 'geojson',
			data: {
				type: 'Feature',
				geometry: {
					type: 'Polygon',
					// These coordinates outline Maine.
					coordinates: [
						[
							[-67.13734, 45.13745],
							[-66.96466, 44.8097],
							[-68.03252, 44.3252],
							[-69.06, 43.98],
							[-70.11617, 43.68405],
							[-70.64573, 43.09008],
							[-70.75102, 43.08003],
							[-70.79761, 43.21973],
							[-70.98176, 43.36789],
							[-70.94416, 43.46633],
							[-71.08482, 45.30524],
							[-70.66002, 45.46022],
							[-70.30495, 45.91479],
							[-70.00014, 46.69317],
							[-69.23708, 47.44777],
							[-68.90478, 47.18479],
							[-68.2343, 47.35462],
							[-67.79035, 47.06624],
							[-67.79141, 45.70258],
							[-67.13734, 45.13745],
						],
					],
				},
			},
		};
	}

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

	const geocoderRef = ref<InstanceType<typeof MapboxGeocoder>>();
	const geocoder = computed(() => geocoderRef.value?.geocoder);

	const geocoderRes = ref();

	const layerRef = ref<FillLayerSpecification>({
		source: 'geojson',
		id: 'geojson-layer',
		type: 'fill',
		paint: {
			'fill-color': 'rgb(0,0,0)',
		},
	});
</script>
