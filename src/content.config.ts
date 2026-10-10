import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

const posts = defineCollection({
  loader: glob({
    pattern: '*.md',
    base: './src/content/posts',
    // 2016-12-18-grails-hibernate5-filter-support.md -> grails-hibernate5-filter-support
    generateId: ({ entry }) => entry.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, ''),
  }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date(),
    categories: z.array(z.string()).default([]),
  }),
})

export const collections = { posts }
