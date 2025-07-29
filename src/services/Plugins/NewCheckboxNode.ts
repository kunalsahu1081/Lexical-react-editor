import {$applyNodeReplacement, EditorConfig, ElementNode, LexicalNode, NodeKey, ParagraphNode} from "lexical";
import {getMappedStyles} from "@/services/hooks/hkToolbarState";


export class MyCheckBoxNode extends ElementNode {

    __custom_inline_style: string;
    __is_checked: boolean;

    static getType(): string {
        return 'my-xx-checkbox-node';
    }

    static clone(node: MyCheckBoxNode): MyCheckBoxNode {
        return new MyCheckBoxNode(node.__custom_inline_style, node.__is_checked, node.__key);
    }

    constructor(custom_inline_style: string, is_checklist: boolean, key?: NodeKey) {

        super(key);
        this.__custom_inline_style = custom_inline_style;
        this.__is_checked = false;

    }

    createDOM(): HTMLElement {
        // Define the DOM element here

        const externalDiv = document.createElement('div');

        const inputElement = document.createElement('input');
        inputElement.type = 'checkbox';
        inputElement.checked = this.__is_checked;
        inputElement.style = `margin-right: 8px; height: 100%; position: relative;` + this.__custom_inline_style;
        externalDiv.append(inputElement);

        externalDiv.style.cssText = "display: flex; flex-direction: row;";

        externalDiv.id = this.__key;

        return externalDiv;
    }

    setStyle(custom_inline_style) {

        const self = this.getWritable();
        self.__custom_inline_style = custom_inline_style;

        return self;

    }

    checkCheckbox() {

        const self = this.getWritable();
        self.__is_checked = !self.__is_checked;

        return self;

    }

    updateDOM(_prevNode: this, _dom: HTMLElement, _config: EditorConfig): boolean {

        if (_prevNode.__custom_inline_style !== this.__custom_inline_style) {
            _dom.style.cssText = "display: flex; flex-direction: row;" + this.__custom_inline_style; // ✅ update when changed
            return true
        }

        if (_prevNode.__is_checked !== this.__is_checked) {

            const inputElement = document.createElement('input');
            inputElement.type = 'checkbox';
            inputElement.checked = this.__is_checked;
            inputElement.style = `margin-right: 8px; height: 100%; position: relative;` + this.__custom_inline_style
            _dom.append(inputElement);

            return true
        }

        return false;
    }

    isInline() {
        return false;
    }

}

export function $createMyCheckboxNode(custom_inline_style: string = "", is_checklist: boolean = false): { node: MyCheckBoxNode, c_key: NodeKey | undefined } {

    const newNode = new MyCheckBoxNode(custom_inline_style, is_checklist);

    return {node: $applyNodeReplacement(newNode), c_key: newNode.__key}

}

export function $isMyCheckboxNode(node: LexicalNode | null | undefined,
): node is MyCheckBoxNode {
    return node instanceof MyCheckBoxNode;
}