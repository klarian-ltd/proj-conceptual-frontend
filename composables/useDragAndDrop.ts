import { useVueFlow } from '@vue-flow/core';
import { ref, watch, type Ref } from 'vue';

const id = ref(0);

function getId(): string {
	return `dndnode_${id.value++}`;
}

interface DragAndDropState {
	draggedType: Ref<string | null>;
	isDragOver: Ref<boolean>;
	isDragging: Ref<boolean>;
}

const state: DragAndDropState = {
	draggedType: ref<string | null>(null),
	isDragOver: ref<boolean>(false),
	isDragging: ref<boolean>(false),
};

export function useDragAndDrop() {
	const { draggedType, isDragOver, isDragging } = state;

	const { addNodes, screenToFlowCoordinate, onNodesInitialized, updateNode } =
		useVueFlow();

	watch(isDragging, (dragging: boolean) => {
		document.body.style.userSelect = dragging ? 'none' : '';
	});

	function onDragStart(event: DragEvent, type: string): void {
		if (event.dataTransfer) {
			event.dataTransfer.setData('application/vueflow', type);
			event.dataTransfer.effectAllowed = 'move';
		}

		draggedType.value = type;
		isDragging.value = true;

		document.addEventListener('drop', onDragEnd);
	}

	function onDragOver(event: DragEvent): void {
		event.preventDefault();

		if (draggedType.value) {
			isDragOver.value = true;

			if (event.dataTransfer) {
				event.dataTransfer.dropEffect = 'move';
			}
		}
	}

	function onDragLeave(): void {
		isDragOver.value = false;
	}

	function onDragEnd(): void {
		isDragging.value = false;
		isDragOver.value = false;
		draggedType.value = null;
		document.removeEventListener('drop', onDragEnd);
	}

	function onDrop(event: DragEvent): void {
		const position = screenToFlowCoordinate({
			x: event.clientX,
			y: event.clientY,
		});

		const nodeId = getId();

		const newNode = {
			id: nodeId,
			type: draggedType.value as string,
			position,
			data: { label: nodeId },
		};

		const { off } = onNodesInitialized(() => {
			updateNode(nodeId, (node) => ({
				position: {
					x: node.position.x - node.dimensions.width / 2,
					y: node.position.y - node.dimensions.height / 2,
				},
			}));
			off();
		});

		addNodes(newNode);
	}

	return {
		draggedType,
		isDragOver,
		isDragging,
		onDragStart,
		onDragLeave,
		onDragOver,
		onDrop,
	};
}
