<template>

	<div class="cafe-container" :style="sheet.render({ width, height, margin, padding })">

		<slot></slot>

	</div>

</template>

<script>
export default {

	props: {

		width: [String, Number],

		height: [String, Number],

		margin: [String, Number],

		padding: [String, Number]

	},

}
</script>
