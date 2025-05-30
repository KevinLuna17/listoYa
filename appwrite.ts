import { Client, ID, Databases, Storage } from 'appwrite';

const client = new Client()
client
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)

const databases = new Databases(client)
const storage = new Storage(client)

export { client, databases, storage, ID };