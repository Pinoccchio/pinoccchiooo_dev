import Link from "next/link"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link
              href="/"
              className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
            >
              Pinocchio
            </Link>
            <p className="text-muted-foreground text-sm text-center md:text-left">
              Turning ideas into real digital experiences. No strings attached!
            </p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-2">
            <div className="flex gap-4">
              <Link href="#about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                About
              </Link>
              <Link href="#projects" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Projects
              </Link>
              <Link href="#skills" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Skills
              </Link>
              <Link href="#contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Contact
              </Link>
            </div>
            <p className="text-muted-foreground text-sm">© {currentYear} Pinocchio. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

