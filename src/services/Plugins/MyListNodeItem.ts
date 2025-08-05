import {$applyNodeReplacement, EditorConfig, ElementNode, NodeKey} from "lexical";


export class MyListNodeItem extends ElementNode {

    static getType(): string {
        return 'my-xx-list-node-item';
    }

    static clone(node: MyListNodeItem): MyListNodeItem {
        return new MyListNodeItem(node.__key);
    }

    constructor(key?: NodeKey) {
        super(key);
    }

    createDOM(): HTMLElement {
        // Define the DOM element here

        const externalDiv = document.createElement('li');
        externalDiv.id = this.__key;

        return externalDiv;
    }

    updateDOM(_prevNode: unknown, _dom: HTMLElement, _config: EditorConfig): boolean {
        return false;
    }

    isInline() {
        return false;
    }

}

export function $createMyListNodeItem(): { node: MyListNodeItem, c_key: NodeKey | undefined } {

    const newNode = new MyListNodeItem();

    return {node: $applyNodeReplacement(newNode), c_key: newNode.__key}

}

