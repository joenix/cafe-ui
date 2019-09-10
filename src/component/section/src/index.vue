<template>

	<section class="cafe-section" :class="{ 'margin-center': defaulter( center, true ) }">

		<slot></slot>

	</section>

</template>

<script>
export default {

	props: {

		center: [String, Boolean]

	},

	methods: {
	},

	data ()
	{
		return {
		}
	},

	mounted ()
	{}

}
</script>
