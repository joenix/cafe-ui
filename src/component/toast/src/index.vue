<template>

	<transition>

		<div class="cafe-toast cafe-transition-fade" :class="sheet">

			<i v-if="sheet.success" class="cafe-icon-success"></i>

			<i v-if="sheet.warning" class="cafe-icon-warning"></i>

			<i v-if="sheet.error" class="cafe-icon-error"></i>

			<i v-if="sheet.info" class="cafe-icon-info"></i>

			{{ message }}

		</div>

	</transition>

</template>

<script>
import { event } from 'cafe-kit';

export default {

	data ()
	{
		return {

			message: '',

			sheet: {}

		}
	},

	methods: {

		async create ( message, time, classname )
		{

			return new Promise( (resolve, reject) => {

				this.message = message;

				if ( classname )
				{
					this.sheet[ classname ] = true;
				}

				event.bind( this.$el, 'click' ).then( ( event ) => {

					this.destroy().then( resolve );

				});

				document.body.appendChild( this.$el );

				this.render( true ).then(

					() => {

						this.timeout(

							time === undefined ? 4800 : time,

							() => {

								this.destroy().then( resolve );

							}

						);

					}

				);

			});
		},

		async destroy ( event, element = this.$el )
		{
			return new Promise( (resolve, reject) => {

				this.render( false ).then(

					() => {

						this.timeout( 240, ( out ) => {

							if ( event )
							{
								element = event.target;

								this.clear( out );
							}

							if ( element.parentNode )
							{
								document.body.removeChild( element );

								resolve();
							}

						});

					});

			});
		},

		async render ( mode )
		{
			return Object.assign(

				this.sheet,

				{

					'cafe-transition-on': mode === true,

					'cafe-transition-off': mode === false

				}

			);
		},

		timeout ( time, callback, out )
		{
			if ( time )
			{
				out = setTimeout(

					() => {

						callback( out );

						this.clear( out );

					},

					time

				);
			}
		},

		clear ( out )
		{
			clearTimeout( out );
		}

	}

}
</script>
