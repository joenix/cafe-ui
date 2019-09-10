<template>

	<div :class="Object.values( this.monitor ).join(' ')">

		<slot></slot>

	</div>

</template>

<script>
export default {
	props: ['mobile', 'pad', 'desktop', 'wide', 'generous', 'infinite'],

	data ()
	{
		return {

			monitor: {}

		}
	},

	methods: {

		calculate ( transfer, origin )
		{
			this.$set( this.monitor, origin, transfer || ( 'cafe-' + origin ) );
		}

	},

	created ()
	{
		this.foreach( this.$props, this.calculate );
	}
}
</script>
