import { ID, storage } from "@/appwrite";

const uploadImage = async (file: File) => {
    if (!file) return;

    const fileUploaded = await storage.createFile(
        "682f807e002409430e04",
        ID.unique(),
        file,
    );

    return fileUploaded;
}

export default uploadImage;