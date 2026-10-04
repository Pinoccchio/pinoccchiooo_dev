import type { IconType } from "react-icons"
import { FiCode, FiCpu, FiDatabase, FiGitBranch, FiLink } from "react-icons/fi"
import { TbBrandOpenai } from "react-icons/tb"
import {
  SiAndroid, SiAndroidstudio, SiAnthropic, SiApple, SiAppstore, SiCloudflare,
  SiCursor, SiDocker, SiExpo, SiFigma, SiFirebase, SiFlutter, SiGit, SiGithub,
  SiGoogleplay, SiGooglegemini, SiJavascript, SiJupyter, SiMediapipe, SiNeon,
  SiNestjs, SiNextdotjs, SiNodedotjs, SiOpenjdk, SiPostgresql, SiPostman,
  SiPytorch, SiReact, SiRender, SiSupabase, SiTailwindcss, SiTypescript,
  SiVercel, SiVitest, SiXcode, SiPython,
} from "react-icons/si"
import { VscVscode } from "react-icons/vsc"

type TechMark = { Icon: IconType; color?: string }

const marks: Record<string, TechMark> = {
  JavaScript: { Icon: SiJavascript, color: "#F7DF1E" },
  TypeScript: { Icon: SiTypescript, color: "#3178C6" },
  React: { Icon: SiReact, color: "#61DAFB" },
  "Next.js": { Icon: SiNextdotjs },
  Flutter: { Icon: SiFlutter, color: "#54C5F8" },
  "Tailwind CSS": { Icon: SiTailwindcss, color: "#06B6D4" },
  "Node.js": { Icon: SiNodedotjs, color: "#5FA04E" },
  NestJS: { Icon: SiNestjs, color: "#E0234E" },
  Python: { Icon: SiPython, color: "#3776AB" },
  Java: { Icon: SiOpenjdk, color: "#E76F00" },
  "REST APIs": { Icon: FiCode },
  Webhooks: { Icon: FiLink },
  PostgreSQL: { Icon: SiPostgresql, color: "#5B8BD9" },
  Supabase: { Icon: SiSupabase, color: "#3ECF8E" },
  Firebase: { Icon: SiFirebase, color: "#FFCA28" },
  Firestore: { Icon: SiFirebase, color: "#FFCA28" },
  Neon: { Icon: SiNeon, color: "#00E5BF" },
  "Cloudflare D1": { Icon: SiCloudflare, color: "#F38020" },
  "React Native": { Icon: SiReact, color: "#61DAFB" },
  Expo: { Icon: SiExpo },
  Android: { Icon: SiAndroid, color: "#3DDC84" },
  iOS: { Icon: SiApple },
  "App Store Connect": { Icon: SiAppstore, color: "#0D96F6" },
  "Google Play Console": { Icon: SiGoogleplay, color: "#34A853" },
  OpenAI: { Icon: TbBrandOpenai },
  Gemini: { Icon: SiGooglegemini, color: "#A78BFA" },
  Claude: { Icon: SiAnthropic, color: "#D97757" },
  MediaPipe: { Icon: SiMediapipe, color: "#26A69A" },
  PyTorch: { Icon: SiPytorch, color: "#EE4C2C" },
  "CNN Models": { Icon: FiCpu },
  "Jupyter Notebook": { Icon: SiJupyter, color: "#F37626" },
  Vercel: { Icon: SiVercel },
  Render: { Icon: SiRender, color: "#46E3B7" },
  "Cloudflare Workers": { Icon: SiCloudflare, color: "#F38020" },
  "Cloudflare R2": { Icon: SiCloudflare, color: "#F38020" },
  "AWS RDS": { Icon: FiDatabase, color: "#C925D1" },
  Git: { Icon: SiGit, color: "#F05032" },
  GitHub: { Icon: SiGithub },
  Vitest: { Icon: SiVitest, color: "#729B1B" },
  Docker: { Icon: SiDocker, color: "#2496ED" },
  Postman: { Icon: SiPostman, color: "#FF6C37" },
  Figma: { Icon: SiFigma, color: "#F24E1E" },
  Xcode: { Icon: SiXcode, color: "#147EFB" },
  "Android Studio": { Icon: SiAndroidstudio, color: "#3DDC84" },
  "VS Code": { Icon: VscVscode, color: "#007ACC" },
  Cursor: { Icon: SiCursor },
}

export function TechLogo({ name }: { name: string }) {
  const { Icon, color } = marks[name] || { Icon: FiGitBranch }
  return <Icon aria-hidden="true" className="tech-stack-logo" style={color ? { color } : undefined} />
}
