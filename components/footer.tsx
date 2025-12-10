export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="pt-0 pb-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-6">
          <div className="flex-shrink-0">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-gray-900">DealMate</span>
              <span className="text-xs text-gray-500">M&A Platform</span>
            </div>
          </div>

          <div className="text-base text-gray-900">© 2025 - {currentYear} DealMate. All rights reserved.</div>
        </div>
      </div>
    </footer>
  )
}
