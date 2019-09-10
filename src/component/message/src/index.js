import Vue from 'vue';

import Component from '../../toast/src/index.vue';

import { instant } from 'cafe-kit';


export default (

	( creative ) => {

		return {

			success: creative('cafe-message-success')

		}

	}

)

(

	( classname ) => {

		return ( option, time ) => {

			return instant( Component, ( Package ) => {

				return Package.create( option, time, classname );

			})

		}

	}

);
