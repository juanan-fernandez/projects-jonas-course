import { useEffect } from 'react';

export function useKey(keyCode: string, callback: () => void): void {
	useEffect(
		function () {
			function keyTreatment(ev: KeyboardEvent): void {
				if (ev.code.toLowerCase() === keyCode.toLowerCase()) {
					callback();
				}
			}

			document.addEventListener('keydown', keyTreatment);
			return function () {
				document.removeEventListener('keydown', keyTreatment);
			};
		},
		[keyCode]
	);
}
