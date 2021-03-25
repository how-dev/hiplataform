import React, { useState } from "react";
import Toggle from "../toggle";
import newData from "../../data/formatData/index";
import { TextField } from "@material-ui/core";

import "./index.css";

const Card: React.FC = () => {
    const [searchInput, setSearchInput] = useState("");

    const handleSearch = (e: any) => {
        setSearchInput(e.target.value);
    };

    let arr = newData
    return (
        <div className="Content">
            <div className="SearchBox">
                <TextField
                    value={searchInput}
                    onChange={handleSearch}
                    variant="outlined"
                    margin="dense"
                    label="Pesquise aqui..."
                />
            </div>
            <div className="TheCard">

                {searchInput ?
                    newData.filter((elt: any) => elt.name?.toLowerCase().includes(searchInput.toLowerCase()))
                        .map((elt, index: number) => <Toggle key={index} dataProp={arr} index={index} userID={elt.id} label={elt.name} children={newData}/>)
                    :
                    newData.map((elt, index: number) => <Toggle key={index} dataProp={arr} index={index} userID={elt.id} label={elt.name} children={newData}/>)
                }
            </div>
        </div>

    )
}

export default Card;
