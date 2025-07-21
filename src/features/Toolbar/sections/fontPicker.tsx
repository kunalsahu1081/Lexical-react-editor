import React, {useCallback} from "react";
import TB from "@/components/toolbar";
import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {$getSelection, $isRangeSelection} from "lexical";
import {$patchStyleText} from "@lexical/selection";


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



const FontPicker = ({font}) => {

    const [editor] = useLexicalComposerContext();

    const onFontChange = useCallback((event) => {

        const font_name = event?.target?.value;

        editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
                $patchStyleText(selection, {color: 'blue', "font-family": font_name});
            }
        });

    }, [editor])


    return <>

        <TB.dropdown onChange={onFontChange} value={font}>

            {font_list.map((font) => {
                return <>
                    <TB.dItem>{font}</TB.dItem>
                </>
            })}


        </TB.dropdown>

    </>

}

export default React.memo(FontPicker)