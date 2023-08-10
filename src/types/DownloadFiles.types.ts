export interface IDownloadFilesResponse {
  fileContents: string
  contentType: string
  fileDownloadName: string
  lastModified: any
  entityTag: any
  enableRangeProcessing: boolean
}
