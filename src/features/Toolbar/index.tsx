import TB from "@/components/toolbar";
import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {$getSelection, $isParagraphNode, $isRangeSelection, $isTextNode, FORMAT_TEXT_COMMAND} from 'lexical';
import {useCallback, useEffect, useState} from "react";
import {FaAlignCenter, FaAlignJustify, FaAlignLeft, FaAlignRight, FaStrikethrough, FaUnderline} from "react-icons/fa";
import {$createMyParagraphNode, $isMyParagraphNode} from "@/services/Plugins/MyParagraphNode";
import {useToolbarState} from "@/services/hooks/hkToolbarState";
import FontPicker from "@/features/Toolbar/sections/fontPicker";
import TextColor from "@/features/Toolbar/sections/textColor";
import HighlightText from "@/features/Toolbar/sections/highlightText";


const Toolbar = () => {

    const [editor] = useLexicalComposerContext();

    const toolBarState = useToolbarState(editor);

    const [c_toolbar_state, set_c_toolbar_state] = useState(toolBarState);


    useEffect(() => {
        set_c_toolbar_state(toolBarState);
    }, [toolBarState]);

    const formatText = useCallback((command) => {

        editor.update(() => {

            if (command === 'bold') set_c_toolbar_state((prev) => ({...c_toolbar_state, is_bold: !prev.is_bold}));
            if (command === 'underline') set_c_toolbar_state(prev => ({...c_toolbar_state, is_underline: !prev.is_underline}));
            if (command === 'italic') set_c_toolbar_state(prev => ({...c_toolbar_state, is_italic: !prev.is_italic}));
            if (command === 'strikethrough') set_c_toolbar_state(prev => ({...c_toolbar_state, is_strike: !prev.is_strike}));

            editor.dispatchCommand(FORMAT_TEXT_COMMAND, command);
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


    return <>


        <TB>

            <TB.row>
                <TB.section>

                    <TB.btn isActive={c_toolbar_state.is_bold} onPress={() => formatText('bold')}>
                        B
                    </TB.btn>


                    <TB.btn isActive={c_toolbar_state.is_italic} onPress={() => formatText('italic')}>
                        I
                    </TB.btn>

                    <TB.btn isActive={c_toolbar_state.is_underline} onPress={() => formatText('underline')}>
                        <FaUnderline/>
                    </TB.btn>

                    <TB.btn isActive={c_toolbar_state.is_strike} onPress={() => formatText('strikethrough')}>
                        <FaStrikethrough/>
                    </TB.btn>

                </TB.section>

                <TB.separator/>

                <TB.section>

                    <FontPicker font={c_toolbar_state.font} />

                </TB.section>

                <TB.separator/>

                <TB.section>

                    <TB.btn isActive={c_toolbar_state.align === 'center'} onPress={() => applyParagraphStyles("text-align: center;")}>
                        <FaAlignCenter/>
                    </TB.btn>

                    <TB.btn isActive={c_toolbar_state.align === 'left'} onPress={() => applyParagraphStyles("text-align: left;")}>
                        <FaAlignLeft/>
                    </TB.btn>

                    <TB.btn isActive={c_toolbar_state.align === 'right'} onPress={() => applyParagraphStyles("text-align: right;")}>
                        <FaAlignRight/>
                    </TB.btn>

                    <TB.btn isActive={c_toolbar_state.align === 'justify'} onPress={() => applyParagraphStyles("text-align: justify;")}>
                        <FaAlignJustify/>
                    </TB.btn>

                </TB.section>

            </TB.row>

            <TB.row>

                <TB.section>

                    <TextColor color={c_toolbar_state.color} changeColorState={set_c_toolbar_state} />

                    <HighlightText color={c_toolbar_state.background} changeColorState={set_c_toolbar_state} />

                </TB.section>

            </TB.row>

        </TB>

    </>


}

export default Toolbar;