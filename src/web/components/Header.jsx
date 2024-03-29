import { useSession } from "@/web/components/SessionContext"
import Button from "@/web/components/ui/Button"
import Link from "@/web/components/ui/Link"
import apiClient from "../services/apiClient"

export const getServerSideProps = async () => {
  const nameUser = await apiClient("/users")

  return {
    props: { nameUser },
  }
}
const MenuItem = ({ children, href, ...otherProps }) => (
  <li {...otherProps}>
    <Link styless href={href}>
      {children}
    </Link>
  </li>
)
const Header = () => {
  const { session, signOut } = useSession()
  const canCreatePost =
    session && (session.role === "author" || session.role === "admin")

  return (
    <header className="border-b-2 bg-slate-300">
      <div className="flex md:max-w-3xl mx-auto p-4">
        <div className="text-2xl">
          <Link href="/" styless>
            LOGO
          </Link>
        </div>
        <nav className="ms-auto">
          <ul className="flex h-full gap-4 items-center">
            {session && session.role !== "disabled" ? (
              <>
                {canCreatePost && (
                  <MenuItem href="/post/create">Create Post</MenuItem>
                )}
                <MenuItem href="/post">list Post</MenuItem>
                {session.role === "admin" && (
                  <MenuItem href="/user">list user</MenuItem>
                )}
                <MenuItem href="/profile">edit Profile</MenuItem>
                <MenuItem href="/dashboard">My Dashboard</MenuItem>

                <li>
                  <Button
                    variant="transparent"
                    size="inherit"
                    onClick={signOut}
                  >
                    Sign Out
                  </Button>
                </li>
              </>
            ) : (
              <>
                <MenuItem href="/sign-up">Sign Up</MenuItem>
                <MenuItem href="/sign-in">Sign In</MenuItem>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
