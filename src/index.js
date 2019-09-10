module.exports = (

	( Importz, Kit, Preset ) => {

		return {

			kit: Kit,

			component: Importz( Preset.component, (name, cip) => {

				return cip( require('./component/' + name) );

			}),

			extend: Preset.extend

		}

	}

)

(

	require('importz'),

	require('cafe-kit'),

	require('./preset').default

);
