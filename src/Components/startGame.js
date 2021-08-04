import React, { useRef } from 'react'
import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { dodajPoene } from "../Redux/counterSlice";
import Continue from "./Countinue";
import './game.css';







function StartGame() {
    const [timer, setTimer] = useState(1)
    const [rijec, setRijec] = useState("");
    const [poeni, setPoeni] = useState(0)
    const [fake, setFake] = useState(0)
    const [refresh, setRefresh] = useState(0)
    const [igraTraje, setIgraTraje] = useState(true)
    let points = useRef([])
    let prilika = useRef(0)
    let pogodeneRijeci = useRef([])
    const timovi = useSelector((state) => state.counter.timovi);
    const duzina = timovi.length
    const timBodovi = useSelector((state) => state.counter.timBodovi)
    const [trenutniTim, setTrenutni] = useState(0)
    const dispatch = useDispatch
    const [newTime, setNewTime] = useState(0)
    const [pobjeda, setPobjeda] = useState(null)
    let a
    useEffect(() => {
        timBodovi.forEach((val) => {
            points.current.push(val)
        })

        fck(0)



    }, [])

    useEffect(() => {
        setTimer(0)
        const inter = setInterval(() => {


            setTimer(prev => {
                setTimer(prev + 1)
                if (prev === 10) {
                    clearInterval(inter);
                    setIgraTraje(false)


                }
            })


        }, 1000)


    }, [newTime])

    useEffect(() => {
        console.log(refresh)
        if (refresh === 0) return;
        const next = (trenutniTim + 1) % duzina
        console.log(next)
        setPoeni(0)
        setIgraTraje(true)
        setNewTime(!newTime)

        if (prilika === 0) {
            if (points.current[trenutniTim] > 10) {
                prilika.current++;
            }
        }
        else prilika.current++;

        console.log(prilika.current + "---" + points.current.length)
        if (prilika.current >= points.current.length) {
            let max = 0
            points.current.forEach((val, index) => {
                if (val > max) {
                    max = val
                    setPobjeda("Pobjedila je ekipa" + timovi[index].tim)
                }
            })
        
           
        
   }
        setTrenutni(next)
        pogodeneRijeci.current = [{}];

    }, [refresh])
    if (pobjeda === null && igraTraje)
    return (
        <div className="igra">

            <motion.div className="igra" animate={igraTraje ? {} : { opacity: "0", zIndex: -1, height: 0 }}>
                <div style={{ color: "black", fontSize:"4rem" }}>{timer}</div>
            <div className="rijec">{ rijec}</div>

            <div className="buttonPointsParent" style={{ display: "flex" }}>
                

                <div className="buttonPreskoci" onClick={() => {
                    fck(-1)
                        setPoeni(poeni - 1)


                   

                    }}>PRESKOCI</div>

                    <div className="buttonTocno" onClick={() => {
                        fck(1)
                        setPoeni(poeni + 1)

                    }} >TOCNO</div>

                {poeni}
                </div>
            </motion.div>

           


        </div>
        );
    else if (pobjeda === null && !igraTraje) {
        return (
            <div className="igra">
            <motion.div animate={igraTraje ? { opacity: "0", zIndex: -1, height: 0, display: "none" } : {}}>
                <Continue resetPoints={(val, index, govno) => {
                        console.log(points.current[trenutniTim])
                        pogodeneRijeci.current[index].pogodak=govno
                        points.current[trenutniTim] += val
                      


                    }} pogodeneRijeci={pogodeneRijeci.current} trenutniTim={trenutniTim}
                        bodovi={() => {
                            let suma = 0
                            
                            pogodeneRijeci.forEach((val) => {
                                suma += val.pogodak;
                            })
                            return suma; }} funkcija={(w) => setRefresh(refresh + 1)} />
                </motion.div>
                </div>
            );
    }

    else return <div>{pobjeda}</div>

    function fck(number) {

        points.current[trenutniTim] += number;
        if (number != 0) {
            console.log(pogodeneRijeci.current[pogodeneRijeci.current.length - 1].pogodak = number);
        }

        axios.get("http://192.168.100.8:5000/rijec").then((response) => {
            if (response.data.success === false)
                alert("greska")
            else {
                setRijec(response.data.rijec);
                pogodeneRijeci.current = [...pogodeneRijeci.current, { rijec: response.data.rijec, pogodak: 0 }]
                console.log(pogodeneRijeci)
            }

        })
       
        
    }
}

export default StartGame