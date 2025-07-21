import TB from "@/components/toolbar";
import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {$getSelection, $isParagraphNode, $isRangeSelection, $isTextNode, FORMAT_TEXT_COMMAND} from 'lexical';
import {$patchStyleText} from '@lexical/selection'
import {useCallback, useEffect, useState} from "react";
import {FaStrikethrough, FaUnderline, FaAlignCenter, FaAlignLeft, FaAlignRight, FaAlignJustify} from "react-icons/fa";
import {MdFormatColorText} from "react-icons/md";
import {$createMyParagraphNode, $isMyParagraphNode} from "@/services/Plugins/MyParagraphNode";
import {useToolbarState} from "@/services/hooks/hkToolbarState";
import {HexColorPicker} from "react-colorful";


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

    const [c_toolbar_state, set_c_toolbar_state] = useState(toolBarState);

    const [show_color_picker, set_show_color_picker] = useState(false);


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

    const onFontChange = useCallback((event) => {

        const font_name = event?.target?.value;

        editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
                $patchStyleText(selection, {color: 'blue', "font-family": font_name});
            }
        });

    }, [editor])

    const onColorChange = useCallback((color) => {

        editor.update(() => {
            const selection = $getSelection();

            console.log(color, selection)

            if ($isRangeSelection(selection)) {
                $patchStyleText(selection, {color: color.toString()});
            }
        });

    }, [editor])

    const closeColorPicker = () => {
        console.log('why is it not getting triggered')
        set_show_color_picker(false);
    }

    useEffect(() => {
        document.addEventListener('mousedown', closeColorPicker);

        return () => {
            document.removeEventListener('mousedown', closeColorPicker);
        }

    }, []);

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

                    <TB.dropdown onChange={onFontChange} value={c_toolbar_state.font}>

                        {font_list.map((font) => {
                            return <>
                                <TB.dItem>{font}</TB.dItem>
                            </>
                        })}


                    </TB.dropdown>

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

                    <TB.btn onPress={() => set_show_color_picker(true)}>
                        <MdFormatColorText color={c_toolbar_state.color || ''}/>

                    </TB.btn>

                    <div
                        onClick={(ev) => {
                            ev.preventDefault();
                            ev.stopPropagation();
                        }}
                        style={{position: 'fixed', zIndex: 12, top: '140px'}}
                    >
                        {show_color_picker ? <HexColorPicker
                            color={c_toolbar_state.color || 'black'}
                            onChange={(color) => {
                                set_c_toolbar_state((prev) => ({...prev, color: color}));
                                onColorChange(color);
                            }}
                        /> : null}
                    </div>

                </TB.section>

            </TB.row>

        </TB>

    </>


}

export default Toolbar;