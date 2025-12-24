import { lazy, type ComponentType, type LazyExoticComponent } from 'react'

export const lazyImport = <M extends Record<string, ComponentType<any>>, K extends keyof M>(
  factory: () => Promise<M>,
  name: K,
  delay?: number
): LazyExoticComponent<M[K]> => lazy(async () => {
  try {
    const [module] = await Promise.all([
      factory(),
      delay ? new Promise((resolve) => setTimeout(resolve, delay)) : Promise.resolve(),
    ])

    return { default: module[name] }
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error(`[lazyImport] Failed to load component: ${String(name)}`, error)
    }

    throw error
  }
})
