export const findById = (resources, id) => resources.find((r) => r.id === id)

export const upsert = (resources, resource) => {
  const index = resources.findIndex((p) => p.id === resource.id)
  if (resource.id && index) {
    resources[index] = resource
  } else {
    resources.push(resource)
  }
}
