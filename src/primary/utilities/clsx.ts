export default function clsx(...classes: string[]) {
	return classes.filter(Boolean).join(' ');
}
