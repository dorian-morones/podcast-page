import slugify from 'slugify'

export const slug = (name) => {
  return slugify(name, {lower: true}).replace(/[^\w\-]+/g, '')
}