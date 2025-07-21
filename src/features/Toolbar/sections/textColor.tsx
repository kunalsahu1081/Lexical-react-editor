import React, {useCallback, useEffect, useState} from "react";
import {$getSelection, $isRangeSelection} from "lexical";
import {$patchStyleText} from "@lexical/selection";
import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import TB from "@/components/toolbar";
import {MdFormatColorText} from "react-icons/md";
import {HexColorPicker} from "react-colorful";


const TextColor = ({color, changeColorState}) => {

    const [editor] = useLexicalComposerContext();

    const [show_color_picker, set_show_color_picker] = useState(false);

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
        set_show_color_picker(false);
    }

    useEffect(() => {
        document.addEventListener('mousedown', closeColorPicker);

        return () => {
            document.removeEventListener('mousedown', closeColorPicker);
        }

    }, []);


    return <>

        <TB.btn onPress={() => set_show_color_picker(true)}>
            <MdFormatColorText style={{height: '20px'}} color={color || ''}/>

        </TB.btn>

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
                    changeColorState((prev) => ({...prev, color: color}));
                    onColorChange(color);
                }}
            /> : null}
        </div>


    </>

}

export default React.memo(TextColor)