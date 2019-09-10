<template>

	<main class="cafe-main" :style="sheet.render({ width, height, marginLeft, marginRight, padding })">

		<slot></slot>

	</main>

</template>

<script>
export default {

	props: {

		width: [String, Number],

		height: [String, Number],

		marginLeft: [String, Number],

		marginRight: [String, Number],

		padding: [String, Number]

	}

}
</script>
