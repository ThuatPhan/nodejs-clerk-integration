import prismaClient from './prisma'
import { Inngest } from 'inngest'

export const inngest = new Inngest({ id: 'demo-app' })

const syncUserFromClerk = inngest.createFunction(
  { id: 'sync-user-from-clerk' },
  { event: 'clerk/user.created' },
  async ({ event }) => {
    const { id, email_addresses, first_name, last_name, image_url } = event.data
    await prismaClient.user.create({
      data: {
        id,
        firstName: first_name,
        lastName: last_name,
        email: email_addresses[0]?.email_address,
        imageUrl: image_url
      }
    })
  }
)

// Create an empty array where we'll export future Inngest functions
export const functions = [syncUserFromClerk]
