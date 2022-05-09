export interface AttachmentOptions {
    id: string,
    filename: string,
    description?: string,
    content_type?: string,
    size: number,
    url: string,
    proxy_url: string,
    height?: number,
    width?: number,
    emphermeral: boolean
}