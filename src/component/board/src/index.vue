<template>

	<div class="cafe-board" :style="sheet.render({ width, height, marginTop: defaulter( span, 20 ), marginBottom: defaulter( span, 20 ), padding })">

		<div class="cafe-board-title">

			<slot name="title">{{ title }}</slot>

		</div>

		<div class="cafe-board-content">

			<slot></slot>

		</div>

	</div>

</template>

<script>
export default {

	props: {

		width: [String, Number],

		height: [String, Number],

		padding: [String, Number],

		span: [String, Number],

		title: [String]

	}

}
</script>
