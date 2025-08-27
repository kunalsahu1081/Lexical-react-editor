import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {ToolbarButton} from "@/components/toolbar";
import {MdFormatIndentIncrease} from "react-icons/md";
import {applyStylesToParagraph} from "@/utils/editor";


export const AddIndent = () => {

    const [editor] = useLexicalComposerContext();

    const increaseIndent = () => {
        applyStylesToParagraph(editor, '', true, false);
    }

    return <>

        <ToolbarButton onPress={increaseIndent}>
            <MdFormatIndentIncrease   />
        </ToolbarButton>

    </>
}

export default AddIndent;

