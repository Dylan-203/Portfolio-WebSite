const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const norm = (s) => s.toLowerCase().replace(/c\+\+/g, 'cpp')

// A skill matches a project when any word of the skill appears in the project's tags or description
export const matches = (skill, project) => {
  const hay = norm(project.tags.join(' ') + ' ' + project.description)
  return norm(skill).split(/[\/+\s]+/).filter((t) => t.length > 1)
    .some((t) => new RegExp(`(^|[^a-z0-9])${esc(t)}([^a-z0-9]|$)`).test(hay))
}
