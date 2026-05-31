import { toast } from 'svelte-sonner';
import Toast from './Toast.svelte';
import type { ToastTone } from './toast_variants.js';

export interface ShowToastOptions {
	tone: ToastTone;
	title: string;
	body?: string;
	duration?: number;
	dismissible?: boolean;
}

export function showToast({
	tone,
	title,
	body,
	duration,
	dismissible = true,
}: ShowToastOptions): string | number {
	const id = toast.custom(Toast, {
		duration,
		componentProps: {
			tone,
			title,
			body,
			onDismiss: dismissible ? () => toast.dismiss(id) : undefined,
		},
	});
	return id;
}

export function toastSuccess(title: string, body?: string, duration?: number): string | number {
	return showToast({ tone: 'success', title, body, duration });
}

export function toastError(title: string, body?: string, duration?: number): string | number {
	return showToast({ tone: 'danger', title, body, duration });
}

export function toastWarning(title: string, body?: string, duration?: number): string | number {
	return showToast({ tone: 'warning', title, body, duration });
}

export function toastInfo(title: string, body?: string, duration?: number): string | number {
	return showToast({ tone: 'info', title, body, duration });
}

export function toastLoading(title: string, body?: string, duration?: number): string | number {
	return showToast({ tone: 'loading', title, body, duration, dismissible: false });
}
