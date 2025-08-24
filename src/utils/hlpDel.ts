import {MyListNode} from "@/services/Plugins/MyListNode";
import {$createParagraphNode, $createTextNode, $getRoot, $setSelection, LexicalNode, ParagraphNode} from "lexical";
import {$createMyParagraphNode} from "@/services/Plugins/MyParagraphNode";
import {$createMyListNodeItem, MyListNodeItem} from "@/services/Plugins/MyListNodeItem";


export const insertSimilarNodeAfter = (deletionNode: LexicalNode) => {

    if (deletionNode.getParent() instanceof MyListNode) {

        if (deletionNode?.getParent()?.getParent() instanceof MyListNode) {

            const {node: cloneNode} = $createMyListNodeItem()

            if (deletionNode.getParent().getChildren().length == 1) {
                insertAndDelete(deletionNode.getParent(), cloneNode, deletionNode.getParent()?.getParent()?.getChildren()[0]);
            } else if (deletionNode.getParent().getChildren().length) {
                insertAndDelete(deletionNode, cloneNode, deletionNode.getParent());
            }

        } else {

            if (deletionNode.getParent().getChildren().length == 1) {
                // remove parent if parent has no children
                insertAndDelete(deletionNode.getParent(), deletionNode.getParent().getParent(), deletionNode.getParent()?.getParent());
            } else {
                insertAndDelete(deletionNode, deletionNode.getParent().getParent(), deletionNode.getParent()?.getParent());
            }

        }

    } else {

        let insertAfter = deletionNode;

        if (deletionNode.getParent() instanceof MyListNodeItem) insertAfter = deletionNode.getParent();

        insertAndDelete(deletionNode, deletionNode.getParent(), insertAfter);

    }

}

const insertAndDelete = (deletionNode: LexicalNode, copyNode: LexicalNode, insertAfter: LexicalNode) => {

    let newNode: LexicalNode;
    const Pnode = $createParagraphNode();
    const Tnode = $createTextNode();

    if (copyNode !== $getRoot() && copyNode?.returnNewSimilar) {
        newNode =  copyNode.returnNewSimilar();
    } else {
        const {node} = $createMyParagraphNode("");
        newNode = node;
    }

    if (newNode instanceof ParagraphNode) {
        newNode.append(Tnode);
    } else if (newNode) {
        newNode.append(Pnode);
        Pnode.append(Tnode);
    }


    if (insertAfter !== $getRoot()) {
        insertAfter.insertAfter(newNode);
    } else {
        $getRoot().append(newNode);
    }

    deletionNode.remove();
    $setSelection(null);
    Tnode.select();

}