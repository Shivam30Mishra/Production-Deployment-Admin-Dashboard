function Layout({ children }) {
  return (
    <div className="app">
      <Sidebar />
      <div className="content">
        <Header />
        <main>{children}</main>
      </div>
    </div>
  )
}
