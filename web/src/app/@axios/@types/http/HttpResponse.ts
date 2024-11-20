export type HttpResponse<T> = {
    httpStatus: string
    statusCode: number
    statusMessage: string
    content: T
    timestamp: string
}