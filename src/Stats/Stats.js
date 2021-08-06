import React from 'react'
import { useSelector } from 'react-redux';


function Stats(props) {

    const Timovi = useSelector((state) => state.counter.timovi)
    const TimoviBodovi = useSelector((state) => state.counter.timBodovi)


    return (
        <div>
            {
                Timovi.map((val,index) =>
                    <div>
                        <span>{val.tim }</span>
                        <span style={{ marginLeft: "1rem" }}>{ TimoviBodovi[index]}</span>
                    </div>
                    )
            }


            <button onClick={()=>props.refresh() }>
                Next Round
            </button>

            </div>
        );
}


export default Stats;