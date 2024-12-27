import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    // Create a post
    async createPost({ title, slug, content, featuredImage, status = 'active', user_Id }) {
        // Validate required fields before proceeding
        if (!title || !content || !featuredImage || !user_Id) {
            throw new Error("Missing required fields");
        }

        try {
            // Create the document in the database
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug, // Use a unique slug or replace with ID.unique()
                {
                    title,
                    content,
                    featuredImage,
                    status, // Optional field, defaults to 'active'
                    user_Id, // Required field, make sure this matches the schema
                }
            );
        } catch (error) {
            console.error("Service :: createPost :: Error", error);
            throw error;
        }
    }


    // Update a post
    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            );
        } catch (error) {
            console.error("Service :: updatePost :: Error", error);
            throw error;
        }
    }

    // Delete a post
    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
            return true;
        } catch (error) {
            console.error("Service :: deletePost :: Error", error);
            return false;
        }
    }

    // Get a single post
    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
        } catch (error) {
            console.error("Service :: getPost :: Error", error);
            throw error;
        }
    }

    // Get all posts with optional queries
    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            );
        } catch (error) {
            console.error("Service :: getPosts :: Error", error);
            throw error;
        }
    }

    // File upload service
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(), // Generate a unique file ID
                file
            );
        } catch (error) {
            console.error("Service :: uploadFile :: Error", error);
            throw error;
        }
    }

    // Delete a file
    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            );
            return true;
        } catch (error) {
            console.error("Service :: deleteFile :: Error", error);
            return false;
        }
    }

    // Get file preview
    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        );
    }
}

const service = new Service();
export default service;
