import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-16 text-center lg:px-10">
      <p className="tracking-eyebrow text-sm font-semibold uppercase text-(--color-accent)">
        404
      </p>
      <h1 className="mt-4 font-heading text-4xl sm:text-5xl">Page not found</h1>
      <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-(--color-muted)">
        This route is ready for future pages, but it does not exist yet in the template.
      </p>
      <Link to="/" className="button-primary mt-8">
        Back home
      </Link>
    </div>
  )
}

export default NotFoundPage
