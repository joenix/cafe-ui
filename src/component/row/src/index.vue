<template>

	<div class="cafe-row" :class="renderClass()">

		<slot></slot>

	</div>

</template>

<script>
export default {

	props: ['grid', 'responsive'],

	props: {

		grid: [String, Number],

		responsive: [String]

	},

	watch: {

		grid ( current, origin )
		{
			this.block = this.calculate( current );
		}

	},

	methods: {

		calculate ( block )
		{
			return block > 0 ? ('-' + block) : '';
		},

		renderClass ( result = {} )
		{
			result[ 'grid-row' + this.block ] = true;

			if ( this.responsive )
			{
				this.foreach( this.serial( this.responsive ), ( device ) => {

					result[ 'responsive-' + device ] = true;

				});
			}

			return result;
		}

	},

	data ()
	{
		return {

			block: this.calculate( this.grid )

		}
	}

}
</script>
