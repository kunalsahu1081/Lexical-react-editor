import './index.css'
import {GiCheckMark} from "react-icons/gi";

const TB = ({children}) => {


    return <>

        <div className={'toolbar'}>

            {children}

        </div>

    </>


}

TB.section = ({children}) => {

    return <>

        <div className={'tbSection'}>

            {children}

        </div>

    </>

}

TB.separator = () => {

    return <>

        <div className={'separator'}></div>

    </>

}

TB.row = ({children}) => {

    return <>

        <div className={'tbRow'}>
            {children}
        </div>

    </>

}

TB.btn = ({children, onPress, isActive}) => {


    return <>

        <button onClick={onPress} className={`buttonTB ${isActive ? 'btnActive' : ''}`}>

            {children}

        </button>

    </>

}

TB.dropdown = ({children, onChange, value,}) => {

    return <>

        <div className={'tbDropdown'}>
            {children}
        </div>

    </>

}

TB.dropdownL = ({children, onChange, value,}) => {

    return <>

        <div className={'tbDropdownList'}>
            {children}
        </div>

    </>

}

TB.dItem = ({children, selected, onClick}) => {

    return <>

        <div onClick={onClick} className={'tbDItem'}>

            <div style={{height: '10px', width: '20px', fontSize: '10px'}}>
                {selected ? <GiCheckMark/> : null}
            </div>

            {children}
        </div>

    </>

}


export default TB;