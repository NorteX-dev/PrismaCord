import { ActionRowOptions } from "../../lib/interfaces/ActionRowOption";
import { Button } from "./Button";
import { SelectMenu } from "./SelectMenu";

export class ActionRow {
    type: 1;
    components: Array<Button | SelectMenu>

    constructor(options: ActionRowOptions) {
        this.type = options.type;

        this.components = [];
    }
    public addComponent(interaction) {
        this.components.push(interaction);
    }

    public toJSON() {
        return {
            type: this.type,
            components: this.components
        }
    }
}