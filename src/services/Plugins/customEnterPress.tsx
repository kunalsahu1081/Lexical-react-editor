import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import React, {useEffect} from "react";
import {$getSelection, COMMAND_PRIORITY_HIGH, INSERT_PARAGRAPH_COMMAND, KEY_ENTER_COMMAND, RangeSelection} from "lexical";
import {checkIfCurrentSelectionChecklist, checkIfCurrentSelectionCustomNode, enterCheckboxOnEnterPress, enterCustomNodeOnEnterPress} from "@/utils/hlpEnter";


const EnterPressPlugin = () => {

    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        const deregister = editor.registerCommand(INSERT_PARAGRAPH_COMMAND, (pd) => {

            // if allow insertion in payload allow paragraph creation
            if (pd?.allow_insertion) return false;

            // prevent default paragraph creation
            return true;

        }, COMMAND_PRIORITY_HIGH)

        return () => {
            deregister();
        }

    }, [editor]);

    useEffect(() => {
        const deregister = editor.registerCommand(
            KEY_ENTER_COMMAND,
            (event) => {

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

                return false;
            },
            COMMAND_PRIORITY_HIGH
        );

        return () => {
            deregister();
        }

    }, [editor]);


    return <></>

}

export default React.memo(EnterPressPlugin)