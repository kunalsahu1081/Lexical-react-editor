import '../../styles/toolbar.css'
import {GiCheckMark} from "react-icons/gi";
import {ReactNode, useContext} from "react";
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

interface IToolbarbutton {
    children: ReactNode;
    onPress: () => void;
    isActive?: boolean;
    style?: object;
}

export const ToolbarButton = ({children, onPress, isActive, style}: IToolbarbutton) => {

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

    const theme = useContext(EditorTheme);

    return <>

        <div className={theme.dropdownButtonClassname}>
            {children}
        </div>

    </>

}

export const DropdownList = ({children}) => {

    const theme = useContext(EditorTheme);

    return <>

        <div className={theme.dropdownListClassname}>
            {children}
        </div>

    </>

}

export const DropdownItem = ({children, selected, onClick}) => {

    const theme = useContext(EditorTheme);

    return <>

        <div onClick={onClick} className={theme.dropdownItemClassname}>

            <div style={{height: '10px', width: '20px', fontSize: '10px'}}>
                {selected ? <GiCheckMark/> : null}
            </div>

            {children}

        </div>

    </>

}


export default ToolBar;