<template>

	<nav class="cafe-nav" :style="sheet.render({ width, height })">

		<slot></slot>

	</nav>

</template>

<script>
export default {

	props: {

		width: [String, Number],

		height: [String, Number]

	}

}
</script>
