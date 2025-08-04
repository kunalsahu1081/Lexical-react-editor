import React, {useEffect, useState} from "react";
import TB, {DropdownItem, DropdownList, ToolbarButton, ToolbarDropdown} from "@/components/toolbar";
import {MdFormatLineSpacing} from "react-icons/md";
import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {applyStylesToParagraph} from "@/utils/editor";


const spacingList = [
    1, 1.5, 2, 3
]


const LineSpacing = ({Sspacing = 1.5}) => {

    const [show_spacing_options, set_show_spacing_options] = useState(false);

    const [editor] = useLexicalComposerContext();


    const applyLineSpacing = (spacing) => {

        applyStylesToParagraph(editor, `line-height: ${spacing};`);

    }

    const closeColorPicker = (ev) => {

        const element = document.getElementById('spacing');

        if (element.contains(ev.target)) {
            return;
        }

        set_show_spacing_options(false);
    }

    useEffect(() => {
        document.addEventListener('mousedown', closeColorPicker);

        return () => {
            document.removeEventListener('mousedown', closeColorPicker);
        }

    }, []);


    return <div id={'spacing'}>

        <ToolbarDropdown>

            <ToolbarButton
                onPress={() => {
                    set_show_spacing_options(true)
                }}
            >

                <MdFormatLineSpacing/>

            </ToolbarButton>


            {show_spacing_options ?
                <DropdownList>

                    {
                        spacingList.map((spacing) => {
                            return <DropdownItem onClick={() => applyLineSpacing(spacing)} selected={Sspacing == spacing}>{spacing}</DropdownItem>
                        })
                    }

                </DropdownList>

                : null}

        </ToolbarDropdown>

    </div>

}

export default React.memo(LineSpacing)