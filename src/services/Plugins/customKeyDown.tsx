import {$createTextNode, $getSelection, COMMAND_PRIORITY_HIGH, KEY_DOWN_COMMAND, ParagraphNode, RangeSelection, TextNode,} from 'lexical';
import React, {useEffect} from 'react';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import {$createMyCheckboxNode, MyCheckBoxNode} from "@/services/Plugins/NewCheckboxNode";
import {$createMyParagraphNode} from "@/services/Plugins/MyParagraphNode";

function ShiftEnterPlugin() {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        return editor.registerCommand<KeyboardEvent>(
            KEY_DOWN_COMMAND,
            (event) => {

                console.log(event, event.ctrlKey, event.key)

                if (event.key === 'Enter' && event.ctrlKey) {
                    handleEnterPress(true);
                } else if (event.key === 'Enter') {
                    handleEnterPress();
                }
                return false;
            },
            COMMAND_PRIORITY_HIGH
        );
    }, [editor]);

    return <></>;
}

const handleEnterPress = (is_ctrl = false) => {

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
                const rightNode = $createTextNode('');


                newParagraphNode.append(rightNode);

                textNodes.forEach((node, index) => {

                    if (index > currentNode) {
                        node.remove();
                        newParagraphNode.append(node);
                    }

                })

                anchorNode.replace(leftNode);
                if (!is_ctrl) {
                    newCheckboxItem.append(newParagraphNode);
                    checklist_node.insertAfter(newCheckboxItem);
                } else {
                    checklist_node.insertAfter(newParagraphNode);
                }

                return true;

            }

            return false;

        } else {
            return false;
        }

    }

    return false;
}

export default React.memo(ShiftEnterPlugin)
