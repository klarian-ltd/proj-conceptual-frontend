<template>
	<div class="flex h-screen overflow-hidden">
		<!-- Sidebar -->
		<Sidebar />
		<!-- Inner Header Content Area -->
		<main class="flex-1 overflow-auto p-6">
			<!-- Inner Header Content Area -->
			<div class="m-4 flex items-center justify-between">
				<h1 class="text-primary text-3xl font-bold">
					{{ $route.meta.title }}
				</h1>
			</div>
			<USeparator icon="garden:workflow-26" class="px-3 pb-3" color="primary" />

			<div class="border-primary m-4 flex h-200 flex-col border-2">
				<VueFlow :nodes="initialNodes" :edges="initialEdges">
					<Background />
					<FlowBuilderDropzoneBackground
						:style="{
							backgroundColor: isDragOver ? '#e7f3ff' : 'transparent',
							transition: 'background-color 0.2s ease',
						}"
					>
						<p v-if="isDragOver">Drop here</p>
					</FlowBuilderDropzoneBackground>
				</VueFlow>

				<FlowBuilderDragItems />
			</div>
		</main>
	</div>
</template>

<script setup lang="ts">
	import type { Node, Edge } from '@vue-flow/core';
	import { VueFlow, useVueFlow, MarkerType } from '@vue-flow/core';
	import { ref } from 'vue';
	import { useDragAndDrop } from '@/composables/useDragAndDrop';
	import { definePageMeta } from '#imports';

	definePageMeta({
		title: 'Flow Builder',
	});

	const initialNodes = ref<Node[]>([
		{
			id: '1',
			type: 'input',
			data: { label: 'Node 1' },
			position: { x: 250, y: 0 },
			class: 'light',
		},
		{
			id: '2',
			type: 'output',
			data: { label: 'Node 2' },
			position: { x: 100, y: 100 },
			class: 'light',
		},
		{
			id: '3',
			data: { label: 'Node 3' },
			position: { x: 400, y: 100 },
			class: 'light',
		},
		{
			id: '4',
			data: { label: 'Node 4' },
			position: { x: 150, y: 200 },
			class: 'light',
		},
		{
			id: '5',
			type: 'output',
			data: { label: 'Node 5' },
			position: { x: 300, y: 300 },
			class: 'light',
		},
	]);

	const initialEdges = ref<Edge[]>([
		{
			id: 'e1-2',
			source: '1',
			target: '2',
			animated: true,
		},
		{
			id: 'e1-3',
			source: '1',
			target: '3',
			label: 'edge with arrowhead',
			markerEnd: MarkerType.ArrowClosed,
		},
		{
			id: 'e4-5',
			type: 'step',
			source: '4',
			target: '5',
			label: 'Node 2',
			style: { stroke: 'orange' },
			labelBgStyle: { fill: 'orange' },
		},
		{
			id: 'e3-4',
			type: 'smoothstep',
			source: '3',
			target: '4',
			label: 'smoothstep-edge',
		},
	]);

	const { onNodeDragStop, onConnect, onInit } = useVueFlow();

	onInit((vueFlowInstance) => {
		// instance is the same as the return of `useVueFlow`
		vueFlowInstance.fitView();
	});

	const { onDragOver, onDrop, onDragLeave, isDragOver } = useDragAndDrop();
</script>
