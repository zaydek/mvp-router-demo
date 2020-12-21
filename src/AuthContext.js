import { createContext, useContext } from "react"
import useMethods from "use-methods"

export const AuthContext = createContext()

const auth = {
	initialState: {
		isAuthenticated: false,
		// ...
	},
	reducer: state => ({
		logIn() {
			state.isAuthenticated = true
		},
		logOut() {
			state.isAuthenticated = false
		},
	}),
}

export function useAuth() {
	return useContext(AuthContext)
}

export function useAuthMethods() {
	return useMethods(auth.reducer, auth.initialState)
}
