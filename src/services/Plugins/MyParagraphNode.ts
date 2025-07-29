import {$applyNodeReplacement, EditorConfig, LexicalNode, NodeKey, ParagraphNode} from "lexical";


export class MyParagraphNode extends ParagraphNode {

    __custom_inline_style: string;

    static getType(): string {
        return 'my-xx-paragraph-node';
    }

    static clone(node: MyParagraphNode): MyParagraphNode {
        return new MyParagraphNode(node.__custom_inline_style, node.__key);
    }

    constructor(custom_inline_style: string, key?: NodeKey) {

        super(key);
        this.__custom_inline_style = custom_inline_style;

    }

    createDOM(): HTMLElement {
        // Define the DOM element here
        const dom = document.createElement('p');

        dom.id = this.__key;
        dom.style.cssText = this.__custom_inline_style;

        return dom;
    }

    setParagrphStyle(custom_inline_style) {

        const self = this.getWritable();
        self.__custom_inline_style = custom_inline_style;

        return self;

    }

    updateDOM(_prevNode: this, _dom: HTMLElement, _config: EditorConfig): boolean {

        if (_prevNode.__custom_inline_style !== this.__custom_inline_style) {
            _dom.style.cssText = this.__custom_inline_style; // ✅ update when changed
            return true
        }
        return false;
    }

    isInline() {
        return false;
    }

}

export function $createMyParagraphNode(custom_inline_style: string = ""): { node: MyParagraphNode, c_key: NodeKey | undefined } {

    const newNode = new MyParagraphNode(custom_inline_style);

    return {node: $applyNodeReplacement(newNode), c_key: newNode.__key}

}

export function $isMyParagraphNode(node: LexicalNode | null | undefined,
): node is MyParagraphNode {
    return node instanceof MyParagraphNode;
}