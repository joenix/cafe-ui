<template>

	<div></div>

</template>

<script>
export default {

	methods: {

		destroy ( time = 2400 )
		{
			this.timeout(

				() => {

					this.$dialog.hide( true );

				},

				time

			);
		},

		message ( text )
		{
			return this.$dialog.show(

				{

					direct: 'top',

					control: false,

					mask: false,

					space: 'auto'

				},

				text,

				true

			).then( this.destroy );
		},

		alert ( text )
		{
			return this.$dialog.show(

				{

					direct: 'center',

					control: false,

					mask: false,

					space: 'auto'

				},

				text,

				true

			).then( this.destroy );
		}

	}
}
</script>
