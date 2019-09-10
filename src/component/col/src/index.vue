<template>

	<div class="cafe-col" :class="'grid-col' + block + ( pos ? (' grid-offset' + pos ) : '' )">

		<slot></slot>

	</div>

</template>

<script>
export default {

	props: {

		span: {

			default: 0,

			type: [String, Number]

		},

		offset: {

			default: 0,

			type: [String, Number]

		}

	},

	watch: {

		span ( current, origin )
		{
			this.block = this.calculate( current );
		},

		offset ( current, origin )
		{
			this.pos = this.calculate( current );
		}

	},

	methods: {

		calculate ( block )
		{
			return block > 0 ? ('-' + block) : '';
		}

	},

	data ()
	{
		return {

			block: this.calculate( this.span ),

			pos: this.calculate( this.offset )

		}
	}

}
</script>
