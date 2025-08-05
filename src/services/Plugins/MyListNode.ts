import {$applyNodeReplacement, EditorConfig, ElementNode, LexicalNode, NodeKey} from "lexical";
import {MyCheckBoxNode} from "@/services/Plugins/NewCheckboxNode";


type IOrderedList = "1" | "a" | 'A' | 'I' | 'i';

export class MyListNode extends ElementNode {

    __inline_style: string;
    __is_ordered: boolean;
    __ordered_list_type: IOrderedList;

    static getType(): string {
        return 'my-xx-list-node';
    }

    static clone(node: MyListNode): MyListNode {
        return new MyListNode(node.__inline_style, node.__is_ordered, node.__ordered_list_type, node.__key);
    }


    constructor(inline_style: string, is_ordered: boolean, list_type: IOrderedList = "1", key?: NodeKey) {

        super(key);
        this.__inline_style = inline_style;
        this.__is_ordered = is_ordered;
        this.__ordered_list_type = list_type;

    }

    createDOM(): HTMLElement {
        // Define the DOM element here

        const externalDiv = document.createElement(this.__ordered_list_type ? 'ol' : 'ul');

        externalDiv.style.cssText = this.__inline_style;
        externalDiv.classList.add(this.__is_ordered ? 'orderedList' : 'unOrderedList');
        externalDiv.type = this.__ordered_list_type;
        externalDiv.id = this.__key;

        return externalDiv;
    }

    updateDOM(_prevNode: this, _dom: HTMLElement, _config: EditorConfig): boolean {

        if (_prevNode.__is_ordered !== this.__is_ordered) {
            _dom.classList.add(this.__is_ordered ? 'orderedList' : 'unOrderedList'); // ✅ update when changed
            return true
        }

        if (_prevNode.__ordered_list_type !== this.__ordered_list_type) {
            _dom.type = this.__ordered_list_type;
        }

        return false;
    }

    isInline() {
        return false;
    }

}

export function $createMyListNode(custom_inline_style: string = "", is_ordered: boolean = false): { node: MyListNode, c_key: NodeKey | undefined } {

    const newNode = new MyListNode(custom_inline_style, is_ordered);

    return {node: $applyNodeReplacement(newNode), c_key: newNode.__key}

}

export function $isMyCheckboxNode(node: LexicalNode | null | undefined,
): node is MyCheckBoxNode {
    return node instanceof MyCheckBoxNode;
}