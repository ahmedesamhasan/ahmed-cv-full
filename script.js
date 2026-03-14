const openButton = document.getElementById('openButton')
const closeButton = document.getElementById('closeButton')
const pageContainer = document.getElementById('pageContainer')
const navLinks = document.querySelectorAll('.nav-link')
const pageSections = document.querySelectorAll('main[id], section[id]')

function updateNavigationState(isOpen) {
  pageContainer.classList.toggle('show-nav', isOpen)
  openButton.setAttribute('aria-expanded', String(isOpen))
}

function setActiveLink(sectionId) {
  navLinks.forEach((link) => {
    const isActive = link.getAttribute('href') === `#${sectionId}`
    link.classList.toggle('active', isActive)
    link.setAttribute('aria-current', isActive ? 'page' : 'false')
  })
}

openButton.addEventListener('click', () => {
  updateNavigationState(true)
})

closeButton.addEventListener('click', () => {
  updateNavigationState(false)
})

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    updateNavigationState(false)
  })
})

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    updateNavigationState(false)
  }
})

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActiveLink(entry.target.id)
      }
    })
  },
  { threshold: 0.45 }
)

pageSections.forEach((section) => {
  sectionObserver.observe(section)
})
