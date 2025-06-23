/* eslint-disable react/no-unescaped-entities */
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
      year: "",
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
        <h2 className="text-xl sm:text-2xl font-bold pinocchio-primary mb-2">Jan Miko A. Guevarra</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
          {contactInfo.map((item, index) => (
            <div key={index} className="flex items-center">
              <span className="font-medium pinocchio-primary mr-2">{item.label}:</span>
              {item.link ? (
                <a
                  href={item.link}
                  className="pinocchio-accent hover:underline text-sm sm:text-base break-all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.value}
                </a>
              ) : (
                <span className="pinocchio-text text-sm sm:text-base break-all">{item.value}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bio */}
      <div>
        <h3 className="text-lg font-medium pinocchio-accent mb-3">Professional Profile</h3>
        <p className="mb-4 pinocchio-text">
          I am a cross-platform developer specializing in building AI-powered applications for web and mobile. My portfolio includes solutions for healthcare, education, government, food tech, accessibility, and legal tech. I leverage technologies like Flutter, Next.js, and advanced APIs (Gemini AI, Spoonacular, MediaPipe) to create modern, user-focused products. My work is driven by a passion for integrating artificial intelligence and automation to solve real-world problems and deliver seamless user experiences across platforms.
        </p>
      </div>

      {/* Skills */}
      <div>
        <h3 className="text-lg font-medium pinocchio-accent mb-3">Core Competencies</h3>
        <div className="flex flex-wrap gap-2">
          <span className="px-2 sm:px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs sm:text-sm">AI-Powered App Development (Gemini AI, Spoonacular, MediaPipe)</span>
          <span className="px-2 sm:px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs sm:text-sm">Cross-Platform Development (Flutter, Next.js)</span>
          <span className="px-2 sm:px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs sm:text-sm">API Integration & Automation</span>
          <span className="px-2 sm:px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs sm:text-sm">Modern UI/UX Design</span>
          <span className="px-2 sm:px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs sm:text-sm">End-to-End Solution Delivery (Frontend & Backend)</span>
          <span className="px-2 sm:px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs sm:text-sm">Real-Time Data & Analytics</span>
          <span className="px-2 sm:px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs sm:text-sm">Accessibility & User Empowerment</span>
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
          I am seeking opportunities to further innovate in the field of AI-powered, cross-platform application development. My goal is to continue building impactful solutions that leverage the latest in artificial intelligence and modern frameworks, contributing to projects that make a real difference in users' lives.
        </p>
      </div>
    </div>
  )
}
