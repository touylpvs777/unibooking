/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { revalidatePath } from 'next/cache'
import { fetchAPI } from '@/lib/api'
import { projects as fallbackProjects } from '@/data/projects'

export async function getProjects(options: { noAuth?: boolean } = {}): Promise<{ success: boolean; projects: any; error?: string }> {
  try {
    const res = await fetchAPI('/projects/core', options)
    if (Array.isArray(res) && res.length > 0) {
      return { success: true, projects: res }
    }
    if (res && Array.isArray(res.projects) && res.projects.length > 0) {
      return { success: true, projects: res.projects }
    }
    return { success: true, projects: fallbackProjects }
  } catch (error: any) {
    console.warn('Failed to fetch projects from API, falling back to static data:', error?.message || error)
    return { success: true, projects: fallbackProjects, error: error?.message }
  }
}

export async function getProjectBySlug(slug: string, options: { noAuth?: boolean } = {}): Promise<{ success: boolean; project: any; error?: string }> {
  try {
    const project = await fetchAPI(`/projects/core/${slug}`, options)
    if (project && !project.error && (project.id || project.slug)) {
      return { success: true, project }
    }
    const found = fallbackProjects.find((p: any) => p.id === slug || p.slug === slug)
    return { success: true, project: found }
  } catch (error: any) {
    console.warn('Error fetching project from API, falling back to static data:', error?.message || error)
    const found = fallbackProjects.find((p: any) => p.id === slug || p.slug === slug)
    return { success: true, project: found, error: error?.message }
  }
}

export async function createProject(data: any) {
  try {
    const res = await fetchAPI('/projects/core', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    revalidatePath('/[locale]/admin/projects')
    revalidatePath('/[locale]/projects')
    return { success: true, project: res.project }
  } catch (error: any) {
    console.error('Error creating project:', error)
    return { success: false, error: error.message }
  }
}

export async function updateProject(id: string, data: any) {
  try {
    const res = await fetchAPI(`/projects/core/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
    revalidatePath('/[locale]/admin/projects')
    revalidatePath('/[locale]/projects')
    revalidatePath(`/[locale]/projects/${res.project?.slug}`)
    return { success: true, project: res.project }
  } catch (error: any) {
    console.error('Error updating project:', error)
    return { success: false, error: error.message }
  }
}

export async function deleteProject(id: string) {
  try {
    await fetchAPI(`/projects/core/${id}`, {
      method: 'DELETE',
    })
    revalidatePath('/[locale]/admin/projects')
    revalidatePath('/[locale]/projects')
    return { success: true }
  } catch (error: any) {
    console.error('Error deleting project:', error)
    return { success: false, error: error.message }
  }
}
