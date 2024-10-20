export const homeMenuItems = [
  { label: 'HOME.home', link: '/home' },
  { label: 'HOME.about', link: '/about' },
]
export const secondaryItems = [
  { label: 'HOME.privacy_policy', link: '/privacy' },
  { label: 'HOME.terms_of_condition', link: '/terms' },
  { label: 'HOME.faq', link: '/faq' },
]

export type MenuHomeItem = {
  label: string
  link: string
}
