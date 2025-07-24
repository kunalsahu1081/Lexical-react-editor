import React, {useCallback, useEffect, useState} from "react";
import TB from "@/components/toolbar";
import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {$getSelection, $isRangeSelection} from "lexical";
import {$patchStyleText} from "@lexical/selection";


const font_list = [
    "Roboto",
    "Winky Rough",
    "Work Sans",
    "Fira Sans",
    "Bitcount Prop Single",
    "Bitcount Prop Double"
]


const FontPicker = ({sfont}) => {

    const [editor] = useLexicalComposerContext();

    const [show_dropdown, set_show_dropdown] = useState(false);

    const onFontChange = useCallback((event) => {

        const font_name = event;

        set_show_dropdown(false)

        editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
                $patchStyleText(selection, {"font-family": font_name});
            }
        });

    }, [editor])

    const closeColorPicker = (ev) => {
        const element = document.getElementById('fontDropdown');

        if (element.contains(ev.target)) {
            return;
        }

        set_show_dropdown(false);
    }

    useEffect(() => {
        document.addEventListener('mousedown', closeColorPicker);

        return () => {
            document.removeEventListener('mousedown', closeColorPicker);
        }

    }, []);


    return <div id={'fontDropdown'}>

        <TB.dropdown>

            <TB.btn style={{width: '150px'}} onPress={() => {
                set_show_dropdown((prev) => !prev)
            }}>
                <div style={{width: '160px', marginLeft: '8px', textAlign: 'left'}}>{sfont || "Roboto"}</div>
            </TB.btn>

            {show_dropdown ? <TB.dropdownL>
                {font_list.map((font) => {
                    return <>
                        <TB.dItem
                            selected={font === (sfont || "Roboto")}
                            onClick={() => {
                                onFontChange(font)
                            }}
                        >{font}</TB.dItem>
                    </>
                })}
            </TB.dropdownL> : null}


        </TB.dropdown>

    </div>

}

export default React.memo(FontPicker)