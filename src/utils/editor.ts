import {$getSelection, $isParagraphNode, $isRangeSelection, $isTextNode} from "lexical";
import {$createMyParagraphNode, $isMyParagraphNode} from "@/services/Plugins/MyParagraphNode";


export const applyStylesToParagraph = (editor, style) => {

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

                paragraph.setParagrphStyle(paragraph.__custom_inline_style + ' ' + style);

            })

            paragraphs.forEach((paragraph) => {

                const {node} = $createMyParagraphNode(style);

                const children = paragraph.getChildren().slice();

                for (const child of children) {
                    node.append(child);
                }

                paragraph.replace(node, true);

            })


        }
    });
}