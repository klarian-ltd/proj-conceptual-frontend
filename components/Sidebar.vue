<template>
    <!-- Sidebar -->
    <aside class="bg-gray-900 text-white p-4 flex-shrink-0 border-r-2 border-white relative flex flex-col h-full">
        <!-- Round button on the right border -->
        <button
            @click="isToggled = !isToggled"
            class="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 bg-white text-gray-900 rounded-full w-6 h-6 flex items-center justify-center shadow transition-transform duration-200 hover:scale-110"
        >
            <UIcon :name="isToggled ? 'heroicons-solid:arrow-circle-right' : 'heroicons-solid:arrow-circle-left'" class="size-8" />
        </button>

        <!-- Navigation -->
        <Navigation :is-toggled="isToggled" />


        <!-- Avatar Group at the bottom -->
        <div class="mt-auto" :class="isToggled ? 'flex flex-col items-center space-y-2' : 'mt-auto flex flex-col items-center space-y-3'">
            <!-- Juno Logo on top -->
            <NuxtPicture
                :src="isToggled ? '/junobrandicon.png' : '/junologowhite.png'"
                :width="isToggled ? '20' : '120'"
                height="auto"
                quality="80"
                alt="Juno Logo"
                class="mb-6"
            />
            <USeparator class="mb-4" />
            <!-- Avatar + Logout Button Row -->
            <div
                :class="isToggled
                ? 'flex flex-col items-center space-y-2'
                : 'flex flex-row items-center justify-around space-x-2 w-full'"
            >
                <UDropdownMenu size="xl" :items="dropitems">
                <UTooltip text="feyfeyy">
                    <UChip inset color="success">
                    <UAvatar
                        src="https://github.com/fey-feyy.png"
                        alt="Feyaaz Chishty"
                        :class="isToggled ? 'mb-2 hover:scale-110' : 'hover:scale-110'"
                    />
                    </UChip>
                </UTooltip>
                </UDropdownMenu>

                <UButton
                size="md"
                :label="!isToggled ? 'Logout' : ''"
                :icon="isToggled ? 'heroicons:arrow-right-end-on-rectangle-20-solid' : undefined"
                :class="isToggled ? 'w-full justify-center' : ''"
                />
            </div>
        </div>
    </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { DropdownMenuItem } from '@nuxt/ui';

const isToggled = ref(false)

const dropitems = ref<DropdownMenuItem[]>([
  {
    label: 'Profile',
    icon: 'i-lucide-user'
  },
  {
    label: 'Themes',
    icon: 'ic:twotone-brightness-medium'
  },
  {
    label: 'Settings',
    icon: 'i-lucide-cog'
  }
])
</script>