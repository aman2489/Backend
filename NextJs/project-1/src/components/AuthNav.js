import Link from "next/link"

const AuthNav = () => {
  return (
    <div className="flex gap-6">
        <Link href="/authLayout/login">Login</Link>
        <Link href="/authLayout/register">Register</Link>
      </div>
  )
}

export default AuthNav
