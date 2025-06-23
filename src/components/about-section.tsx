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

interface ProjectHighlight {
  category: string
  projects: string[]
}

export function AboutSection() {
  const education: EducationItem[] = [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "Cor Jesu College, Inc.",
      location: "Digos City, Philippines",
      year: "Currently Pursuing",
    },
  ]

  const experience: ExperienceItem[] = [
    {
      position: "Android & Web Developer",
      company: "Freelance",
      period: "2022-Present",
      description:
        "Delivering custom mobile and web applications for diverse clients across multiple industries. Specializing in AI integration using Gemini API for intelligent text processing, image analysis, and voice recognition. Creating solutions that effectively address business challenges while leveraging cutting-edge technologies like MediaPipe for gesture recognition and Spoonacular API for nutritional analysis.",
    },
    {
      position: "Multi-platform Developer",
      company: "Freelance",
      period: "2022-2024",
      description:
        "Specialized in cross-platform application development using Flutter, creating consistent experiences across Android, web, and Windows platforms. Developed innovative solutions including real-time sign language translation, AI-powered soil analysis, and accessibility-focused applications that bridge communication gaps and empower users.",
    },
    {
      position: "Web Developer",
      company: "Freelance",
      period: "2024-Present",
      description:
        "Building modern web applications using Next.js and React with focus on AI integration and government solutions. Delivered platforms for venue reservations, healthcare management, and legal assistance featuring server-side rendering, intelligent automation, and responsive design for optimal user experiences.",
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

  const projectHighlights: ProjectHighlight[] = [
    {
      category: "AI-Powered Solutions",
      projects: ["Yummify Recipe Finder", "SnakeBuddy identification app", "Better Bites dietary analysis", "Scan My Soil agricultural assistant"]
    },
    {
      category: "Accessibility Technology",
      projects: ["EnviroSpeak voice processing", "TalkToHand sign language translation"]
    },
    {
      category: "Government & Enterprise",
      projects: ["LawBot legal assistant platform", "E-Reserve venue management", "Procurement systems"]
    },
    {
      category: "Healthcare Solutions",
      projects: ["MHealth patient management", "AI dietary analysis applications"]
    }
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
          I am a cross-platform developer specializing in AI-powered applications for web and mobile platforms. My portfolio spans solutions across healthcare, education, government, food tech, accessibility, and legal tech industries. I leverage cutting-edge technologies like Flutter, Next.js, and advanced AI APIs (Gemini AI, Spoonacular, MediaPipe) to create modern, user-focused products that solve real-world problems through intelligent automation.
        </p>
        <p className="mb-4 pinocchio-text">
          Since 2022, I've delivered 15+ production applications, each designed to address specific industry challenges. My approach focuses on integrating artificial intelligence not as a novelty, but as a practical solution to enhance user experience and provide tangible value. From AI-powered recipe discovery apps to real-time sign language translation systems, my work demonstrates how modern technology can be applied to create meaningful impact.
        </p>
        <p className="pinocchio-text">
          My technical journey evolved from mastering Flutter for cross-platform development to incorporating Next.js for sophisticated web applications. This progression has enabled me to offer comprehensive solutions that work seamlessly across Android, web, and Windows platforms while maintaining consistent performance and user experience.
        </p>
      </div>

      {/* Core Competencies */}
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

      {/* Featured Innovations */}
      <div>
        <h3 className="text-lg font-medium pinocchio-accent mb-3">Featured Innovations</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {projectHighlights.map((highlight, index) => (
            <div key={index} className="border-l-2 border-blue-500 dark:border-blue-700 pl-4">
              <h4 className="font-medium pinocchio-primary mb-2">{highlight.category}</h4>
              <ul className="space-y-1">
                {highlight.projects.map((project, projectIndex) => (
                  <li key={projectIndex} className="text-sm pinocchio-text">
                    • {project}
                  </li>
                ))}
              </ul>
            </div>
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
          I am seeking opportunities to further innovate in AI-powered, cross-platform application development. My goal is to contribute to projects that leverage the latest in artificial intelligence and modern frameworks, creating solutions that make a real difference in users' lives. I'm particularly interested in roles where I can apply my expertise in Gemini AI integration, Flutter development, and Next.js to solve complex challenges while working with forward-thinking teams.
        </p>
      </div>
    </div>
  )
}