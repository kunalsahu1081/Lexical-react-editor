import {ToolbarButton} from "@/components/toolbar";
import {FaThList} from "react-icons/fa";
import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {$getSelection, $isParagraphNode, $isRangeSelection, $isTextNode, ParagraphNode} from "lexical";
import {$createMyListNode, MyListNode} from "@/services/Plugins/MyListNode";
import {$createMyListNodeItem, MyListNodeItem} from "@/services/Plugins/MyListNodeItem";


const AddUnorderedList = () => {


    const [editor] = useLexicalComposerContext();

    const addList = () => {

        editor.update(() => {

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

                    if (p_node instanceof MyListNode) {

                    } else if (p_node instanceof MyListNodeItem) {

                        const {node: listNode} = $createMyListNode('', true);

                        p_node.insertAfter(listNode);
                        p_node.remove();
                        listNode.append(p_node);
                        node.select();

                    } else {

                        const {node: listNode} = $createMyListNode('', true);
                        const {node: ListItemNode} = $createMyListNodeItem();

                        listNode.append(ListItemNode);
                        node.insertAfter(listNode);
                        node.remove();
                        ListItemNode.append(node);
                        node.select();

                    }

                })

            }

        })

    }


    return <>

        <ToolbarButton onPress={() => addList()}>

            <FaThList/>

        </ToolbarButton>

    </>

}

export default AddUnorderedList;