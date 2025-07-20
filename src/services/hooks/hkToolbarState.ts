import {useEffect, useState} from "react";
import {$getSelection, $isRangeSelection, $isTextNode, LexicalEditor, TextNode} from "lexical";

interface IToolBarState {

    is_bold: boolean,
    is_underline: boolean,
    is_strike: boolean,
    is_italic: boolean,
    color: string,
    font: string,
    align: string,

}

export const useToolbarState = (editor: LexicalEditor) => {

    const [toolbarState, setToolBarState] = useState<IToolBarState>({
        is_bold: false,
        is_underline: false,
        is_strike: false,
        is_italic: false,
        color: "",
        font: "",
        align: "left",
    })


    useEffect(() => {

        return editor.registerUpdateListener(({editorState}) => {
            editorState.read(() => {
                const selection = $getSelection();
                if ($isRangeSelection(selection)) {
                    const anchorNode = selection.anchor.getNode();

                    const textNode = $isTextNode(anchorNode)
                        ? anchorNode
                        : anchorNode.getFirstDescendant();

                    if (textNode instanceof TextNode) {
                        setToolBarState({
                            ...toolbarState,
                            is_bold: textNode.hasFormat('bold'),
                            is_italic: textNode.hasFormat('italic'),
                            is_underline: textNode.hasFormat('underline'),
                            is_strike: textNode.hasFormat("strikethrough")
                        });
                    }
                }
            });
        });

    }, [editor]);


    return toolbarState

}