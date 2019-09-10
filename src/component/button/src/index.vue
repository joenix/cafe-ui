<template>

	<button :type="type" class="cafe-button" @click="click">

		<slot></slot>

	</button>

</template>

<script>
export default {

	props: {

		type: [String]

	},

	methods: {

		click ()
		{
			this.$emit('click');
		}

	}

}
</script>
