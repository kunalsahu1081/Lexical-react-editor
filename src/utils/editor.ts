import {$getSelection, $isParagraphNode, $isRangeSelection, $isTextNode} from "lexical";
import {$createMyParagraphNode, $isMyParagraphNode} from "@/services/Plugins/MyParagraphNode";
import {getMappedStyles} from "@/services/hooks/hkToolbarState";


export const applyStylesToParagraph = (editor, style, increaseIndent = false, decreaseIndent = false) => {

    editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {

            const selectedNodes = selection.getNodes();

            const paragraphs = selectedNodes
                .filter((node) => $isParagraphNode(node) && !$isMyParagraphNode(node));

            const mutatedParagraphs = selectedNodes
                .filter((node) => $isMyParagraphNode(node));

            if (!paragraphs.length && !mutatedParagraphs.length) {

                const textNodes = selectedNodes
                    .filter((node) => $isTextNode(node));

                textNodes.forEach((node) => {

                    const parentParagraph = node.getParent();

                    if ($isMyParagraphNode(parentParagraph)) mutatedParagraphs.push(parentParagraph);
                    else paragraphs.push(parentParagraph);

                })

            }

            mutatedParagraphs.forEach((paragraph) => {

                const indentStyle = getIndentStyle(paragraph.__custom_inline_style,  increaseIndent, decreaseIndent);
                paragraph.setParagrphStyle(paragraph.__custom_inline_style + ' ' + style + indentStyle);

            })

            paragraphs.forEach((paragraph) => {

                const indentStyle = getIndentStyle('', increaseIndent, decreaseIndent);

                const {node} = $createMyParagraphNode(style + indentStyle);

                const children = paragraph.getChildren().slice();

                for (const child of children) {
                    node.append(child);
                }

                paragraph.replace(node, true);

            })


        }
    });
}

const getIndentStyle = (current_style = '',  increaseIndent, decreaseIndent) => {

    let indent_style = '';

    const current_style_obj = getMappedStyles(current_style);

    const left_padding = current_style_obj["padding-left"] || '0px';

    if (increaseIndent) {
        indent_style = "padding-left: " + (parseInt(left_padding.replace('px', '')) + 8) + 'px;'
    } else if (decreaseIndent) {
        indent_style = "padding-left: " +  (Math.max(parseInt(left_padding.replace('px', '')) - 8, 0)) + 'px;'
    }

    return indent_style
}