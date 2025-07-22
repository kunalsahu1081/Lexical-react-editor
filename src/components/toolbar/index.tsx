import './index.css'

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

        <button onClick={onPress} className={`buttonTB ${isActive ? 'btnActive': ''}`}>

            {children}

        </button>

    </>

}

TB.dropdown = ({children, onChange, value,}) => {

    // eslint-disable-next-line react-hooks/rules-of-hooks


    return <>

        <select value={value} onChange={onChange} className={`tbSelect ${value ? 'selected' : ''}`}>
            {children}
        </select>

    </>

}

TB.dItem = ({children}) => {

    return <>

        <option value={children}>{children}</option>

    </>

}






export default TB;