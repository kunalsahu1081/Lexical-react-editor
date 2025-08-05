import {ToolbarButton} from "@/components/toolbar";
import {FaThList} from "react-icons/fa";
import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {$createListItemNode, $createListNode} from "@lexical/list";
import {$getRoot} from "lexical";
import {$createMyListNode} from "@/services/Plugins/MyListNode";
import {$createMyListNodeItem} from "@/services/Plugins/MyListNodeItem";


const AddUnorderedList = () => {


    const [editor] = useLexicalComposerContext();


    // useEffect(() => {
    //
    //     const deregister = editor.registerCommand(INSERT_UNORDERED_LIST_COMMAND, () => {
    //
    //         const listNode = $createListNode('bullet');
    //         const ListItemNode = $createListItemNode(false);
    //
    //         listNode.append(ListItemNode);
    //
    //         $getRoot().append(listNode);
    //
    //         return true;
    //     }, COMMAND_PRIORITY_HIGH);
    //
    //     return () => {
    //         deregister();
    //     }
    //
    // }, [editor]);


    const addList = () => {

        editor.update(() => {

            const {node: listNode} = $createMyListNode('', true);
            const {node: ListItemNode} = $createMyListNodeItem();

            listNode.append(ListItemNode);
            $getRoot().append(listNode);

        })

    }


    return <>

        <ToolbarButton onPress={() => addList()}>

            <FaThList/>

        </ToolbarButton>

    </>

}

export default AddUnorderedList;