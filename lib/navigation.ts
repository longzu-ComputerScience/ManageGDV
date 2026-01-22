export async function navigateWithProgress(router: any, path: string) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('gdv-navigation-start'))
  }

  try {
    await router.push(path)
  } finally {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('gdv-navigation-end'))
    }
  }
}
