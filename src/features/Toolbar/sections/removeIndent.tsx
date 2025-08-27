import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {ToolbarButton} from "@/components/toolbar";
import {MdOutlineFormatIndentDecrease} from "react-icons/md";
import {applyStylesToParagraph} from "@/utils/editor";


export const RemoveIndent = () => {

    const [editor] = useLexicalComposerContext();

    const increaseIndent = () => {
        applyStylesToParagraph(editor, '', false, true);
    }

    return <>

        <ToolbarButton onPress={increaseIndent}>
            <MdOutlineFormatIndentDecrease   />
        </ToolbarButton>

    </>
}

export default RemoveIndent;