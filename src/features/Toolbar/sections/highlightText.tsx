import {useCallback, useEffect, useState, memo, FunctionComponent} from "react";
import {ToolbarButton} from "@/components/toolbar";
import {HexColorPicker} from "react-colorful";
import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {$getSelection, $isRangeSelection} from "lexical";
import {$patchStyleText} from "@lexical/selection";
import {FaHighlighter} from "react-icons/fa";
import {useToolbarState} from "@/services/hooks/hkToolbarState.js";


const HighlightText = () => {

    const [editor] = useLexicalComposerContext();
    const toolBarState = useToolbarState(editor);

    const [show_color_picker, set_show_color_picker] = useState(false);
    const [color, set_color] = useState('black');

    const onColorChange = useCallback((color) => {

        editor.update(() => {
            const selection = $getSelection();
            set_color(color.toString());

            if ($isRangeSelection(selection)) {
                $patchStyleText(selection, {background: color.toString()});
            }
        });

    }, [editor])

    useEffect(() => {
        set_color(toolBarState.background);
    }, [toolBarState.background]);

    const closeColorPicker = () => {
        set_show_color_picker(false);
    }

    useEffect(() => {
        document.addEventListener('mousedown', closeColorPicker);

        return () => {
            document.removeEventListener('mousedown', closeColorPicker);
        }

    }, []);


    return <>

        <ToolbarButton onPress={() => set_show_color_picker(true)}>

            <FaHighlighter style={{height: '20px'}} color={color || ''}/>

        </ToolbarButton>

        <div
            onMouseDown={(ev) => {
                ev.preventDefault();
                ev.stopPropagation();
            }}
            style={{position: 'fixed', zIndex: 12, top: '140px'}}
        >
            {show_color_picker ? <HexColorPicker
                color={color || 'black'}
                onChange={(color) => {
                    onColorChange(color);
                }}
            /> : null}
        </div>

    </>

}

export default memo(HighlightText as FunctionComponent)