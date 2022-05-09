import { AttachmentOptions } from "../../lib/interfaces/AttachmentOptions";

export class Attachment {
    id: string;
    filename: string;
    description?: string;
    content_type?: string;
    size: number;
    url: string;
    proxy_url: string;
    height?: number;
    width?: number;
    ephemeral?: boolean;

    constructor(options: AttachmentOptions) {
        this.id = options.id;
        this.filename = options.filename;
        this.description = options.description;
        this.content_type = options.content_type;
        this.size = options.size;
        this.url = options.url;
        this.proxy_url = options.proxy_url;
        this.height = options.height;
        this.width = options.width;
        this.ephemeral = options.emphermeral;
    }

    public toJSON() {
        return {
            id: this.id,
            filename: this.filename,
            description: this.description,
            content_type: this.content_type,
            size: this.size,
            url: this.url,
            proxy_url: this.proxy_url,
            height: this.height,
            width: this.width,
            ephemeral: this.ephemeral,
        }
    }
}