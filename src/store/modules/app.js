import Cookies from 'js-cookie'

const app = {
	state: {
		sidebar: {
			opened: !+Cookies.get('sidebarStatus'),
			withoutAnimation: false
		},
		device: 'desktop',
	},
	mutations: {
		TOOGLE_SIDEBAR: state => {

			const status = state.sidebar.opened ? 1 : 0
			Cookies.set('sidebarStatus', status)

			state.sidebar.opened = !state.sidebar.opened
			state.sidebar.withoutAnimation = false

		},
		CLOSE_SIDEBAR: (state, withoutAnimation) => {
			Cookies.set('sidebarStatus', 1)
			state.sidebar.opened = false
			state.sidebar.withoutAnimation = withoutAnimation
		},
		TOGGLE_DEVICE: (state, device) => {
			state.device = device
		}
	},
	actions: {
		toggleSideBar({
			commit
		}) {
			commit('TOOGLE_SIDEBAR')
		},
		closeSideBar({
			commit
		}, {
			withoutAnimation
		}) {
			commit('CLOSE_SIDEBAR', withoutAnimation)
		},
		toggleDevice({
			commit
		}, device) {
			commit('TOGGLE_DEVICE', device)
		}
	}
}

export default app
