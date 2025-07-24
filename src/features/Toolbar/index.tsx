import TB from "@/components/toolbar";
import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {FORMAT_TEXT_COMMAND} from 'lexical';
import {useCallback, useEffect, useState} from "react";
import {FaAlignCenter, FaAlignJustify, FaAlignLeft, FaAlignRight, FaStrikethrough, FaUnderline} from "react-icons/fa";
import {useToolbarState} from "@/services/hooks/hkToolbarState";
import FontPicker from "@/features/Toolbar/sections/fontPicker";
import TextColor from "@/features/Toolbar/sections/textColor";
import HighlightText from "@/features/Toolbar/sections/highlightText";
import {applyStylesToParagraph} from "@/utils/editor";
import LineSpacing from "@/features/Toolbar/sections/lineSpacing";
import ParagraphSpacing from "@/features/Toolbar/sections/paragraphSpacing";


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

        applyStylesToParagraph(editor, style);

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

                    <FontPicker sfont={c_toolbar_state.font} />

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

                    <LineSpacing Sspacing={c_toolbar_state.line_height} />

                    <ParagraphSpacing Sspacing={c_toolbar_state.p_spacing} />

                </TB.section>

            </TB.row>

        </TB>

    </>


}

export default Toolbar;