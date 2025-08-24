import '../../styles/toolbar.css'
import {GiCheckMark} from "react-icons/gi";
import {useContext} from "react";
import {defaultEditorTheme, EditorTheme} from "@/features/editor/editor";

export const ToolBar = ({children}) => {

    const theme = useContext(EditorTheme);

    return <>

        <div className={theme.toolbarClassName + ' editorToolbar'}>

            {children}

        </div>

    </>


}

export const TSection = ({children}) => {

    return <>

        <div className={'tbSection'}>

            {children}

        </div>

    </>

}

export const TSeparator = () => {

    return <>

        <div className={'separator'}></div>

    </>

}

export const TRow = ({children, }) => {

    return <>

        <div className={'tbRow'}>
            {children}
        </div>

    </>

}

export const ToolbarButton = ({children, onPress, isActive, style}) => {

    const theme = useContext(EditorTheme);

    return <>

        <button
            style={style}
            onClick={onPress}
            className={`${theme.toolbarButton || defaultEditorTheme.toolbarButton} ${isActive ? theme.toolbarButtonActive || defaultEditorTheme.toolbarButtonActive : ''}`}
        >

            {children}

        </button>

    </>

}

export const ToolbarDropdown = ({children}) => {

    return <>

        <div className={'tbDropdown'}>
            {children}
        </div>

    </>

}

export const DropdownList = ({children}) => {

    return <>

        <div className={'tbDropdownList'}>
            {children}
        </div>

    </>

}

export const DropdownItem = ({children, selected, onClick}) => {

    return <>

        <div onClick={onClick} className={'tbDItem'}>

            <div style={{height: '10px', width: '20px', fontSize: '10px'}}>
                {selected ? <GiCheckMark/> : null}
            </div>

            {children}

        </div>

    </>

}


export default ToolBar;