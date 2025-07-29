import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import React, {useEffect} from "react";
import {$getSelection, $insertNodes, COMMAND_PRIORITY_HIGH, KEY_ENTER_COMMAND, ParagraphNode, RangeSelection} from "lexical";
import {$createMyParagraphNode} from "@/services/Plugins/MyParagraphNode";
import {$createMyCheckboxNode, MyCheckBoxNode} from "@/services/Plugins/NewCheckboxNode";


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

                        const anchorPoint = selection.focus;

                        console.log(selection);

                        return true;

                        const {node: c_node} = $createMyCheckboxNode();
                        const {node} = $createMyParagraphNode('');
                        c_node.append(node);
                        checklist_node.insertAfter(c_node);

                        event.preventDefault();

                    } else {
                         return true;
                    }

                }

                return true; // prevent default paragraph creation
            },
            COMMAND_PRIORITY_HIGH
        ));
    }, [editor]);


    return <>


    </>

}

export default React.memo(CustomEnterPress)