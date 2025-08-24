import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {FunctionComponent, memo, useEffect} from "react";
import {COMMAND_PRIORITY_HIGH, INSERT_PARAGRAPH_COMMAND, KEY_ENTER_COMMAND} from "lexical";
import {enterSimilarNodeNext} from "@/utils/hlpEnter";


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

                enterSimilarNodeNext(editor);

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

export default memo(EnterPressPlugin as FunctionComponent)