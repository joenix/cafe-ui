<template>

	<form class="cafe-form" :class="'cafe-form-' + ( align || 'right' )" @submit="executer">

		<slot></slot>

	</form>

</template>

<script>
export default {

	props: {

		submit: [Function],

		align: [String]

	},

	data ()
	{
		return {

			formdata: {}

		}
	},

	methods: {

		/* !!
		 * Get Validate Boolean
		 * ===== ===== =====
		 */
		validate ( trigger, executer = () => {} )
		{
			return this.transmit( this.$children );
		},

		/* !!
		 * Submit Executer
		 * ===== ===== =====
		 */
		executer ( event )
		{
			this.prevent( event );

			this.transmit( this.$children );
		},

		/* !!
		 * Prevent Stop
		 * ===== ===== =====
		 */
		prevent ( event )
		{
			event.preventDefault();

			if ( typeof window === 'object' )
			{
				window.event.returnValue = false;
			}
		},

		transfer ( data, name )
		{
			this.drip( name, data );

			// console.log('in BIG form', name, data, this.formdata[ name ]);
			// this.value = data;

			return data;
		},

		drip ( name, value )
		{
			if ( this.formdata[ name ] === undefined )
			{
				return this.$set( this.formdata, name, value );
			}

			this.formdata[ name ] = value;
		},

		summary ( validation, result = {} )
		{
			this.foreach( validation, ( mono, name ) => {

				this.creation( ( mono === undefined ? mono : !mono.includes( false ) ), name, result );

			});

			return result;
		},

		/* !!
		 * Transmit Condition
		 * ===== ===== =====
		 */
		transmit ( group, result = {} )
		{
			this.foreach( group, ( field ) => {

				if ( field.name === undefined )
				{
					return;
				}

				this.creation( field.validation('submit'), field.name, result );
			});

			return this.summary( result );
		}

	}

}
</script>
