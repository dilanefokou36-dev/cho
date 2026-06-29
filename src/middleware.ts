import { withAuth } from "next-auth/middleware";

const PUBLIC_PATHS = ["/", "/connexion", "/inscription", "/api"];
const VISITOR_PATHS = ["/contact", "/devenir-libraire", "/metier", "/quotidien", "/difficultes", "/formation", "/espaces", "/produits", "/achats", "/economie", "/outils", "/reseau", "/protocoles", "/galerie"];

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      const path = req.nextUrl.pathname;

      if (PUBLIC_PATHS.some((p) => path === p || path.startsWith(p + "/"))) {
        return true;
      }

      if (VISITOR_PATHS.some((p) => path === p || path.startsWith(p + "/"))) {
        return true;
      }

      if (!token) return false;

      if (path.startsWith("/admin")) {
        return token.role === "ADMIN";
      }

      if (path.startsWith("/libraire")) {
        return token.role === "LIBRAIRE" || token.role === "ADMIN";
      }

      return true;
    },
  },
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|content-fr).*)"],
};
