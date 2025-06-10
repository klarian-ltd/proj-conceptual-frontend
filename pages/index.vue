<template>
    <div class="flex h-screen overflow-hidden">
        <!-- Sidebar -->
        <Sidebar />

        <!-- Main Content Area -->
        <main class="flex-1 p-6 overflow-auto">
            <header>
                <div class="flex">
                    <UTooltip text="Create a new dashboard">
                    <UButton
                        label="New Dashboard"
                        icon="i-lucide-plus"
                        target="_blank"
                    />
                    </UTooltip>
                </div>
            </header>
            <USeparator icon="ph:house-fill" class="mb-4" />
        </main>
    </div>
  </template>
  