<template>
    <div class="flex">
        <USelectMenu placeholder="Select Network" variant="soft" :items="networkitems" class="w-48 mr-2" />
        <USelectMenu placeholder="Select Route" variant="soft" :items="pumpsitems" class="w-48 mr-2" />
        <UPopover>
            <UButton color="neutral" variant="subtle" icon="i-lucide-calendar">
                <template v-if="modelValue.start">
                    <template v-if="modelValue.end">
                    {{ df.format(modelValue.start.toDate(getLocalTimeZone())) }} - {{ df.format(modelValue.end.toDate(getLocalTimeZone())) }}
                    </template>

                    <template v-else>
                    {{ df.format(modelValue.start.toDate(getLocalTimeZone())) }}
                    </template>
                </template>
                <template v-else>
                    Pick a date
                </template>
            </UButton>
            <template #content>
                <UCalendar v-model="modelValue" class="p-2" :number-of-months="2" range />
            </template>
        </UPopover>
    </div>
</template>

<script setup lang="ts">
import { ref, shallowRef } from 'vue';
import { CalendarDate, DateFormatter, getLocalTimeZone } from '@internationalized/date';

const df = new DateFormatter('en-US', {
    dateStyle: 'medium'
    })

const modelValue = shallowRef({
    start: new CalendarDate(2022, 1, 20),
    end: new CalendarDate(2022, 2, 10)
    })

const networkitems = ref([
  {
    type: 'label',
    label: 'Networks'
  },
  'UKOP',
  'WSL',
  ])

const pumpsitems = ref([
  {
    type: 'label',
    label: 'Routes'
  },
  'Route 1',
  'Route 2',
  'Route 3',
  'Route 4',
  'Route 5',
  'Route 6',
  'Route 7',
])
const value = ref('Filters')

</script>