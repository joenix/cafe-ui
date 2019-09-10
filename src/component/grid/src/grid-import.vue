<template>

	<Row></Row>

</template>

<script>
import Row from './grid-row.vue';
import Col from './grid-col.vue';

export default {

	props: {

		grid: {

			type: [Object],

			default: {}

		}

	},

	components: {

		Row,

		Col

	}

}
</script>
