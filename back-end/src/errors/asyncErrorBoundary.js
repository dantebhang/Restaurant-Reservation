//delegate is async/await handler 
//defaultStatus is optional parameter that allows you to override status code

function asyncErrorBoundary(delegate, defaultStatus) {
	return (request, response, next) => {
		Promise.resolve()
			.then(() => delegate(request, response, next))
			.catch((error) => {
				const { status = defaultStatus, message = error } = error || {};
				next({
					status,
					message,
				});
			});
	};
}

module.exports = asyncErrorBoundary;
