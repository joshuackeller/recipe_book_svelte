<script lang="ts">
	import TipTapButton from './TipTapButton.svelte';

	export let editor: any;
</script>

<TipTapButton
	onClick={() => editor.chain().focus().toggleBold().run()}
	disabled={!editor.can().chain().focus().toggleBold().run()}
	active={editor.isActive('bold')}
>
	bold
</TipTapButton>
<TipTapButton
	onClick={() => editor.chain().focus().toggleItalic().run()}
	disabled={!editor.can().chain().focus().toggleItalic().run()}
	active={editor.isActive('italic')}
>
	italic
</TipTapButton>
<TipTapButton
	onClick={() => editor.chain().focus().toggleStrike().run()}
	disabled={!editor.can().chain().focus().toggleStrike().run()}
	active={editor.isActive('strike')}
>
	strike
</TipTapButton>

<TipTapButton
	onClick={() => editor.chain().focus().setParagraph().run()}
	active={editor.isActive('paragraph')}
>
	paragraph
</TipTapButton>
<TipTapButton
	onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
	active={editor.isActive('heading', { level: 1 })}
>
	h1
</TipTapButton>
<TipTapButton
	onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
	active={editor.isActive('heading', { level: 2 })}
>
	h2
</TipTapButton>
<TipTapButton
	onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
	active={editor.isActive('heading', { level: 3 })}
>
	h3
</TipTapButton>

<TipTapButton
	onClick={() => editor.chain().focus().toggleBulletList().run()}
	active={editor.isActive('bulletList')}
>
	bullet list
</TipTapButton>
<TipTapButton
	onClick={() => editor.chain().focus().toggleOrderedList().run()}
	active={editor.isActive('orderedList')}
>
	ordered list
</TipTapButton>

<TipTapButton onClick={() => editor.chain().focus().setHorizontalRule().run()}>
	horizontal rule
</TipTapButton>
<TipTapButton
	onClick={() => editor.chain().focus().insertContent(`<span style="">&deg;</span>`).run()}
>
	temp&deg;
</TipTapButton>
<TipTapButton onClick={() => editor.chain().focus().setHardBreak().run()}>line break</TipTapButton>
