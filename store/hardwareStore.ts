// stores/hardwareStore.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Hardware } from '../types/hardware';

export const useHardwareStore = defineStore('hardware', () => {
	const hardwareList = ref<Hardware[]>([
		{
			id: '4600',
			date: '2024-03-11T15:30:00',
			status: 'paid',
			email: 'james.anderson@example.com',
			amount: 594,
		},
		{
			id: '4599',
			date: '2024-03-11T10:10:00',
			status: 'failed',
			email: 'mia.white@example.com',
			amount: 276,
		},
		{
			id: '4598',
			date: '2024-03-11T08:50:00',
			status: 'refunded',
			email: 'william.brown@example.com',
			amount: 315,
		},
		{
			id: '4597',
			date: '2024-03-10T19:45:00',
			status: 'paid',
			email: 'emma.davis@example.com',
			amount: 529,
		},
		{
			id: '4596',
			date: '2024-03-10T15:55:00',
			status: 'paid',
			email: 'ethan.harris@example.com',
			amount: 639,
		},
		{
			id: '4595',
			date: '2024-03-10T15:50:00',
			status: 'failed',
			email: 'james.anderson@example.com',
			amount: 100,
		},
		{
			id: '4594',
			date: '2024-03-10T12:30:00',
			status: 'paid',
			email: 'frank.smith@example.com',
			amount: 345,
		},
		{
			id: '4593',
			date: '2024-03-10T15:55:00',
			status: 'paid',
			email: 'sara.johnson@example.com',
			amount: 456,
		},
		{
			id: '4592',
			date: '2024-03-10T15:55:00',
			status: 'refunded',
			email: 'george.brown@example.com',
			amount: 123,
		},
	]);

	return { hardwareList };
});
