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

TB.btn = ({children, onPress}) => {


    return <>

        <button onClick={onPress} className={'buttonTB'}>

            {children}

        </button>

    </>


}


export default TB;