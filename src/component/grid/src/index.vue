<template>

	<Import :grid="grid"></Import>

</template>

<script>
import Import from './grid-import.vue';

export default {

	props: {

		grid: {

			type: [Object],

			default: {}

		}

	},

	components: {

		Import

	},

	data ()
	{
		return {


		}
	},

	methods: {
	},

}
</script>
