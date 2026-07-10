import { notFound } from 'next/navigation'
import { getProjectBySlug, getAllSlugs } from '@/lib/projects'
import CaseStudyPage from '@/components/CaseStudyPage'

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return {}
  return {
    title: `${project.name} — Ctrl Code`,
    description: project.description,
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()
  return <CaseStudyPage project={project} />
}
