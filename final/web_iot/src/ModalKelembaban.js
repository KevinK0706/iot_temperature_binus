import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogTitle
} from '@material-ui/core';


export default function ModalKelembaban(props) {
    const [bottom_limit, setBottomLimit] = useState(0);
    const [top_limit, setTopLimit] = useState(0);

    useEffect(()=>{
        setBottomLimit(props.bottom_limit);
        setTopLimit(props.top_limit);
    },[props.bottom_limit,props.top_limit])
    return (
        <Dialog
            maxWidth="sm"
            fullWidth={true}
            open={props.isShowModal}
        >
            <DialogTitle>
                <div className="d-flex justify-content-between">
                    <h4>Threshold Kelembaban</h4>
                    <div>
                        <button
                            className="btn btn-success " style={{ marginRight: "5px" }}
                            onClick={() => {
                                if (bottom_limit > top_limit) {
                                    return alert("Nilai batas bawah tidak boleh lebih besar dari batas atas!")
                                }
                                props.onSubmit(bottom_limit,top_limit)
                            }}
                        >
                            Submit
                        </button>
                        <div style={{ width: '5px', height: 'auto', display: 'inline-block' }}></div>
                        <button
                            className="btn btn-danger"
                            onClick={() => { props.setShowModal(false) }}
                        >Close</button>
                    </div>
                </div>
            </DialogTitle>
            <DialogContent>
                <label className="control-label">Bottom Limit</label>
                <input className="form-control chat-message-send"
                    type='number'
                    value={bottom_limit}
                    onChange={(e) => { setBottomLimit(e.target.value) }}
                    placeholder="Bottom Limit" style={{ width: "100%" }}></input>
                <label className="control-label">Top Limit</label>
                <input className="form-control chat-message-send mb-1"
                    type='number'
                    value={top_limit}
                    onChange={(e) => { setTopLimit(e.target.value) }}
                    placeholder="Bottom Limit" style={{ width: "100%" }}></input>
            </DialogContent>
        </Dialog>
    )
}
