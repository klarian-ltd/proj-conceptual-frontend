<template>
    <div class="flex h-screen overflow-hidden">
        <!-- Sidebar -->
        <Sidebar />

        <!-- Main Content Area -->
        <main class="flex-1 p-6 overflow-auto">
            <header>
                <div class="flex justify-between items-center mb-4">
                    <h1 class="text-3xl font-bold">Network Utilisation</h1>
                    <DashHeader />
                </div>
            </header>
            <USeparator icon="material-symbols-light:dashboard-customize-rounded" class="mb-4" />
            <WidgetViews />
        </main>
    </div>
</template>