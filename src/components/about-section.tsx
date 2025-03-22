interface EducationItem {
    degree: string
    institution: string
    year: string
  }
  
  interface ExperienceItem {
    position: string
    company: string
    period: string
    description: string
  }
  
  export function AboutSection() {
    const education: EducationItem[] = [
      {
        degree: "Master's in Computer Science",
        institution: "Fairy Tale University",
        year: "2018-2020",
      },
      {
        degree: "Bachelor's in Digital Craftsmanship",
        institution: "Geppetto's Workshop",
        year: "2014-2018",
      },
    ]
  
    const experience: ExperienceItem[] = [
      {
        position: "Senior Developer",
        company: "Wish Upon A Star Inc.",
        period: "2020-Present",
        description: "Leading development of wish-granting applications and mentoring junior developers.",
      },
      {
        position: "Frontend Developer",
        company: "Blue Fairy Technologies",
        period: "2018-2020",
        description: "Developed responsive web applications with React and Next.js.",
      },
      {
        position: "Junior Developer",
        company: "Honest John's Digital Solutions",
        period: "2016-2018",
        description: "Assisted in building e-commerce platforms and learning web fundamentals.",
      },
    ]
  
    return (
      <div className="space-y-6">
        <div>
          <p className="mb-4">
            Hello! I'm Pinocchio, a passionate developer who started as a wooden puppet and transformed into a real
            programmer. My journey began when I wished upon a star to become a great developer, and now I'm making that
            wish come true!
          </p>
          <p className="mb-4">
            With over 5 years of experience in web and mobile development, I specialize in creating interactive and
            engaging applications that bring joy to users. My background in storytelling helps me craft intuitive user
            experiences that feel magical.
          </p>
          <p>
            When I'm not coding, you can find me exploring the wonders of Wonderland, learning new technologies, or
            helping others avoid the mistakes I made on my journey from wood to code.
          </p>
        </div>
  
        <div>
          <h3 className="text-lg font-medium text-blue-900 mb-3">Education</h3>
          <div className="space-y-3">
            {education.map((item, index) => (
              <div key={index} className="border-l-2 border-blue-300 pl-4">
                <h4 className="font-medium">{item.degree}</h4>
                <p className="text-sm text-gray-600">
                  {item.institution} • {item.year}
                </p>
              </div>
            ))}
          </div>
        </div>
  
        <div>
          <h3 className="text-lg font-medium text-blue-900 mb-3">Experience</h3>
          <div className="space-y-4">
            {experience.map((item, index) => (
              <div key={index} className="border-l-2 border-blue-300 pl-4">
                <h4 className="font-medium">{item.position}</h4>
                <p className="text-sm text-gray-600">
                  {item.company} • {item.period}
                </p>
                <p className="text-sm mt-1">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
  
  