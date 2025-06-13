# Mapbox Port Implementation Plan

## Overview
This document outlines the steps to port the existing Mapbox logic (including classes like `MapManager`, `LayerManager`, etc.) into the Nuxt 3 project, enabling multi-tenant extensibility (e.g., Orkus, Juno) and modern Vue best practices.

---

## 1. Organize Mapbox Utilities
- **Create a directory:** `lib/mapbox/`
- **Copy classes:** Move all core classes (`MapManager`, `LayerManager`, `LayerClient`, `DrawingManager`, etc.) into this directory.
- **Export types and classes:** Use an `index.ts` for easy imports.
- **Remove tenant-specific logic:** Ensure these classes are generic and do not import tenant-specific code directly.

---

## 2. Create a Mapbox Composable
- **File:** `composables/useMapbox.ts`
- **Responsibilities:**
  - Instantiate `MapManager`, `LayerManager`, etc.
  - Handle map initialization, teardown, and expose the map instance and managers.
  - Accept config (container ID, access token, initial location) as arguments.
- **Expose:** `{ map, mapManager, layerManager, layerClient }`

---

## 3. Build a Slot-Based BaseMap Component
- **File:** `components/maps/BaseMap.vue`
- **Responsibilities:**
  - Render the map container.
  - Provide named slots for overlays, controls, and default content.
  - Optionally, provide/inject the map instance for deep child access.
- **Usage Example:**
  ```vue
  <BaseMap>
    <template #overlays>
      <MyOverlayComponent />
    </template>
    <template #controls>
      <MyCustomControl />
    </template>
  </BaseMap>
  ```

---

## 4. Tenant-Specific Extensions
- **For Orkus/Juno:**
  - Create tenant-specific map pages/components (e.g., `pages/orkus-map.vue`, `components/maps/OrkusMapControls.vue`).
  - Use the `controls` and `overlays` slots to inject tenant-specific UI (e.g., drawing mode for Orkus).
  - Use the composable to access and extend map logic as needed.

---

## 5. Move Business Logic to Composables
- **Keep business logic (drawing, measuring, popups, etc.) in composables** for reusability and testability.
- **Keep UI in components** (overlays, controls, banners, etc.).

---

## 6. Expose Map Instance and Managers
- **Expose via composable return value** or **provide/inject** for deep access in the component tree.
- **Document usage** for overlays and controls that need direct map access.

---

## 7. Update Imports and Integrations
- Update all imports in your pages/components to use the new `lib/mapbox/` and composables.
- Remove any legacy/tenant-specific code from the core map classes.

---

## 8. Testing and Validation
- Test map initialization, teardown, and all controls in both Orkus and Juno contexts.
- Test overlays, drawing, and layer management.
- Validate that tenant-specific features (e.g., Orkus drawing mode) work only where intended.

---

## 9. Future Extensibility
- Document how to add new overlays, controls, or tenant-specific features using slots and composables.
- Consider providing a plugin system for advanced tenant customizations.

---

## Example Directory Structure
```
lib/
  mapbox/
    map.ts
    layers.ts
    tools.ts
    ...
composables/
  useMapbox.ts
components/
  maps/
    BaseMap.vue
    OrkusMapControls.vue
    JunoMapControls.vue
pages/
  orkus-map.vue
  juno-map.vue
```

---

## Summary
This plan will enable you to port your Mapbox logic into Nuxt 3 in a modular, extensible, and maintainable way, supporting both shared and tenant-specific features with minimal duplication.
