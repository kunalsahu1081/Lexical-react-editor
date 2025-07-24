import {useEffect, useState} from "react";
import {$getSelection, $isRangeSelection, $isTextNode, LexicalEditor, TextNode} from "lexical";
import {MyParagraphNode} from "@/services/Plugins/MyParagraphNode";
import {isEqual} from 'lodash'

interface IToolBarState {

    is_bold: boolean,
    is_underline: boolean,
    is_strike: boolean,
    is_italic: boolean,
    color: string,
    font: string,
    align: string,
    background: string;
    line_height: string;
    p_spacing: number;

}

export const useToolbarState = (editor: LexicalEditor) => {

    const [toolbarState, setToolBarState] = useState<IToolBarState>({
        is_bold: false,
        is_underline: false,
        is_strike: false,
        is_italic: false,
        color: undefined,
        font: undefined,
        align: "left",
        background: undefined,
        line_height: '1',
        p_spacing: 0,
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

                    const newToolbarState = {
                        is_bold: false,
                        is_underline: false,
                        is_strike: false,
                        is_italic: false,
                        color: "",
                        font: "",
                        align: "left",
                        background: undefined,
                        line_height: '1',
                        p_spacing: 0,
                    };

                    if (textNode instanceof TextNode) {

                        const parentParagraph = textNode.getParent() as MyParagraphNode;

                        if (parentParagraph && parentParagraph instanceof MyParagraphNode) {

                            const styles = parentParagraph.getLatest()?.__custom_inline_style;

                            const mapped_styles = getMappedStyles(styles);

                            newToolbarState.align = mapped_styles["text-align"];
                            newToolbarState.line_height = mapped_styles["line-height"];
                            newToolbarState.p_spacing = mapped_styles["margin-top"].replace('px', '') * 2;

                        }

                        const styles = textNode.getLatest().getStyle();

                        const mapped_styles = getMappedStyles(styles);

                        newToolbarState.is_bold = textNode.hasFormat('bold');
                        newToolbarState.is_italic = textNode.hasFormat('italic');
                        newToolbarState.is_strike = textNode.hasFormat("strikethrough");
                        newToolbarState.is_underline = textNode.hasFormat('underline');
                        newToolbarState.color = mapped_styles?.color;
                        newToolbarState.font = mapped_styles["font-family"];
                        newToolbarState.background = mapped_styles["background"];


                        if (!isEqual(newToolbarState, toolbarState)) {
                            setToolBarState(newToolbarState);
                        }
                    }
                }
            });
        });

    }, [editor, toolbarState]);


    return toolbarState

}

const getMappedStyles = (styles) => {
    const mapped_styles: object = styles
        .split(';')
        .map(rule => rule.trim())
        .filter(rule => rule)
        .reduce((acc, rule) => {
            const [key, value] = rule.split(':').map(s => s.trim());
            acc[key] = value;
            return acc;
        }, {});

    return mapped_styles
}