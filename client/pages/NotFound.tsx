import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-primary/10 px-4">
      <div className="text-center max-w-md">
        <div className="mb-6 inline-block rounded-lg bg-primary/10 p-6">
          <div className="text-6xl font-bold text-primary">404</div>
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Page Not Found</h1>
        <p className="text-muted-foreground mb-8">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <Home size={20} />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
