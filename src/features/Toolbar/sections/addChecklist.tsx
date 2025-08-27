import {ToolbarButton} from "@/components/toolbar";
import {MdOutlineChecklist} from "react-icons/md";
import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {$getSelection, $isParagraphNode, $isRangeSelection, $isTextNode, ParagraphNode} from "lexical";
import {$createMyCheckboxNode, MyCheckBoxNode} from "@/services/Plugins/NewCheckboxNode";


export const AddChecklist = () => {

    const [editor] = useLexicalComposerContext();

    const onAddRemoveChecklist = () => editor.update(() => {

        const selection = $getSelection();

        if ($isRangeSelection(selection)) {

            const selectedNodes = selection.getNodes();

            const paragraphNodes = selectedNodes
                .filter((node) => $isParagraphNode(node));

            if (!paragraphNodes.length) {

                const textNodes = selectedNodes.filter((node) => $isTextNode(node));

                textNodes.forEach((node) => {
                    const p_node = node.getParent();
                    if (p_node instanceof ParagraphNode) paragraphNodes.push(p_node);
                })

            }

            paragraphNodes.forEach((node) => {

                const p_node = node.getParent();

                if (p_node instanceof MyCheckBoxNode) {

                    node.remove();
                    p_node.insertAfter(node);
                    p_node.remove();
                    node.select();

                } else {

                    const {node: c_node} = $createMyCheckboxNode();
                    node.insertAfter(c_node);
                    node.remove();
                    c_node.append(node);
                    node.select();

                }

            } )

        }

    })


    return <>


        <ToolbarButton onPress={onAddRemoveChecklist}>

            <MdOutlineChecklist/>

        </ToolbarButton>


    </>

}

export default AddChecklist;