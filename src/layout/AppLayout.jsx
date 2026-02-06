export default function AppLayout({ sidebar, detail }) {
  return (
    <div className="h-screen md:flex">

      <aside className="md:w-80 overflow-y-auto md:relative z-1">
        {sidebar}
      </aside>

      <main className={`flex-1 overflow-y-auto fixed z-999 top-0 left-0 bg-white md:relative w-full h-full md:w-auto shadow-[-4px_0_60px_rgba(0,0,0,0.05)] ${
        !detail ? "hidden md:block" : ""
      }`}>
        {detail}
      </main>

    </div>
  )
}
