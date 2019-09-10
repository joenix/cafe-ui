export default ( (path, process) => {

	return process( path ).version;

})
(
	require('path'),

	path => {

		return require('../../package.json');

	}
);
