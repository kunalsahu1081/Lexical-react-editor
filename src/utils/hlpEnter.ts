import {$createMyCheckboxNode, MyCheckBoxNode} from "@/services/Plugins/NewCheckboxNode";
import {$createMyParagraphNode} from "@/services/Plugins/MyParagraphNode";
import {$createTextNode, $getSelection, $setSelection, INSERT_PARAGRAPH_COMMAND, LexicalNode, ParagraphNode, RangeSelection, TextNode} from "lexical";
import {ListItemNode} from "@lexical/list";
import {$createMyListNodeItem, MyListNodeItem} from "@/services/Plugins/MyListNodeItem";

const customNodes: MyCustomNodes[] = [
    MyCheckBoxNode,
    MyListNodeItem,
]

type MyCustomNodes = MyCheckBoxNode | MyListNodeItem;

export const enterSimilarNodeNext = (editor) => {
    const selection: RangeSelection = $getSelection() as RangeSelection;

    if (selection?.isCollapsed()) {

        const currentSelectionNodes = selection.getNodes();

        // check if current selection is checklist node and get node
        const {is_custom_node, node} = checkIfCurrentSelectionCustomNode(currentSelectionNodes);

        if (is_custom_node) {

            // handles enter press on custom nodes
            // create new custom node in new line
            return enterCustomNodeOnEnterPress(selection, node);

        } else {

            // handles enterPress on Empty node or paragraph
            // create new paragraph node in new line
            editor.dispatchCommand(INSERT_PARAGRAPH_COMMAND, {allow_insertion: true})
            return true;

        }

    }
}

export const enterCustomNodeOnEnterPress = (selection: RangeSelection, selected_custom_node: MyCustomNodes): boolean => {
    // cursor position
    const anchorPoint = selection.anchor;

    // list of text nodes in selection
    const textNodes = [];

    // list of all nodes in selection
    const selectionChildren = selected_custom_node.getChildren();

    // node index from textNodes to which anchor point points
    let currentNode = null;

    // divide selection into two section based on anchor point
    // get the current node to which anchor points
    selectionChildren.forEach((node) => {

        if (node instanceof ParagraphNode) {

            node.getChildren().forEach((tnode) => {
                if (tnode instanceof TextNode) {
                    textNodes.push(tnode);
                    if (tnode.getKey() === anchorPoint.getNode().getKey()) currentNode = textNodes.length - 1;
                }
            })

        } else if (node instanceof TextNode) {

            textNodes.push(node);
            if (node.getKey() === anchorPoint.getNode().getKey()) currentNode = textNodes.length - 1;

        }

    })

    if (currentNode !== null) {

        let newCustomNode: MyCustomNodes | null = null;

        if (selected_custom_node instanceof MyCheckBoxNode) {
            const {node} = $createMyCheckboxNode("top: 0.5em;");
            newCustomNode = node;
        } else if (selected_custom_node instanceof MyListNodeItem) {
            const {node} = $createMyListNodeItem();
            newCustomNode = node;
        } else {
            return false;
        }

        const {node: newParagraphNode} = $createMyParagraphNode();
        const anchorNode = textNodes[currentNode];
        const format = anchorNode.getFormat();
        const style = anchorNode.getStyle();
        const textContent = anchorNode.getTextContent();
        const splitOffset = anchorPoint.offset;

        // split the currently anchored node to left and right nodes based on anchor offset
        const leftNode = $createTextNode(textContent.slice(0, splitOffset)).setFormat(format).setStyle(style);
        const rightNode = $createTextNode(textContent.slice(splitOffset, textContent.length)).setFormat(format).setStyle(style);

        // append right node to paragraph
        newParagraphNode.append(rightNode);

        // remove right nodes from the previous checkbox item and add to new one
        textNodes.forEach((node, index) => {
            if (index > currentNode) {
                node.remove();
                newParagraphNode.append(node);
            }
        })

        // append nodes
        anchorNode.replace(leftNode);
        newCustomNode.append(newParagraphNode);
        selected_custom_node.insertAfter(newCustomNode);

        // apply selection
        $setSelection(null);
        rightNode.select();

        return true;

    }

    return false;
}

export const checkIfCurrentSelectionCustomNode = (currentSelectionNodes: LexicalNode[]): { is_custom_node: boolean, node: MyCustomNodes } => {

    for (const node of currentSelectionNodes) {

        const parent = node.getParent();

        if (parent instanceof ParagraphNode) {

            const p_parent = parent.getParent();

            for (const c_node of customNodes) {
                if (p_parent instanceof c_node) {
                    return {is_custom_node: true, node: p_parent as MyCustomNodes};
                }
            }

        } else {
            for (const c_node of customNodes) {
                if (parent instanceof c_node) {
                    return {is_custom_node: true, node: parent as MyCustomNodes};
                }
            }
        }

    }

    return {is_custom_node: false, node: null};
}