import React, { useRef } from 'react'
import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { dodajPoene, dodajTimove } from "../Redux/counterSlice";
import Continue from "./Countinue";
import './game.css';







function StartGame() {
    //funkcije
    const dispatch = useDispatch()
    const history = useHistory()

    //refs
    const poeni = useRef(0)
    const tryOuts = useRef(null)
    const firstWinner = useRef(null)
    const rijec = useRef([])
    const TrenutniTim = useRef(0)
    const AktivniBodovi = useRef(0)

    //redux
   
    const allTeams = useSelector((state) => state.counter.timBodovi);
    const SviTimovi = useSelector((state) => state.counter.timovi);
    const allWords = useSelector((state) => state.counter.words);


    //hooks
    const [refresh, setRefresh] = useState(0)
    const [pobjeda, setPobjeda] = useState(null)
    const [timer, setTimer] = useState(1)
    const [igraTraje, setIgraTraje] = useState(true)


    useEffect(() => {
        is_there_a_winner();
        setIgraTraje(true)
        setTimer(0)
        AktivniBodovi.current = 0;
        rijec.current = [];
        add_word();

        const inter = setInterval(() => {


            setTimer(prev => {

                if (prev === 10) {
                    clearInterval(inter);
                    setIgraTraje(false)
                }
                else setTimer(prev + 1)

            })

        }, 1000)
    }, [refresh])


    if (pobjeda === null && igraTraje)
        return (
            <div className="igra">

                <motion.div className="igra" animate={igraTraje ? {} : { opacity: "0", zIndex: -1, height: 0 }}>
                    <div style={{ color: "black", fontSize: "4rem" }}>{timer}</div>
                    <div className="rijec">{rijec.current[rijec.current.length - 1]} </div>

                    <h2 style={{ color: "black" }}>    {AktivniBodovi.current}</h2>
                    <div className="buttonPointsParent" style={{ display: "flex" }}>


                        <div className="buttonPreskoci" onClick={() => {
                            rijec.current[rijec.current.length - 1][1] = -1
                            add_word()
                        }}>PRESKOCI</div>

                        <div className="buttonTocno" onClick={() => {
                            rijec.current[rijec.current.length - 1][1] = 1
                            add_word()
                        }} >TOCNO</div>


                    </div>
                </motion.div>




            </div>
        );
    else if (pobjeda === null && !igraTraje) {
        return (
            <div className="igra">
                <motion.div animate={igraTraje ? { opacity: "0", zIndex: -1, height: 0, display: "none" } : {}}>
                    <Continue
                        index={TrenutniTim.current}
                        refresh={() => {
                            TrenutniTim.current = (TrenutniTim.current + 1) % SviTimovi.length
                            setRefresh(!refresh)
                        }}
                        rijeci={rijec.current}
                    />
                </motion.div>
            </div>
        );
    }

    else return <div>Pobjednik je: {pobjeda.tim}</div>

    function add_word() {
        const numWords = allWords.length
        const randWord = Math.floor(Math.random() * numWords);
        console.log(randWord)

        rijec.current = [...rijec.current, [allWords[randWord],0]];
        
    }






    function is_there_a_winner() {
        const indexOdigraneEkipe = (TrenutniTim.current + SviTimovi.length - 1) % SviTimovi.length;

        let stanjeTablice = new Array(allTeams.length).fill(0)
        if (tryOuts.current === null) {
            if (allTeams[indexOdigraneEkipe] > 10) {
                firstWinner.current = indexOdigraneEkipe
                tryOuts.current = new Array(SviTimovi.length).fill(0)
                tryOuts.current[indexOdigraneEkipe] = 1;
            }
        }
        else {
            if (TrenutniTim.current === 0) {
                const nextRound = new Array()
                const max = Math.max(...allTeams);
                console.log(max)
                allTeams.forEach((val, index) => {
                    if (val >= max) {
                        nextRound.push(SviTimovi[index])
                    }
                })
                console.log(nextRound)
                if (nextRound.length === 1) {
                    setPobjeda(SviTimovi[firstWinner.current])
                } else if (nextRound.length > 1) {
                   

                    dispatch(dodajTimove(nextRound))
                    history.push('/startGame');

                }
            }
        }
    }


}
export default StartGame


/*
 logic
  console.log(SviTimovi[TrenutniTim.current])
            TrenutniTim.current = (TrenutniTim.current + 1) % SviTimovi.length
 */