<template>

	<header class="cafe-header" :style="sheet.render({ width, height })">

		<slot></slot>

	</header>

</template>

<script>
export default {

	props: {

		width: [String, Number],

		height: [String, Number]

	}

}
</script>
