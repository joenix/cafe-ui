<template>

	<div class="cafe-transition" :class="effect">

		<slot></slot>

	</div>

</template>

<script>
export default {

	props: {

		direct: [String],

		duration: [String, Number],

		delay: [String, Number],

		control: {

			type: [Boolean],

			default: undefined
		}

	},

	data ()
	{
		return {

			effect: this.render( this.direct, this.control )

		}
	},

	watch: {

		direct ( current, origin )
		{
			this.effect = this.render( current, this.control );
		},

		control ( current, origin )
		{
			this.effect = this.render( this.direct, current );
		}

	},

	methods: {

		render ( direct, control, result = {} )
		{
			return this.creation(

				[
					true,
					control === true,
					control === false
				],

				[
					'cafe-transition-' + direct,
					'cafe-transition-on',
					'cafe-transition-off'
				],

				result

			);
		}

	}

}
</script>
