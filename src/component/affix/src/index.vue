<template>

	<div class="cafe-affix">

		<div class="cafe-affix-container" :class="{ 'cafe-affix-position': offset }">

			<slot></slot>

		</div>

	</div>

</template>

<script>
import { listener } from 'cafe-kit';

export default {

	props: {

		option: [Array, Object]

	},

	data ()
	{
		return {

			offset: false,

			scroll: undefined

		}
	},

	watch: {

		scroll ( current, origin )
		{
			console.log('in watch scroll', current, origin);
		}

	},

	methods: {

	},

	mounted ()
	{
		listener.watch( ['scroll'], this );
	}

}
</script>
