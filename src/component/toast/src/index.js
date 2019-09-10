import Vue from 'vue';

import Component from './index.vue';

import { instant } from 'cafe-kit';


export default ( option, time ) => {

	return instant( Component, ( Package ) => {

		return Package.create( option, time );

	})

};
