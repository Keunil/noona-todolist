export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="pt-0 pb-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-6">
          {/* PwC Logo */}
          <div className="flex-shrink-0">
            <img
              src="https://crystalpng.com/wp-content/uploads/2025/05/pwc-logo.png"
              alt="PwC Logo"
              className="h-12 w-auto"
            />
          </div>

          {/* Copyright */}
          <div className="text-base text-gray-900">© 2015 - {currentYear} 삼일회계법인. All rights reserved.</div>
        </div>

        {/* Bottom links */}
        <div className="flex flex-wrap gap-x-8 gap-y-4 mb-6">
          <a href="#" className="text-base hover:text-[#F4511E] transition-colors text-gray-900">
            개인정보 처리방침
          </a>
          <a href="#" className="text-base hover:text-[#F4511E] transition-colors text-gray-900">
            Cookie policy
          </a>
          <a href="#" className="text-base hover:text-[#F4511E] transition-colors text-gray-900">
            Legal disclaimer
          </a>
          <a href="#" className="text-base hover:text-[#F4511E] transition-colors text-gray-900">
            About site provider
          </a>
          <a href="#" className="text-base hover:text-[#F4511E] transition-colors text-gray-900">
            Site map
          </a>
        </div>

        {/* Offices worldwide */}
        <div className="mb-4">
          <a href="#" className="text-base hover:text-[#F4511E] transition-colors text-gray-900">
            Offices worldwide
          </a>
        </div>
      </div>
    </footer>
  )
}
