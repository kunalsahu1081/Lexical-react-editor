import TB, {ToolbarButton} from "@/components/toolbar";
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
import FontSize from "@/features/Toolbar/sections/fontSize";
import AddChecklist from "@/features/Toolbar/sections/addChecklist";
import AddUnorderedList from "@/features/Toolbar/sections/addUnorderedList";


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

                    <ToolbarButton isActive={c_toolbar_state.is_bold} onPress={() => formatText('bold')}>
                        B
                    </ToolbarButton>


                    <ToolbarButton isActive={c_toolbar_state.is_italic} onPress={() => formatText('italic')}>
                        I
                    </ToolbarButton>

                    <ToolbarButton isActive={c_toolbar_state.is_underline} onPress={() => formatText('underline')}>
                        <FaUnderline/>
                    </ToolbarButton>

                    <ToolbarButton isActive={c_toolbar_state.is_strike} onPress={() => formatText('strikethrough')}>
                        <FaStrikethrough/>
                    </ToolbarButton>

                </TB.section>

                <TB.separator/>

                <TB.section>

                    <FontPicker sFont={c_toolbar_state.font} />

                </TB.section>

                <TB.separator/>

                <TB.section>

                    <ToolbarButton isActive={c_toolbar_state.align === 'center'} onPress={() => applyParagraphStyles("text-align: center;")}>
                        <FaAlignCenter/>
                    </ToolbarButton>

                    <ToolbarButton isActive={c_toolbar_state.align === 'left'} onPress={() => applyParagraphStyles("text-align: left;")}>
                        <FaAlignLeft/>
                    </ToolbarButton>

                    <ToolbarButton isActive={c_toolbar_state.align === 'right'} onPress={() => applyParagraphStyles("text-align: right;")}>
                        <FaAlignRight/>
                    </ToolbarButton>

                    <ToolbarButton isActive={c_toolbar_state.align === 'justify'} onPress={() => applyParagraphStyles("text-align: justify;")}>
                        <FaAlignJustify/>
                    </ToolbarButton>

                </TB.section>

            </TB.row>

            <TB.row>

                <TB.section>

                    <TextColor color={c_toolbar_state.color} changeColorState={set_c_toolbar_state} />

                    <HighlightText color={c_toolbar_state.background} changeColorState={set_c_toolbar_state} />

                    <LineSpacing Sspacing={c_toolbar_state.line_height} />

                    <ParagraphSpacing Sspacing={c_toolbar_state.p_spacing} />

                </TB.section>

                <TB.separator/>

                <TB.section>

                    <FontSize Ssize={c_toolbar_state.size} />

                </TB.section>

                 <TB.separator/>

                <TB.section>

                    <AddChecklist />

                    <AddUnorderedList />

                </TB.section>

            </TB.row>

        </TB>

    </>


}

export default Toolbar;