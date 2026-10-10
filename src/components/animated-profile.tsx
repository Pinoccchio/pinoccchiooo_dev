import Image from "next/image"

export function AnimatedProfile() {
  return (
    <Image
      src="/profile-photo.jpg?v=20261010"
      alt="Jan Miko A. Guevarra"
      fill
      priority
      sizes="(max-width: 640px) 78px, (max-width: 899px) 128px, 156px"
      className="object-cover object-center"
    />
  )
}

