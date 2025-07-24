import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {$getSelection, $isRangeSelection} from "lexical";
import {$patchStyleText} from "@lexical/selection";
import {useEffect, useState} from "react";


const fontControlStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: '24px',
    width: '86px',
    padding: '0 4px',
    borderRadius: '4px',
    fontWeight: 600,
    background: 'white'
}

const separatorStyles = {
    height: '18px',
    minWidth: '1px',
    borderRadius: '12px',
    background: 'black',
    display: 'flex',
    flexShrink: 0,
}

const FontSize = ({Ssize = '12'}) => {

    const [editor] = useLexicalComposerContext();

    const [current_size, set_current_size] = useState(0);

    useEffect(() => {
        set_current_size(parseInt(Ssize));
    }, [Ssize]);

    useEffect(() => {

        updateFontSize(current_size);

    }, [current_size]);

    const updateFontSize = (size) => {

        editor.update(() => {

            const selection = $getSelection();

            if ($isRangeSelection(selection)) {
                $patchStyleText(selection, {"font-size": size.toString() + 'px'});
            }

        })

    }


    return <>

        <div style={fontControlStyles}>

            <div
                onClick={() => {
                    set_current_size((prev) => (Math.max(prev - 1, 1)))
                }}
                style={{marginBottom: '2px', cursor: 'pointer', userSelect: 'none'}}
            >

                -

            </div>

            <div style={separatorStyles}/>

            <div>

                {current_size}

            </div>

            <div style={separatorStyles}/>

            <div
                onClick={() => {
                    set_current_size((prev) => (Math.max(prev + 1, 1)))
                }}
                style={{marginBottom: '2px', cursor: 'pointer', userSelect: 'none'}}
            >

                +

            </div>

        </div>


    </>

}

export default FontSize;