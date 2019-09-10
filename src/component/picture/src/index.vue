<template>

	<div v-if="mode" class="cafe-picture" :title="alt" :style="sheet">

		<img :src="src" :alt="alt" />

	</div>

	<img v-else :src="src" :alt="alt" />

</template>

<script>
export default {

	props: {

		mode: {

			type: [String, Boolean],

			default: false

		},

		sheet: {

			type: [String],

			default: false

		},

		src: {

			type: [String],

			default: ''

		},

		alt: {

			type: [String],

			default: ''

		}

	},

	data ()
	{

		return {

			render ( src, position, size, result = {} )
			{
				if ( mode === false )
				{
					return false;
				}

				this.creation(

					[this.src, 'no-repeat', 'center', 'contain'],

					['background-image', 'background-repeat', 'background-position', 'background-size']

				);
			}

		}

	}

}
</script>
