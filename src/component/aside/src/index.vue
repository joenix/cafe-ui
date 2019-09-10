<template>

	<aside class="cafe-aside" :style="sheet.render({ width, height, float })">

		<slot></slot>

	</aside>

</template>

<script>
export default {

	props: {

		width: [String, Number],

		height: [String, Number],

		float: [String]

	}

}
</script>
