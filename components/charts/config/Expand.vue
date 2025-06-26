<template>
    <UCollapsible>
        <UButton
            class="group"
            variant="subtle"
            :label="label"
            :trailing-icon="icon"
            :ui="{
                trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200'
            }"
            block>
		</UButton>
        <template #content>
            <slot />
        </template>
    </UCollapsible>
</template>

<script setup lang="ts">

defineProps({
    icon: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        required: true,
    },
})

</script>