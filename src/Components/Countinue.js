import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { dodajPoene } from '../Redux/counterSlice';
import './game.css';

//tim={timovi[trenutniTim]} bodovi={timBodovi[trenutniTim]} funkcija={() => setRefresh(!refresh)} 

const colors = [
    "red", "white", "blue"
]

function Continue(props) {



    const value = useSelector((state) => state.counter.timBodovi)
    const dispatch = useDispatch()
    const timovi = useSelector((state) => state.counter.timovi);
    const timBodovi = useSelector((state) => state.counter.timBodovi)
    const [miniRefresh, setRef] = useState(0)
    const [marsel, setMarsel] = useState(props.pogodeneRijeci)

    useEffect(() => {
        console.log("probudi se")
    }, [props.pogodeneRijeci])

    return (
        <div style={{color:"black"}}>
            <div> {timovi[props.trenutniTim].tim}</div>
            {
                props.pogodeneRijeci.map((val, index) =>
                    <div style={val.pogodak === 0 ? { display: "none" } : {}}>
                        <span style={{ backgroundColor: colors[val.pogodak + 1] }}> {val.pogodak}</span>
                        <input id={`${index}`} defaultChecked={funkcija(val.pogodak)} key={index} onChange={(x) => changePoints(x.target.checked, val.pogodak, index)} type="checkbox" />
                    </div>
                   
                    )
            }
            <section> {total_points()}</section>
            <button onClick={()=> props.funkcija(false) }>
                Nastavi
            </button>
            </div>
        
    );

    function changePoints(num, val, index) {
        let number = -1
        if (num == 1) {
            number = 1
        }
       

        props.resetPoints(number, index, number);
        setRef(number + miniRefresh)
    }
    
    function funkcija(val) {
        console.log(val+"---"+typeof val)
        if (val===1) return true;
        return false;
    }

    function total_points() {
        var suma = 0
        props.pogodeneRijeci.forEach((val) => {
            suma += val.pogodak
        })
        return suma;
    }


}


export default Continue