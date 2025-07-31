import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import React, {useEffect} from "react";
import {$createTextNode, $getSelection, COMMAND_PRIORITY_HIGH, KEY_ENTER_COMMAND, ParagraphNode, RangeSelection, TextNode} from "lexical";
import {$createMyCheckboxNode, MyCheckBoxNode} from "@/services/Plugins/NewCheckboxNode";
import {$createMyParagraphNode} from "@/services/Plugins/MyParagraphNode";


const CustomEnterPress = () => {

    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        (editor.registerCommand(
            KEY_ENTER_COMMAND,
            (event) => {

                let is_checklist = false;
                let checklist_node = null

                const selection: RangeSelection = $getSelection() as RangeSelection;
                if (selection?.isCollapsed()) {

                    const currentSelectionNodes = selection.getNodes();

                    currentSelectionNodes.forEach((node) => {

                        const parent = node.getParent();

                        if (parent instanceof ParagraphNode) {

                            const p_parent = parent.getParent();

                            if (p_parent instanceof MyCheckBoxNode) {
                                is_checklist = true;
                                checklist_node = p_parent
                            }

                        } else if (parent instanceof MyCheckBoxNode) {
                            is_checklist = true;
                            checklist_node = parent
                        }

                    })

                    if (is_checklist) {

                        const anchorPoint = selection.anchor;
                        const textNodes = [];
                        const selectionChildren = checklist_node.getChildren();
                        let currentNode = null;

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


                            const leftNode = $createTextNode(textContent.slice(0, splitOffset)).setFormat(format).setStyle(style);
                            const rightNode = $createTextNode(textContent.slice(splitOffset, textContent.length)).setFormat(format).setStyle(style);
                            newParagraphNode.append(rightNode);

                            textNodes.forEach((node, index) => {

                                if (index > currentNode) {
                                    node.remove();
                                    newParagraphNode.append(node);
                                }

                            })

                            anchorNode.replace(leftNode);
                            newCheckboxItem.append(newParagraphNode);
                            checklist_node.insertAfter(newCheckboxItem);
                            rightNode.select();
                            return true;

                        }

                        return false;

                    } else {
                        return false;
                    }

                }
                return false; // prevent default paragraph creation
            },
            COMMAND_PRIORITY_HIGH
        ));
    }, [editor]);


    return <>


    </>

}

export default React.memo(CustomEnterPress)