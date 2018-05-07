const socket = (function() {
	let instance;

	function createInstance() {
		if(window.ReconnectingWebSocket) {
			return new window.ReconnectingWebSocket(`ws://is-offline:8082`);
		} else if(window.WebSocket) {
			return new window.WebSocket(`ws://is-offline:8082`);
		} else {
			return {};
		}
	}

	return {
		getInstance: function() {
			if(!instance) {
				instance = createInstance();
			}
			return instance;
		}
	}
})();

export default socket;