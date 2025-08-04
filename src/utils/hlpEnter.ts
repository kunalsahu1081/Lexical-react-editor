import {$createMyCheckboxNode, MyCheckBoxNode} from "@/services/Plugins/NewCheckboxNode";
import {$createMyParagraphNode} from "@/services/Plugins/MyParagraphNode";
import {$createTextNode, $setSelection, ParagraphNode, RangeSelection, TextNode} from "lexical";


export const enterCheckboxOnEnterPress = (selection: RangeSelection, checklist_node) => {
    // cursor position
    const anchorPoint = selection.anchor;

    // list of text nodes in selection
    const textNodes = [];

    // list of all nodes in selection
    const selectionChildren = checklist_node.getChildren();

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

        const {node: newCheckboxItem} = $createMyCheckboxNode("top: 0.5em;");
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
        newCheckboxItem.append(newParagraphNode);
        checklist_node.insertAfter(newCheckboxItem);

        // apply selection
        $setSelection(null);
        rightNode.select();

        return true;

    }

    return false;
}

export const checkIfCurrentSelectionChecklist = (currentSelectionNodes) => {

    for (const node of currentSelectionNodes) {

        const parent = node.getParent();

        if (parent instanceof ParagraphNode) {

            const p_parent = parent.getParent();

            if (p_parent instanceof MyCheckBoxNode) {
                return {is_checklist: true, checklist_node: p_parent};
            }

        } else if (parent instanceof MyCheckBoxNode) {
             return {is_checklist: true, checklist_node: parent};
        }

    }

    return {is_checklist: false, checklist_node: null};
}