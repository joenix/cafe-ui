<template>

	<div class="cafe-form-item">

		<slot name="label">

			<label class="cafe-label" :for="prop">{{ label }}</label>

		</slot>

		<slot></slot>

		<span class="cafe-tip" v-if="message">{{ message }}</span>

	</div>

</template>

<script>
export default {

	props: {

		prop: [String],

		label: [String],

		rule: [String, Array, Object, RegExp],

		executer: [Function]

	},

	data ()
	{
		return {

			name: this.prop,

			value: '',

			law: this.vision( this.rule ),

			message: ''

		}
	},

	watch: {

		value ( current, origin )
		{
			this.rift( this ).transfer( current, this.prop );
		}

	},

	methods: {

		/* !!
		 * Transfer Value ( Data ) From Filed
		 * ===== ===== =====
		 */
		transfer ( data, name )
		{
			this.value = this.defaulter( data, '' );
		},

		/* !!
		 * Revision Rule
		 * ===== ===== =====
		 */
		vision ( rule, group = [], one = {} )
		{
			if ( rule === undefined )
			{
				return rule;
			}

			if ( [String, RegExp].includes( rule.constructor ) )
			{
				one.required = rule === 'required';

				one.pattern = rule;

				one.trigger = 'input';

				one.message = '';

				group.push( one );
			}

			if ( rule.constructor === Object )
			{
				one.required = rule.required  === undefined ? '' : rule.required;

				one.pattern  = rule.pattern   === undefined ? '' : rule.pattern;

				one.trigger  = ( rule.trigger === undefined ? 'input' : rule.trigger ).split(' ');

				one.message  = rule.message   === undefined ? '' : rule.message;

				group.push( one );
			}

			if ( rule.constructor === Array )
			{
				this.foreach( rule, (one) => {

					this.vision( one, group );

				});
			}

			return group;

		},

		/* !!
		 * Get Slot Param
		 * ===== ===== =====
		 */
		groove ( param = 'val', result )
		{
			this.foreach(

				this.$slots.default,

				(slot) => {

					if ( slot.componentOptions.tag )
					{
						result = slot.componentInstance[ param ];
					}

					if ( result !== undefined )
					{
						return false;
					}

				}

			);

			return result;
		},

		/* !!
		 * Valid Rule: Require | Pattern
		 * ===== ===== =====
		 */
		valid ( sermon )
		{
			this.value = this.groove();

			if ( sermon.required === true )
			{
				if ( this.value.length )
				{
					return true;
				}
			}

			if ( sermon.pattern )
			{
				return sermon.pattern.test( this.value );
			}

			return false;
		},

		/* !!
		 * Validation Field
		 * ----- ----- -----
		 * Result: Finally Result
		 * Sugar: Result Sugar
		 * Box: Message Box
		 * ===== ===== =====
		 */
		validation ( mode, tip = true, result = [], sugar = {}, box = [] )
		{
			if ( !this.prop )
			{
				return undefined;
			}

			this.foreach(

				this.law,

				( sermon ) => {

					if ( sermon.trigger.includes( mode ) )
					{
						return (

							( come ) => {

								if ( come !== undefined )
								{
									result.push( come );

									if ( come === false )
									{
										box.push( sermon.message );
									}

								}

							}

						)

						( this.valid( sermon ) );
					}

				}

			);

			this.message = box[0] || '';

			return result.length ? (sugar[ this.prop ] = result) : undefined;
		}

	},

	created ()
	{
	},

	mounted ()
	{
	}

}
</script>
