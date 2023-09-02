<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import { Color } from '@tiptap/extension-color';
	import TextStyle from '@tiptap/extension-text-style';
	import ListItem from '@tiptap/extension-list-item';
	import TipTapMenu from './TipTapMenu.svelte';
	import { HardBreak } from '@tiptap/extension-hard-break';

	export let value: string = '';
	let element: any;
	let editor: any;

	onMount(() => {
		editor = new Editor({
			element,
			extensions: [
				Color.configure({ types: [TextStyle.name, ListItem.name] }),
				// @ts-ignore
				TextStyle.configure({ types: [ListItem.name] }),
				TextStyle,
				StarterKit,
				HardBreak.extend({
					addKeyboardShortcuts() {
						return {
							Enter: () => {
								if (this.editor.isActive('orderedList') || this.editor.isActive('bulletList')) {
									return this.editor.chain().createParagraphNear().run();
								}
								return this.editor.commands.setHardBreak();
							}
						};
					}
				})
			],
			content: value,
			onUpdate: ({ editor }) => {
				const html = editor.getHTML();
				value = html;
			},
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				editor = editor;
			}
		});
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});
</script>

<div class="border-2 border-black rounded-xl">
	{#if editor}
		<div class="border-b-2 border-black pb-1 m-5">
			<TipTapMenu bind:editor />
		</div>
	{/if}

	<div class=" px-5 pb-5" bind:this={element} />
</div>
