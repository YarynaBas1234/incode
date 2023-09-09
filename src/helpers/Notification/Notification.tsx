import { toast, ToastPosition } from 'react-toastify';

export type notificationProps = {
	message: string;
	position?: ToastPosition;
	type: 'success' | 'info' | 'error' | 'warn';
	duration?: number;
};

export const notify = ({ message, position, type, duration = 1000 }: notificationProps) => {
	toast[type](message, {
		position,
		autoClose: duration,
	});
};
