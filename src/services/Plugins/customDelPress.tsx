import {useEffect} from "react";
import {$createParagraphNode, $createTextNode, $getSelection, $setSelection, COMMAND_PRIORITY_HIGH, DELETE_CHARACTER_COMMAND, KEY_BACKSPACE_COMMAND, RangeSelection, TextNode} from "lexical";
import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {MyCheckBoxNode} from "@/services/Plugins/NewCheckboxNode";


const BackPressPlugin = () => {

    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        const deregister = editor.registerCommand(DELETE_CHARACTER_COMMAND, (pd) => {

            // prevent deletion
            if (pd?.prevent_deletion) return true;

            // default behavior
            return false;

        }, COMMAND_PRIORITY_HIGH)

        return () => {
            deregister()
        };

    }, [editor]);


    useEffect(() => {
        const deregister = editor.registerCommand(KEY_BACKSPACE_COMMAND, (ev) => {

            const selection = $getSelection() as RangeSelection;
            const anchor = selection.anchor;
            const anchorNode = anchor.getNode();

            if (anchorNode instanceof TextNode) {
                // default behavior text deletion
            } else {

                // if anchorNode has checkbox node
                if (anchorNode instanceof MyCheckBoxNode || anchorNode.getParent() instanceof MyCheckBoxNode) {

                    const node = $createParagraphNode();
                    const textNode = $createTextNode();
                    anchorNode.getParent().insertAfter(node);
                    anchorNode.getParent().remove();
                    $setSelection(null);
                    node.append(textNode);
                    textNode.select();

                    ev.preventDefault();
                    ev.stopPropagation();
                    return true;
                }

            }

            return false;
        }, COMMAND_PRIORITY_HIGH)

        return () => {
            deregister();
        }

    }, [editor]);


    return <></>
}

export default BackPressPlugin;