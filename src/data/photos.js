// Gallery entries are generated from src/assets/photography — drop a file in and it shows up.
// Add a matching key below to give it a proper title/category, otherwise it falls back to "Moments".
const metadata = {
  'bird-perched.jpg': { title: 'Stillness', category: 'Nature' },
  'bird-in-flight.jpg': { title: 'Take Off', category: 'Nature' },
  'waterfall.jpg': { title: 'Falling Water', category: 'Nature' },
  'waterfront.jpg': { title: 'Waterfront', category: 'Nature' },
  'church.jpg': { title: 'Nave', category: 'Architecture' },
  'mosque.jpg': { title: 'Minaret', category: 'Architecture' },
  'frame-01.jpg': { title: 'Framed', category: 'Architecture' },
  'junction.jpg': { title: 'Junction', category: 'Street' },
  'light-trails.jpg': { title: 'Light Trails', category: 'Street' },
  'night-street.jpg': { title: 'After Dark', category: 'Street' },
  'toys.jpg': { title: 'Small Things', category: 'Street' },
  'portrait-studio.jpg': { title: 'Studio', category: 'Portrait' },
  'gym-01.jpg': { title: 'Iron I', category: 'Portrait' },
  'gym-02.jpg': { title: 'Iron II', category: 'Portrait' },
  'gym-03.jpg': { title: 'Iron III', category: 'Portrait' },
}

const modules = import.meta.glob('../assets/photography/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
})

const toTitle = (fileName) =>
  fileName
    .replace(/\.[^.]+$/, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())

export const photos = Object.entries(modules)
  .map(([path, src]) => {
    const fileName = path.split('/').pop()
    const meta = metadata[fileName] ?? {}

    return {
      id: fileName,
      src,
      title: meta.title ?? toTitle(fileName),
      category: meta.category ?? 'Moments',
    }
  })
  .sort((a, b) => a.category.localeCompare(b.category) || a.title.localeCompare(b.title))

const categoryOrder = ['Nature', 'Architecture', 'Street', 'Portrait', 'Moments']

export const photoCategories = [
  'All',
  ...categoryOrder.filter((category) => photos.some((photo) => photo.category === category)),
]
