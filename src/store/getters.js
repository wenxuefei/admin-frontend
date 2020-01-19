const getters = {
	sidebar: state => state.app.sidebar,
	token: state => state.user.token,
	device: state => state.app.device
}

export default getters
