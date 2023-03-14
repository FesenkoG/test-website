import React from "react";
import "../style.css"

export default function Die(props) {
    const style = {
        backgroundColor: props.isHeld ? "#59E391" : "#white"
    }
    return (
        <div style={style} className="die--single" onClick={props.onHold}>
            <h2 className="die-num">{props.value}</h2>
        </div>
    )
}