<template>

	<footer class="cafe-footer" :style="sheet.render({ width, height })">

		<slot></slot>

	</footer>

</template>

<script>
export default {

	props: {

		width: [String, Number],

		height: [String, Number]

	}

}
</script>
