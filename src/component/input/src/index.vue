<template>

	<input class="cafe-input"

		:type="defaulter( type, 'text' )"
		:name="field"

		:value="val"

		@input="onInput"
	/>

</template>

<script>
export default {

	props: {

		type: [String],

		name: [String, Number],

		value: [String, Number]

	},

	watch: {

		data ( current, origin )
		{
			this.onTransfer( current );
		}

	},

	data ()
	{
		return {

			field: this.defaulter( this.name, this.$parent.prop ),

			val: this.value

		}
	},

	methods: {

		/* !!
		 * Transfer Value ( Data ) To Form-Item
		 * ===== ===== =====
		 */
		onTransfer ( data )
		{
			this.rift( this ).transfer( data || this.data, this.field );
		},

		onInput ( event )
		{
			this.$emit('input', this.val = event.target.value);

			this.rift( this ).validation('input');
		}

	},

	created ()
	{
		this.onTransfer();
	}

}
</script>
