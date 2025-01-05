import InnerNav from '@/components/modules/InnerNav'

export default function Layout({ children }: { children: React.ReactNode }) {
  const settingsNav = [
    {
      link: '/dashboard/settings/account',
      name: 'Account Settings'
    },
    {
      link: '/dashboard/settings/profiles',
      name: 'Manage Profiles'
    },
    {
      link: '/dashboard/settings/billing',
      name: 'Billing Method'
    }
  ]

  return (
    <>
      <section>
        {children}
        {/* <div className="max-w-6xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
          <div className="sm:align-center sm:flex sm:flex-col">
            <h1 className="text-4xl font-extrabold text-primary sm:text-center sm:text-6xl">
              Settings
            </h1>
            <p className="max-w-2xl m-auto mt-5 text-xl text-primary sm:text-center sm:text-2xl"></p>
          </div>
        </div>

        <div className="p-4 max-w-3xl mx-auto">
          <InnerNav navs={settingsNav} />

          <div>{children}</div>
        </div> */}
      </section>
    </>
  )
}
