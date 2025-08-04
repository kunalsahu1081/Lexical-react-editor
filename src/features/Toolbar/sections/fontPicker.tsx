import React, {useCallback, useEffect, useState} from "react";
import {DropdownItem, DropdownList, ToolbarButton, ToolbarDropdown} from "@/components/toolbar";
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

interface IFontPicker {
    sFont?: string;
}

const FontPicker = ({sFont = "Winky Rough"} : IFontPicker) => {

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

        <ToolbarDropdown>

            <ToolbarButton
                style={{width: '150px'}}
                onPress={() => {
                    set_show_dropdown((prev) => !prev)
                }}
            >
                <div style={{width: '160px', marginLeft: '8px', textAlign: 'left'}}> {sFont || "Roboto"} </div>
            </ToolbarButton>

            {show_dropdown ? <DropdownList>

                {font_list.map((font) => {

                    return <DropdownItem
                        key={font}
                        selected={font === (sFont)}
                        onClick={() => {
                            onFontChange(font)
                        }}
                    >
                        {font}
                    </DropdownItem>

                })}

            </DropdownList> : null}


        </ToolbarDropdown>

    </div>

}

export default React.memo(FontPicker)