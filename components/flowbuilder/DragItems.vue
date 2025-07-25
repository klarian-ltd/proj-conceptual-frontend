<template>
	<div>
		<aside class="bg-primary flex flex-col justify-center p-4">
			<h1 class="mb-4 text-center text-white">
				Drag and drop nodes to the pane.
			</h1>
			<div class="bg-primary flex justify-center gap-2">
				<div
					class="border-klarian-gray rounded-lg border-1 bg-white p-2 shadow-lg"
					:draggable="true"
					@dragstart="onDragStart($event, 'input')"
				>
					Input Node
				</div>

				<div
					class="border-klarian-gray rounded-lg border-1 bg-white p-2 shadow-lg"
					:draggable="true"
					@dragstart="onDragStart($event, 'default')"
				>
					Default Node
				</div>

				<div
					class="border-klarian-gray rounded-lg border-1 bg-white p-2 shadow-lg"
					:draggable="true"
					@dragstart="onDragStart($event, 'output')"
				>
					Output Node
				</div>
			</div>
		</aside>
	</div>
</template>

<script setup lang="ts">
import { useDragAndDrop } from '@/composables/useDragAndDrop';

const { onDragStart } = useDragAndDrop();
</script>
