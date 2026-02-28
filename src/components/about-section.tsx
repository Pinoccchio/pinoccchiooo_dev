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
      year: "Expected 2026",
    },
  ]

  const experience: ExperienceItem[] = [
    {
      position: "Full-Stack Developer & Hybrid System Architect",
      company: "Freelance",
      period: "2022-Present",
      description:
        "Delivered 40+ comprehensive projects across e-commerce, education, government, healthcare, and legal tech domains, including 4 major hybrid systems (web + mobile). Built InCloud for J.A's Food Trading (production e-commerce), RRIBN for Philippine Army Reserve (government system), LawBot for PNP (67+ crime types), and LearnSmart (AI educational platform). Specializing in Next.js 15, React 19, Flutter 3.x, with Supabase and Firebase backends.",
    },
    {
      position: "AI Integration Specialist",
      company: "Freelance",
      period: "2024-Present",
      description:
        "Integrated AI across 12 projects using Google Gemini (1.5 Pro, 2.0 Flash), OpenAI, and MediaPipe. Achieved 20-40x performance improvements through prompt caching optimization. Implemented AI-powered features including evidence suggestions, pattern detection, quiz generation, soil analysis, snake identification, and sign language translation.",
    },
    {
      position: "Multi-platform Developer",
      company: "Freelance",
      period: "2022-2024",
      description:
        "Specialized in cross-platform application development with 20+ Flutter projects across Android, iOS, Web, Windows, Linux, and macOS. Developed innovative solutions including real-time sign language translation (MediaPipe), BLE indoor positioning (Beecon), and accessibility-focused applications. Mastered state management with Riverpod, Provider, GetX, and BLoC patterns.",
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
      category: "Major Hybrid Systems (4)",
      projects: ["InCloud (E-commerce for J.A's Food Trading)", "LearnSmart (4 AI study techniques)", "RRIBN (Philippine Army Reserve)", "LawBot (67+ crime types)"]
    },
    {
      category: "AI-Powered Solutions (12 projects)",
      projects: ["Gemini AI integration", "OpenAI implementations", "MediaPipe ML", "Custom training models"]
    },
    {
      category: "Government & Enterprise",
      projects: ["Military management systems", "Cybercrime reporting", "Healthcare management", "Procurement tracking"]
    },
    {
      category: "Real-World Impact",
      projects: ["Production inventory for actual business", "Government-grade security systems", "Educational platforms with analytics", "Accessibility technology"]
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
          I am a full-stack developer specializing in AI-powered hybrid systems for web and mobile platforms. With <strong>40+ comprehensive projects</strong>, my portfolio spans solutions across e-commerce, education, government, healthcare, legal tech, accessibility, and more. I leverage cutting-edge technologies like Flutter, Next.js 15, and advanced AI APIs (Gemini AI, OpenAI, MediaPipe) to create modern, user-focused products that solve real-world problems through intelligent automation.
        </p>
        <p className="mb-4 pinocchio-text">
          Since 2022, I've delivered <strong>4 major hybrid systems</strong> and <strong>35+ additional projects</strong>, each designed to address specific industry challenges. My approach focuses on integrating artificial intelligence not as a novelty, but as a practical solution to enhance user experience and provide tangible value. From production inventory systems for actual businesses to military management systems for government units, my work demonstrates real-world impact at scale.
        </p>
        <p className="pinocchio-text">
          My technical journey evolved from mastering Flutter for cross-platform development to incorporating Next.js 15 and React 19 for sophisticated web applications. This progression has enabled me to architect comprehensive hybrid solutions that work seamlessly across iOS, Android, Web, Windows, Linux, and macOS platforms while maintaining real-time synchronization, role-based access control, and consistent user experience.
        </p>
      </div>

      {/* Core Competencies */}
      <div>
        <h3 className="text-lg font-medium pinocchio-accent mb-3">Core Competencies</h3>
        <div className="flex flex-wrap gap-2">
          <span className="badge">Hybrid System Architecture (Web + Mobile Coordination)</span>
          <span className="badge">AI Integration (Gemini, OpenAI, MediaPipe)</span>
          <span className="badge">Full-Stack Development (Flutter, Next.js 15, React 19)</span>
          <span className="badge">Backend Architecture (Supabase, Firebase)</span>
          <span className="badge">Real-Time Data Synchronization</span>
          <span className="badge">Role-Based Access Control (RBAC)</span>
          <span className="badge">Government-Grade Security</span>
          <span className="badge">TypeScript & Type Safety</span>
          <span className="badge">Modern UI/UX Design</span>
          <span className="badge">Accessibility & User Empowerment</span>
        </div>
      </div>

      {/* Featured Innovations */}
      <div>
        <h3 className="text-lg font-medium pinocchio-accent mb-3">Featured Innovations</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {projectHighlights.map((highlight, index) => (
            <div key={index} className="border-l-2 border-[var(--accent)] pl-4">
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

      {/* Real-World Impact & Achievements */}
      <div>
        <h3 className="text-lg font-medium pinocchio-accent mb-3">Real-World Impact & Achievements</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="impact-card">
            <h4 className="font-medium pinocchio-primary mb-1">Production E-commerce System</h4>
            <p className="text-sm pinocchio-text">
              Built InCloud inventory management for J.A's Food Trading, an actual frozen food distributor in Manila with real-time multi-tier pricing and AI analytics
            </p>
          </div>

          <div className="impact-card">
            <h4 className="font-medium pinocchio-primary mb-1">Government Military System</h4>
            <p className="text-sm pinocchio-text">
              Created RRIBN management system for Philippine Army Reserve units with 4-role RBAC, training records, and government-grade security
            </p>
          </div>

          <div className="impact-card">
            <h4 className="font-medium pinocchio-primary mb-1">National Cybercrime Platform</h4>
            <p className="text-sm pinocchio-text">
              Developed LawBot with 67+ crime types for Philippines PNP, featuring AI evidence suggestions and pattern detection with 20-40x performance optimization
            </p>
          </div>

          <div className="impact-card">
            <h4 className="font-medium pinocchio-primary mb-1">AI Educational Platform</h4>
            <p className="text-sm pinocchio-text">
              Designed LearnSmart with 4 evidence-based study techniques (Active Recall, Pomodoro, Feynman, Retrieval Practice) and comprehensive analytics
            </p>
          </div>
        </div>
      </div>

      {/* Education */}
      <div>
        <h3 className="text-lg font-medium pinocchio-accent mb-3">Education</h3>
        <div className="space-y-3">
          {education.map((item, index) => (
            <div key={index} className="border-l-2 border-[var(--accent)] pl-4">
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
            <div key={index} className="border-l-2 border-[var(--accent)] pl-4">
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
          With 40+ projects demonstrating real-world impact—from production e-commerce systems to government-grade military management—I am seeking opportunities to architect enterprise-scale hybrid systems at innovative organizations. My goal is to leverage my expertise in Next.js 15, React 19, Flutter 3.x, and AI integration (Gemini, OpenAI, MediaPipe) to build transformative solutions that serve millions of users. I'm particularly interested in roles involving complex system architecture, real-time synchronization, RBAC implementation, and AI-powered automation where I can lead technical initiatives and mentor development teams.
        </p>
      </div>
    </div>
  )
}