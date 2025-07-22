import React, {useEffect, useState} from "react";
import TB from "@/components/toolbar";
import {MdFormatLineSpacing} from "react-icons/md";


const LineSpacing = ({spacing}) => {

    const [show_spacing_options, set_show_spacing_options] = useState(false);




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


    return <div style={{position: 'relative'}} id={'spacing'} >

        <TB.btn
            onPress={() => {
                set_show_spacing_options(true)
            }}
        >

            <MdFormatLineSpacing/>

        </TB.btn>

        <div style={{position: "absolute", top: 0}} >
            {show_spacing_options ? <TB.dropdown autoFocus={true} onChange={() => {}} style={{opacity: 0}} id={'customSpacing'} value={spacing}>

                <TB.dItem>1</TB.dItem>

                <TB.dItem>2</TB.dItem>

                <TB.dItem>

                    3

                </TB.dItem>

            </TB.dropdown> : null}
        </div>

    </div>

}

export default React.memo(LineSpacing)