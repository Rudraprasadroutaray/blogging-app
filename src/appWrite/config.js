// import conf from '../Conf.js'
// import { Service } from "../appWrite/";
import Conf from "../Conf/Conf";
import { Client,ID,Databases,Storage,Query } from "appwrite";



export class Service{
    client=new Client();
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(Conf.appWriteUrl)
        .setProject(Conf.appWriteProjectID);
        this.databases=new Databases(this.client);
        this.bucket=new Storage(this.client);
    }

    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            return await this.databases.createDocument(
                Conf.appWriteDataBaseId,
                Conf.appWriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
            
        } catch (error) {
            console.log("Appwrite sericve :: createPost :: error",error);
            
        }

    }

    async updatePost(slug,{title,content,featuredImage,status}){


        try {

            return await this.databases.updateDocument(
                Conf.appWriteDataBaseId,
                Conf.appWriteCollectionId,
                slug,{
                    title,
                    content,
                    featuredImage,
                    status
                }
            );
            
        } catch (error) {
            console.log("Appwrite serivce :: updatePost ::error",error);
            
        }


       
    }

    async deletePost(slug){

        try {
           await this.databases.deleteDocument(
            Conf.appWriteDataBaseId,
            Conf.appWriteCollectionId,
            slug



            )
            return true;
            
        } catch (error) {
            console.log("Appwrite service :: deletePost ::error",error);
            return false;
            
        }
    }
    async getPost({slug}){
       try {
        return await this.databases.getDocument(

            Conf.appWriteDataBaseId,
            Conf.appWriteCollectionId,
            slug,
        )
        
       } catch (error) {
        console.log("Appwrite serivce :: createPost ::error",error);
            return false;
        
       }
    }

    async getPosts(queries=[Query.equal("status","active")] ){
        try {
            return await this.databases.listDocuments(
                Conf.appWriteDataBaseId,
                Conf.appWriteCollectionId,

                queries,
               
            )
            
        } catch (error) {
            console.log("Appwrite serivce :: getPost ::error",error);
            return false;
            
        }


    }

    ///File Uploade Service
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                Conf.appWriteBucketId,
                ID.unique(),
                file

            )
            
        } catch (error) {
            console.log("Appwrite serivce :: uploadFile ::error",error);
            return false;
            
        }
    }
    async deleteFile(fieldId){
        try {
            await this.bucket.deleteFile(
                Conf.appWriteBucketId,
                fieldId
            )
            return true
            
        } catch (error) {
            console.log("Appwrite serivce :: deleteFile ::error",error);
            return false;
            
        }

    }
    async getFilePreview(fieldId){
       return this.bucket.getFilePreview(
            Conf.appWriteBucketId,
            fieldId
        )
    }
}

const service=new Service()
export default service;