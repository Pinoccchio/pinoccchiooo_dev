import { PlusCircle } from "lucide-react"

export function ProjectsSection() {
  return (
    <section id="projects" className="container py-24 sm:py-32 space-y-8">
      <div className="flex flex-col gap-2 text-center">
        <h2 className="text-3xl font-bold">My Projects</h2>
        <p className="text-muted-foreground mx-auto max-w-[700px]">
          Check out some of my featured work. Each project is crafted with care and attention to detail.
        </p>
      </div>

      {/* Empty state */}
      <div className="flex flex-col items-center justify-center py-16 px-4 border border-dashed rounded-lg bg-muted/40">
        <div className="flex flex-col items-center text-center max-w-md gap-2">
          <PlusCircle className="h-12 w-12 text-muted-foreground mb-2" />
          <h3 className="text-xl font-medium">Projects Coming Soon</h3>
          <p className="text-muted-foreground">
            I'm currently working on some exciting projects. Check back soon to see what I've been building!
          </p>
        </div>
      </div>
    </section>
  )
}

