// import { fileTypesFilter, File } from "..";
// import { Request } from "express";
// import { ALLOWED_MIME_TYPES, ALLOWED_PHOTO_MIME_TYPES, MAX_FILE_COUNT, MAX_FILE_SIZE } from "..";
// import { AnyFilesInterceptor, FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
// import { NestInterceptor, Type } from "@nestjs/common";

// interface FileField {
//   name: string;
//   maxCount: number;
// }

// export function fileInterceptor(fieldName: string, maxSize = MAX_FILE_SIZE, mimeType = ALLOWED_PHOTO_MIME_TYPES): Type<NestInterceptor> {
//   return FileInterceptor(fieldName, {
//     fileFilter(req: Request, file: File, callback: (error: Error | null, acceptFile: boolean) => void): void {
//       fileTypesFilter(file, mimeType, callback);
//     },
//     limits: {
//       fileSize: maxSize,
//     },
//   });
// }

// export function filesInterceptor(fieldName: string, maxCount = MAX_FILE_COUNT, maxSize = MAX_FILE_SIZE): Type<NestInterceptor> {
//   return FilesInterceptor(fieldName, maxCount, {
//     fileFilter(req: Request, file: File, callback: (error: Error | null, acceptFile: boolean) => void): void {
//       fileTypesFilter(file, ALLOWED_MIME_TYPES, callback);
//     },
//     limits: {
//       fileSize: maxSize,
//     },
//   });
// }

// export function anyFilesInterceptor(maxCount = MAX_FILE_COUNT, maxSize = MAX_FILE_SIZE): Type<NestInterceptor> {
//   return AnyFilesInterceptor({
//     fileFilter(req: Request, file: File, callback: (error: Error | null, acceptFile: boolean) => void): void {
//       fileTypesFilter(file, ALLOWED_PHOTO_MIME_TYPES, callback);
//     },
//     limits: {
//       files: maxCount,
//       fileSize: maxSize,
//     },
//   });
// }

// export function fileFieldsInterceptor(fields: FileField[], maxSize = MAX_FILE_SIZE, mimeType = ALLOWED_PHOTO_MIME_TYPES): Type<NestInterceptor> {
//   return FileFieldsInterceptor(fields, {
//     fileFilter(req: Request, file: File, callback: (error: Error | null, acceptFile: boolean) => void) {
//       fileTypesFilter(file, mimeType, callback);
//     },
//     limits: {
//       fileSize: maxSize,
//     },
//   });
// }
