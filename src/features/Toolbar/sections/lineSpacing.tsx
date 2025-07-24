import React, {useEffect, useState} from "react";
import TB from "@/components/toolbar";
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

        console.log(element.contains(ev.target));

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

        <TB.dropdown>

            <TB.btn
                onPress={() => {
                    set_show_spacing_options(true)
                }}
            >

                <MdFormatLineSpacing/>

            </TB.btn>


            {show_spacing_options ?
                <TB.dropdownL>

                    {
                        spacingList.map((spacing) => {
                            return <TB.dItem onClick={() => applyLineSpacing(spacing)} selected={Sspacing == spacing}>{spacing}</TB.dItem>
                        })
                    }

                </TB.dropdownL>

                : null}

        </TB.dropdown>

    </div>

}

export default React.memo(LineSpacing)