import { Attachment } from "../../src/structures/Attachment";
import { Embed } from "../../src/structures/Embed";
import { ActionRow } from "../../src/structures/ActionRow";
import { Button } from "../../src/structures/Button";
import { SelectMenu } from "../../src/structures/SelectMenu";

export interface SendOption {
    content?: string,
    embeds?: Array<Embed>,
    attachments?: Array<Attachment>,
    components?: Array<ActionRow|Button|SelectMenu>
}