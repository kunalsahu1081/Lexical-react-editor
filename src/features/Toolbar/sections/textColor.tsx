import {useCallback, useEffect, useState, memo, FunctionComponent} from "react";
import {$getSelection, $isRangeSelection} from "lexical";
import {$patchStyleText} from "@lexical/selection";
import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {ToolbarButton} from "@/components/toolbar";
import {MdFormatColorText} from "react-icons/md";
import {HexColorPicker} from "react-colorful";
import {useToolbarState} from "@/services/hooks/hkToolbarState.js";


const TextColor = () => {

    const [editor] = useLexicalComposerContext();
    const toolBarState = useToolbarState(editor);

    const [show_color_picker, set_show_color_picker] = useState(false);
    const [color, set_color] = useState('black');

    const onColorChange = useCallback((color) => {

        editor.update(() => {
            const selection = $getSelection();
            set_color(color.toString());

            if ($isRangeSelection(selection)) {
                $patchStyleText(selection, {color: color.toString()});
            }
        });

    }, [editor])

    useEffect(() => {
        set_color(toolBarState.color);
    }, [toolBarState.color]);


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

            <MdFormatColorText style={{height: '20px'}} color={color || ''}/>

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

export default memo(TextColor as FunctionComponent);