import {$applyNodeReplacement, EditorConfig, LexicalNode, NodeKey, ParagraphNode} from "lexical";


export class MyParagraphNode extends ParagraphNode {

    __custom_inline_style: string;
    __is_checklist: boolean;

    static getType(): string {
        return 'my-xx-paragraph-node';
    }

    static clone(node: MyParagraphNode): MyParagraphNode {
        return new MyParagraphNode(node.__custom_inline_style, node.__is_checklist, node.__key);
    }

    constructor(custom_inline_style: string, is_checklist: boolean, key?: NodeKey) {

        super(key);
        this.__custom_inline_style = custom_inline_style;
        this.__is_checklist = is_checklist

    }

    createDOM(): HTMLElement {
        // Define the DOM element here

        const externalDiv =  document.createElement('div');

        if (this.__is_checklist) {

            const inputElement =  document.createElement('input');
            inputElement.type = 'checkbox';
            inputElement.checked = true;
            inputElement.style = "margin-right: 8px; height: 100%; position: relative; top: 2px"

            externalDiv.append(inputElement);

        }

        externalDiv.style.cssText = "display: flex; flex-direction: row;" + this.__custom_inline_style;
        // dom.append(document.createElement('p'))

        externalDiv.id = this.__key;
        // externalDiv.style.cssText = this.__custom_inline_style;

        return externalDiv;
    }

    setParagrphStyle(custom_inline_style) {

        const self = this.getWritable();
        self.__custom_inline_style = custom_inline_style;

        return self;

    }

    makeParagraphChecklist() {

        const self = this.getWritable();
        self.__is_checklist = !self.__is_checklist;

        return self;

    }

    updateDOM(_prevNode: this, _dom: HTMLElement, _config: EditorConfig): boolean {

        if (_prevNode.__custom_inline_style !== this.__custom_inline_style) {
            _dom.style.cssText = this.__custom_inline_style; // ✅ update when changed
            return true
        }

        if (_prevNode.__is_checklist !== this.__is_checklist) {

            return true
        }

        return false;
    }

    isInline() {
        return false;
    }

}

export function $createMyParagraphNode(custom_inline_style: string = "", is_checklist: boolean = false): { node: MyParagraphNode, c_key: NodeKey | undefined } {

    const newNode = new MyParagraphNode(custom_inline_style, is_checklist);

    return {node: $applyNodeReplacement(newNode), c_key: newNode.__key}

}

export function $isMyParagraphNode(node: LexicalNode | null | undefined,
): node is MyParagraphNode {
    return node instanceof MyParagraphNode;
}