import { preset, kit, component, extend } from './src';


const install = (Vue, option = { prefix: 'cafe' }) => {

	// 1. Prototype Kit in Vue
	kit.foreach(

		Object.assign( {}, kit, { preset: preset }, { prefix: option.prefix } ),

		(kit, name) => {

			Vue.prototype[ name ] = kit;

		}

	);

	// 2. Register Vue Component
	kit.foreach( component, (comp, name) => {

		if ( extend.includes( name ) )
		{
			return Vue.prototype[ '$' + name ] = component[ name ];
		}

		Vue.component(

			kit.camel(

				comp.name || [ option.prefix, '-', name].join('')

			),

			comp

		);

	});

}


/* Ignore */
if ( typeof window !== 'object' )
{
	var window = {};
}

if ( window && window.Vue )
{
	install( window.Vue );
};


export default Object.assign( { install }, component );
