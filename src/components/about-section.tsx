interface EducationItem {
  degree: string
  institution: string
  location: string
  year: string
}

interface ExperienceItem {
  position: string
  company: string
  period: string
  description: string
}

interface ContactItem {
  label: string
  value: string
  link?: string
}

export function AboutSection() {
  const education: EducationItem[] = [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "Cor Jesu College, Inc.",
      location: "Digos City, Philippines",
      year: "Expected Graduation: 2026",
    },
  ]

  const experience: ExperienceItem[] = [
    {
      position: "Android & Web Developer",
      company: "Freelance",
      period: "2022-Present",
      description:
        "Delivering custom mobile and web applications for diverse clients. Implementing AI APIs and machine learning algorithms when required by specific project needs, creating solutions that effectively address business challenges while maintaining optimal performance.",
    },
    {
      position: "Multi-platform Developer",
      company: "Freelance",
      period: "2022-2024",
      description:
        "Specialized in cross-platform application development using Flutter, creating consistent experiences across Android, web, and Windows platforms. Focused on building responsive interfaces and optimizing application performance while ensuring code maintainability.",
    },
    {
      position: "Web Developer",
      company: "Freelance",
      period: "2024-Present",
      description:
        "Building modern web applications using Next.js and React. Specializing in server-side rendering, API integration, and responsive design to create fast, scalable web experiences with excellent user interfaces.",
    },
  ]

  const contactInfo: ContactItem[] = [
    {
      label: "Location",
      value: "Digos City, Philippines 8002",
    },
    {
      label: "Phone",
      value: "09514575745",
      link: "tel:09514575745",
    },
    {
      label: "Email",
      value: "janmikoguevarra@gmail.com",
      link: "mailto:janmikoguevarra@gmail.com",
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/jan-miko-guevarra-894088294",
      link: "https://www.linkedin.com/in/jan-miko-guevarra-894088294",
    },
  ]

  const skills = [
    "Fullstack Web Development",
    "Mobile App Development",
    "Flutter (Android/Web/Windows)",
    "Next.js & React",
    "AI API Integration",
    "Machine Learning Implementation",
    "API Development",
    "Responsive Design",
    "Database Management",
    "UI/UX Design",
  ]

  return (
    <div className="space-y-8">
      {/* Personal Info */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold pinocchio-primary mb-2">Jan Miko A. Guevarra</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
          {contactInfo.map((item, index) => (
            <div key={index} className="flex items-center">
              <span className="font-medium pinocchio-primary mr-2">{item.label}:</span>
              {item.link ? (
                <a
                  href={item.link}
                  className="pinocchio-accent hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.value}
                </a>
              ) : (
                <span className="pinocchio-text">{item.value}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bio */}
      <div>
        <h3 className="text-lg font-medium pinocchio-accent mb-3">Professional Profile</h3>
        <p className="mb-4 pinocchio-text">
          I am a versatile developer with expertise in both mobile and web technologies. Since beginning my development
          journey in 2022, I've built a diverse portfolio of applications ranging from straightforward utility tools to
          comprehensive solutions for various clients. When projects require enhanced capabilities, I implement AI APIs
          and machine learning algorithms to create more intelligent, data-driven experiences.
        </p>
        <p className="mb-4 pinocchio-text">
          My development experience began with Flutter for cross-platform applications, allowing me to efficiently
          create solutions for Android, web, and Windows platforms. In 2024, I expanded my technical skills to include
          web development with Next.js and React, enabling me to deliver comprehensive solutions across multiple
          platforms.
        </p>
        <p className="pinocchio-text">
          I've focused on freelance projects to enhance my skills and build a diverse portfolio before transitioning to
          industry roles. This approach has allowed me to develop practical expertise across various technologies and
          business domains, preparing me for real-world challenges. I'm now looking forward to applying my comprehensive
          skill set in an industry position where I can contribute to larger-scale projects and continue growing as a
          developer.
        </p>
      </div>

      {/* Skills */}
      <div>
        <h3 className="text-lg font-medium pinocchio-accent mb-3">Core Competencies</h3>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Education */}
      <div>
        <h3 className="text-lg font-medium pinocchio-accent mb-3">Education</h3>
        <div className="space-y-3">
          {education.map((item, index) => (
            <div key={index} className="border-l-2 border-blue-500 dark:border-blue-700 pl-4">
              <h4 className="font-medium pinocchio-primary">{item.degree}</h4>
              <p className="text-sm pinocchio-text">
                {item.institution}, {item.location}
              </p>
              <p className="text-sm pinocchio-text font-medium">{item.year}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div>
        <h3 className="text-lg font-medium pinocchio-accent mb-3">Professional Experience</h3>
        <div className="space-y-4">
          {experience.map((item, index) => (
            <div key={index} className="border-l-2 border-blue-500 dark:border-blue-700 pl-4">
              <h4 className="font-medium pinocchio-primary">{item.position}</h4>
              <p className="text-sm pinocchio-text">
                {item.company} • {item.period}
              </p>
              <p className="text-sm mt-1 pinocchio-text">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Career Objectives */}
      <div>
        <h3 className="text-lg font-medium pinocchio-accent mb-3">Career Objectives</h3>
        <p className="pinocchio-text">
          I am actively seeking opportunities to transition from freelance work to an industry position where I can
          apply my technical skills in a collaborative team environment. My goal is to contribute to innovative projects
          while continuing to expand my expertise in both mobile and web development. I'm particularly interested in
          roles that allow me to leverage my experience with Flutter for Android/web/Windows applications and Next.js to
          create impactful solutions.
        </p>
      </div>
    </div>
  )
}

