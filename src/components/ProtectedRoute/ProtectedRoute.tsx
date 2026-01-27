import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import type { JSX } from "react";

interface ProtectedRouteProps {
	children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
	const { user, loading } = useAuth();

	if (loading) {
		return (
			<div className="flex items-center justify-center min-h-screen bg-accent-cream">
				<div className="text-center">
					<div className="inline-block w-12 h-12 border-4 rounded-full border-primary border-t-transparent animate-spin" />
					<p className="mt-4 text-lg font-medium text-primary">Loading...</p>
				</div>
			</div>
		);
	}

	if (!user) {
		return <Navigate to="/login" replace />;
	}

	return children;
};

export default ProtectedRoute;
