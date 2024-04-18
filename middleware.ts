import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/middleware";

// constante con la lista de rutas a las que se requiere autenticar el usuario.
const routes = [
  '/notes',
  '/notes2',
  '/products',
  '/password'
];

export async function middleware(request: NextRequest) {
  try {
    // This `try/catch` block is only here for the interactive tutorial.
    // Feel free to remove once you have Supabase connected.
    const { supabase, response } = createClient(request);

    // Refresh session if expired - required for Server Components
    // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
    const {data: {session}} = await supabase.auth.getSession();

    console.log(session);
        //si no esta autenticado y la ruta es resringida, redireccionar a login
    if (!session && routes.includes(request.nextUrl.pathname)){
      //console.log("rediccion")
      //rescribir la peticion
      //return NextResponse.rewrite(new URL('/login', request.url));

      //redicionar a otra ruta
      const url = request.nextUrl.clone();
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }

    return response;
  } catch (e) {
    // If you are here, a Supabase client could not be created!
    // This is likely because you have not set up environment variables.
    // Check out http://localhost:3000 for Next Steps.
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
