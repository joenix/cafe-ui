import Importz from 'importz';

export default Importz(['version', 'component', 'extend'], (name, cip) => {

	return cip( require('./' + name + '.js') );

});
