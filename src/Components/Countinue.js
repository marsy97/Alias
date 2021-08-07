import React, { useEffect, useState, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { dodajPoene } from '../Redux/counterSlice';
import Switch from '@material-ui/core/Switch'
import './game.css';
import Stats from '../Stats/Stats';

//tim={timovi[trenutniTim]} bodovi={timBodovi[trenutniTim]} funkcija={() => setRefresh(!refresh)} 

const colors = [
    "red", "white", "blue"
]

function Continue(props) {

    const [rijeci, setRijeci] = useState([])
    const [suma, setSuma] = useState(0)
    const Timovi = useSelector((state) => state.counter.timBodovi)
    const [back, setBack] = useState(0)
    const [details, setDetails] = useState(0)
    const dispatch = useDispatch()
    useEffect(() => {
       
            let array = [];
        props.rijeci.forEach((val) => {
            array.push(val[1])
        })
        setRijeci(array)
    }, [props.rijeci])
    useEffect(() => {
        if (props.rijeci !== undefined)
            setSuma(rijeci.reduce((sum, val) => sum + val, 0))
      
    }, [rijeci])
    useEffect(() => {
        if (!back) return;
        props.refresh()


    }, [back])

    if (!details)
    return (
        <div className="continue" >
            <div className="h1">IZMJENI ODGOVORE</div>
            <div className="runda">
                <h2>OVA RUNDA</h2>
                <p>{suma} bodova</p>
            </div>

            

            <div className="izmjeniRijeciParent">
            {
                
                    props.rijeci.map((val, wordIndex) =>
                        <div className="izmjeniRijec" style={val[1] === 0 ? { display: "none" } : {}}>
                            <span style={{ color: `${rijeci[wordIndex] === 1 ? "#111" : "red"}` }}> {val[0]}</span>
                            <Switch 
                                checked={rijeci[wordIndex] === 1}
                                onChange={(event) => { change_rijeci(wordIndex, event) }}
                                name="checkedA"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                            />
                        </div>
                        )
               
                }

            </div>

            
            <div className="izmjeniParent">

                <div className="odustani" onClick={() => Update()}>
                    ODUSTANI
                    </div>

                    <div className="izmjeni" onClick={() => Update()}>
                            SPREMI
                    </div>
            </div>

            </div>
        
    );
    
    return (
        <div>
            <Stats word_set={props.rijeci} count_set={rijeci} refresh={() => setBack(1)} />
        </div>
        )


    function Update() {
        dispatch(dodajPoene({ index: props.index, bodovi: suma }))
        setDetails(!details)
    }

    function change_rijeci(index, state) {
        
        let array = [...rijeci];
        array[index] = state.target.checked ? 1 : -1;

        setRijeci(array)
    }


}


export default Continue