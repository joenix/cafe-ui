import Vue from 'vue';

import Component from '../../dialog';

import { instant } from 'cafe-kit';


export default ( option, time ) => {

	return instant( Component, ( Package ) => {

		return new Promise(

			( resolve, reject ) => {

				Package.namespace = 'cafe-alert';

				Package.show(

					{
						mask: false,

						control: 'cancel',

						text: {

							cancel: '确定'

						},

						cancel ()
						{
							Package.close( true );
						},

						afterClose ()
						{
							resolve();
						}
					},

					option,

					true

				);

			}

		);

	})

};
