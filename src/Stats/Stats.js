import axios from 'axios';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
const { api } = require('./../Api')



function Stats(props) {

    const Timovi = useSelector((state) => state.counter.timovi)
    const TimoviBodovi = useSelector((state) => state.counter.timBodovi)
    useEffect(() => {
        if (props.word_set !== undefined) {
            let temporaryArray = []
            console.log(props.word_set)
            console.log(props.count_set)
            for (var i = 0; i < props.word_set.length; i++) {
                temporaryArray.push([props.word_set[i][0], props.count_set[i]])
            }

            console.log(api)
            axios.post(api + '/initializeData', {
                data: temporaryArray
            }).then((response) => {
                console.log(response);
            })
        }
    }, [props.rijeci])

    return (
        <div className="stats">
            <div className="h1">REZULTATI</div>

            
                {
                    Timovi.map((val,index) =>
                        <div className="timRezultati">
                            <span style={{fontWeight:"700"}}>{val.tim}</span>
                            <span style={{ fontWeight: "400" }}>Rezultat: { TimoviBodovi[index]}</span>
                        </div>
                        )
                }
            
            <div className="nextRoundParent">
                <div className="nextRound" onClick={()=>props.refresh() }>
                    POKRENI
                </div>
            </div>

        </div>
        );
}


export default Stats;