import { withAuth } from "next-auth/middleware";

const PUBLIC_PATHS = ["/", "/connexion", "/inscription", "/api"];

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      const path = req.nextUrl.pathname;

      if (PUBLIC_PATHS.some((p) => path === p || path.startsWith(p + "/"))) {
        return true;
      }

      if (!token) return false;

      if (path.startsWith("/admin")) {
        return token.role === "ADMIN";
      }

      return true;
    },
  },
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|content-fr).*)"],
};
