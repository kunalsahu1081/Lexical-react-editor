import TB from "@/components/toolbar";
import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {$getSelection, $isParagraphNode, $isRangeSelection, $isTextNode, FORMAT_TEXT_COMMAND} from 'lexical';
import {$patchStyleText} from '@lexical/selection'
import {useCallback, useEffect} from "react";
import {FaStrikethrough, FaUnderline, FaAlignCenter, FaAlignLeft, FaAlignRight, FaAlignJustify   } from "react-icons/fa";
import {$createMyParagraphNode, $isMyParagraphNode} from "@/services/Plugins/MyParagraphNode";
import {useToolbarState} from "@/services/hooks/hkToolbarState";


const font_list = [
    'OVSoge-Black',
    'OVSoge-Bold',
    'OVSoge-Regular',
    'Quicky Nick 3D',
    'Quicky Nick Condensed Straight',
    'Quicky Nick',
    'QuickyNickExpanded',
    'QuickyNickGradient',
    'Gantians'
]


const Toolbar = () => {

    const [editor] = useLexicalComposerContext();

    const toolBarState = useToolbarState(editor);


    const formatText = useCallback((command) => {

        editor.dispatchCommand(FORMAT_TEXT_COMMAND, command)

    }, [editor])


    const onFontChange = useCallback((event) => {

        const font_name = event?.target?.value;

        editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
                $patchStyleText(selection, {color: 'blue', "font-family": font_name});
            }
        });

    }, [editor])

    const applyParagraphStyles = useCallback((style) => {


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

    }, [editor])

    useEffect(() => {
        console.log(toolBarState);
    }, [toolBarState]);


    return <>


        <TB>

            <TB.row>
                <TB.section>

                    <TB.btn isActive={toolBarState.is_bold} onPress={() => formatText('bold')}>
                        B
                    </TB.btn>


                    <TB.btn isActive={toolBarState.is_italic} onPress={() => formatText('italic')}>
                        I
                    </TB.btn>

                    <TB.btn isActive={toolBarState.is_underline} onPress={() => formatText('underline')}>
                        <FaUnderline/>
                    </TB.btn>

                    <TB.btn isActive={toolBarState.is_strike} onPress={() => formatText('strikethrough')}>
                        <FaStrikethrough/>
                    </TB.btn>

                </TB.section>

                <TB.separator/>

                <TB.section>

                    <TB.dropdown onChange={onFontChange}>

                        {font_list.map((font) => {
                            return <>
                                <TB.dItem>{font}</TB.dItem>
                            </>
                        })}


                    </TB.dropdown>

                </TB.section>

                <TB.separator/>

                <TB.section>

                    <TB.btn onPress={() => applyParagraphStyles("text-align: center;")}>
                        <FaAlignCenter />
                    </TB.btn>

                     <TB.btn onPress={() => applyParagraphStyles("text-align: left;")}>
                        <FaAlignLeft />
                    </TB.btn>

                     <TB.btn onPress={() => applyParagraphStyles("text-align: right;")}>
                        <FaAlignRight />
                    </TB.btn>

                     <TB.btn onPress={() => applyParagraphStyles("text-align: justify;")}>
                        <FaAlignJustify />
                    </TB.btn>

                </TB.section>

            </TB.row>

        </TB>

    </>


}

export default Toolbar;