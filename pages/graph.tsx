import Search from "@/src/Search"
import ForceGraph from "@/src/ForceGraph"
import { Grid } from "@mui/material"
import { useState } from "react"
import data from "../src/data.json"

export default () => {
    const [selected, setSelected] = useState(undefined)
    const [targets, setTargets] = useState<Array<string>>([])

    const SelectHandler = (_:any, value:any) => {
        const targets = Array<string>();
        data.links.forEach((link:any) => {
            if (link.source.id == value) {
                targets.push(link.target.id)
            }
        })

        setSelected(value)
        setTargets(targets)
    }

    return (
        <Grid container>
            <Grid item xs={6}>
                <Search SelectHandler={SelectHandler} />
            </Grid>

            <Grid item xs={6}>
                <ForceGraph selected={selected} targets={targets}/>
            </Grid>
        </Grid>
    )
}