<template>
    <div class="flex h-screen overflow-hidden">
        <!-- Sidebar -->
        <Sidebar />
        
        <!-- Main Content Area -->
        <main class="flex-1 p-6 overflow-auto">
            <slot/>
        </main>
    </div>
</template>