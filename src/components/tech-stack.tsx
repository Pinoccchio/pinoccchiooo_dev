export function TechStack() {
  const categories = [
    {
      title: "Frontend",
      items: ["JavaScript", "TypeScript", "React", "Next.js", "Flutter", "Tailwind CSS"],
    },
    {
      title: "Backend",
      items: ["Node.js", "Python", "Java", "Firebase", "Supabase", "REST APIs"],
    },
    {
      title: "AI and Tools",
      items: ["Gemini", "OpenAI", "MediaPipe", "PyTorch", "Jupyter", "GitHub"],
    },
  ]

  return (
    <div className="space-y-6">
      {categories.map(category => (
        <div key={category.title}>
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">{category.title}</h3>
          <p className="mt-2 text-[var(--text-secondary)] leading-8">{category.items.join(" • ")}</p>
        </div>
      ))}
    </div>
  )
}
