import Vue from 'vue';

import Component from '../../dialog';

import { instant, presence } from 'cafe-kit';


export default ( option, time ) => {

	return instant(

		Component,

		(
			Package,

			submit,

			cancel

		) => {

			Package.namespace = 'cafe-confirm';

			Package.show(

				{
					mask: false,

					width: '640px',

					height: '360px',

					control: ['submit', 'cancel'],

					submit ()
					{
						if ( submit )
						{
							return submit( () => { Package.close( true ) } );
						}

						Package.close( true );
					},

					cancel ()
					{
						if ( cancel )
						{
							return cancel( Package.close( true ) );
						}

						Package.close( true );
					}
				},

				option,

				true

			);

			return new presence(

				( resolve, reject ) => {

					submit = resolve;

					cancel = reject;

				}

			);

		}

	)

};
