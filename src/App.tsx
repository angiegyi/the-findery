import { Privacy, Profile, Search, Terms, UserLogin, Waitlist } from "./views";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { SupabaseTest } from "./components";

function App() {
	return (
		<Router>
			<AuthProvider>
				<Routes>
					<Route path="/" element={<Waitlist />} />
					<Route path="/login" element={<UserLogin />} />
					<Route path="/privacy" element={<Privacy />} />
					<Route path="/terms" element={<Terms />} />
					<Route
						path="/search"
						element={
							<ProtectedRoute>
								<Search />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/profile"
						element={
							<ProtectedRoute>
								<Profile />
							</ProtectedRoute>
						}
					/>
					<Route path="/test" element={<SupabaseTest />} />
				</Routes>
			</AuthProvider>
		</Router>
	);
}

export default App;
