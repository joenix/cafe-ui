<template>

	<div class="cafe-dialog" :class="namespace">

		<div class="cafe-dialog-mask" v-if="mask" :class="shader" @click="cancel"></div>

		<div class="cafe-dialog-container" :class="effect" @click="eliminate">

			<div class="cafe-dialog-cover" :style="cover">

				<div class="cafe-dialog-content cafe-transition">

					<div class="cafe-dialog-title" v-if="title">

						<slot :name="title">{{ title }}</slot>

					</div>

					<div class="cafe-dialog-body" :style="room">

						<template v-if="content">{{ content }}</template>

						<slot v-else></slot>

					</div>

					<div class="cafe-dialog-control" v-if="control">

						<cafe-button v-if="control.includes('cancel')" @click="cancel">{{ text.cancel }}</cafe-button>

						<cafe-button v-if="control.includes('submit')" @click="submit">{{ text.submit }}</cafe-button>

					</div>

				</div>

			</div>

		</div>

	</div>

</template>

<script>
export default {

	props: {

		title: [String],

		content: [String, Number],

		namespace: [String],

		/* !!
		 * Direct: center | top | bottom | left | right
		 * ===== ===== =====
		 */
		direct: {

			type: [String],

			default: 'center'

		},

		mask: {

			type: [Boolean, String],

			default: true

		},

		size: {

			type: [String, Number],

			default: 'full'

		},

		space: {

			type: [String, Number],

			default: '200px'

		},

		width: {

			type: [String, Number],

			default: '320px'

		},

		height: {

			type: [String, Number],

			default: '240px'

		},

		control: {

			type: [String, Boolean, Array],

			default: 'submit'

		},

		visible: {

			type: [Boolean],

			default: undefined

		},

		read: {

			type: [Boolean],

			default: false

		},

		/* !!
		 * Hook
		 * ===== ===== =====
		 */
		beforeOpen: [Function],

		afterOpen: [Function],

		beforeClose: [Function],

		afterClose: [Function]

	},

	watch: {

		visible ( current, origin )
		{
			this[ current ? 'open' : 'close' ]();

			if ( this.read )
			{
				return (

					( target, classname, executer ) => {

						executer( this.classer( target ).split(' '), target, classname, current );

					}

				)

				(
					document.body,

					'cafe-dialog-lock',

					( group, target, classname, current ) => {

						this.classer( target, current ) ?

							( group.includes( classname ) ? group : group.concat( classname ) ).join(' '):

							this.classer( target ).replace( classname, '' );

					}
				);

			}

		},

		state ( current, origin )
		{
			this.shader = this.render( this.direct, 'mask' );

			this.effect = this.render( this.direct, 'content' );
		},

		direct ( current, origin )
		{
			this.shader = this.render( current, 'mask' );

			this.effect = this.render( current, 'content' );
		},

		width ( current, origin )
		{
			this.cover = this.render('cover');

			this.room = this.sizer( this.space, this.size );
		},

		height ( current, origin )
		{
			this.cover = this.render('cover');

			this.room = this.sizer( this.space, this.size );
		},

		size ( current, origin )
		{
			this.cover = this.render('cover');

			this.room = this.sizer( this.space, current );
		},

		space ( current, origin )
		{
			this.room = this.sizer( current, this.size );
		},

		content ( current, origin )
		{

		}

	},

	data ()
	{
		return {

			state: this.visible,

			shader: this.render( this.direct, 'mask' ),

			effect: this.render( this.direct, 'content' ),

			cover:  this.render('cover'),

			room: this.sizer( this.space, this.size ),

			text: {

				cancel: '取消',

				submit: '确定'

			}

		}
	},

	methods: {

		render ( direct, mode, result = {} )
		{
			if ( mode === undefined )
			{
				mode = direct;
			}

			switch ( mode )
			{
				case 'mask':

					this.creation(

						[
							this.mask,
							this.state === true,
							this.state === false
						],

						[
							'shade',
							'visible',
							'unvisible'
						],

						result

					);

					break;

				case 'content':

					this.creation(

						[
							true,
							true,
							this.state === true,
							this.state === false,
							this.read
						],

						[
							'cafe-dialog-' + direct,
							'cafe-transition-' + direct,
							'cafe-transition-on',
							'cafe-transition-off',
							'cafe-dialog-read'
						],

						result

					);

					break;

				case 'cover':

					this.creation(

						this.read ? ( this.width || space ) : 'auto',

						'max-width',

						result

					);

					break;
			}

			return result;
		},

		sizer ( space, size, result = {} )
		{
			if ( this.direct === 'center' )
			{
				this.creation(

					[this.width || space, this.height || space],

					['width', 'height'],

					result

				);
			}

			else if ( ['left', 'right'].includes( this.direct ) )
			{
				this.creation( space, 'width', result );
			}

			else if ( ['top', 'bottom'].includes( this.direct ) )
			{
				this.creation( space, 'height', result );
			}

			return result;
		},

		classer (

			target,

			like,

			nature = ( target ) => {

				return target.getAttribute('class');

			}

		)
		{
			return like ?

				( nature( target ) === like ):

				( nature( target ) || '' );
		},

		async sync ( prop, value )
		{
			this.$emit('update:' + prop, value);
		},

		async show ( configure, text, mode )
		{
			/* !!
			 * Merge Configure
			 * ===== ===== =====
			 */
			if ( configure )
			{
				Object.assign( this, configure );
			}

			/* !!
			 * Content: Text
			 * ===== ===== =====
			 */
			if ( text )
			{
				this.content = text;
			}

			/* !!
			 * Insert Node to Document
			 * ===== ===== =====
			 */
			if ( mode )
			{
				document.body.appendChild( this.$el );
			}

			this.sync('visible', true);

			this.$emit('open');

			if ( this.state !== true )
			{
				this.state = true;
			}

			this.timeout(

				() => {

					if ( this.afterOpen )
					{
						this.afterOpen();
					}

				},

				240

			);
		},

		async hide ( mode )
		{
			this.sync('visible', false);

			this.$emit('close');

			if ( this.state !== false )
			{
				this.state = false;
			}

			this.timeout(

				() => {

					if ( this.afterClose )
					{
						this.afterClose();
					}

					if ( mode )
					{
						if ( this.$el.parentNode )
						{
							return this.$el.parentNode.removeChild( this.$el );
						}
					}

				},

				240

			);

		},

		async open ()
		{
			if ( this.beforeOpen )
			{
				if ( this.beforeOpen() )
				{
					this.show();
				}
			}

			else
			{
				this.show();
			}
		},

		async close ( mode )
		{
			if ( this.beforeClose )
			{
				if ( this.beforeClose() )
				{
					this.hide();
				}
			}

			else
			{
				this.hide( mode );
			}
		},

		// Read Mode
		eliminate ( e )
		{
			if ( this.read )
			{
				(
					( executer ) => {

						executer( this.classer( e.target ).split(' ') );

					}
				)

				(
					( group ) => {

						if ( group.includes('cafe-dialog-read') || group.includes('cafe-dialog-cover') )
						{
							this.cancel();
						}

					}
				);

			}
		},

		cancel ()
		{

			this.sync('visible', false);

			this.$nextTick(

				() => {

					if ( this.visible )
					{
						this.close();
					}

				}

			);

		},

		submit ()
		{
			this.$emit('submit');
		}

	}

}
</script>
