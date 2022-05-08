import { SelectMenu } from "../../src/structures/SelectMenu"
import { Button } from "../../src/structures/Button"

export interface ActionRowOptions {
    type: 1,
    components?: Array<SelectMenu | Button>
}