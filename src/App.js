import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import { ProtectedRoute } from "./ProtectedRoute"
import { useAuth, AuthContext, useAuthMethods } from "./AuthContext"
import useMethods from "use-methods"

import "./App.css"

function FormPage() {
	const [authState, authDispatch] = useAuth()

	const [formState, formDispatch] = useMethods(
		formState => ({
			setUser(value) {
				formState.user = value
			},
			setPass(value) {
				formState.pass = value
			},
		}),
		{
			user: "",
			pass: "",
		},
	)

	function handleSubmit(e) {
		e.preventDefault()
		// authDispatch.logIn()
		alert("nope")
	}

	if (authState.isAuthenticated) {
		return <Redirect to="/logged-in" />
	}
	return (
		<form onSubmit={handleSubmit}>
			<div>
				<p>user</p>
				<input type="text" value={formState.user} onChange={e => formDispatch.setUser(e.target.value)} />
			</div>
			<div>
				<p>pass</p>
				<input type="password" value={formState.pass} onChange={e => formDispatch.setPass(e.target.value)} />
			</div>
			<button type="submit">Submit</button>
			<pre>{JSON.stringify(formState, null, 2)}</pre>
		</form>
	)
}

export default function App() {
	const [state, dispatch] = useAuthMethods()

	// const [loading, setLoading] = useState(true)
	//
	// useEffect(() => {
	//   // ...
	//   setLoading(false)
	//   useDispatch.setMetadata(true)
	// }, [])
	//
	// if (loading) {
	//   return <SkeletonPage />
	// }

	return (
		<AuthContext.Provider value={[state, dispatch]}>
			<div className="App">
				<Router>
					<Switch>
						<Route path="/not-logged-in">
							<div>Not logged in</div>
						</Route>

						<ProtectedRoute path="/logged-in">
							<div>Logged in</div>
						</ProtectedRoute>

						{/* <Route path="/sign-up">
							<SignUpPage />
						</Route> */}

						<Route path="/">
							<FormPage />
						</Route>
					</Switch>
				</Router>
			</div>
		</AuthContext.Provider>
	)
}
