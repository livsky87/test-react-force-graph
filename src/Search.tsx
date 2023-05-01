import { Box, Stack, TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import data from "./data.json"

export default ({SelectHandler}: {SelectHandler : (_:any, value:any) => void}) => {
    return(
        <Box margin={2} bgcolor={"whitesmoke"} borderRadius={2}>
            <Stack spacing={2}>
                <Autocomplete
                    freeSolo
                    fullWidth
                    onChange={SelectHandler}
                    id="free-solo-2-demo"
                    disableClearable
                    options={data.nodes.map((node) => node.id)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Search input"
                            InputProps={{
                                ...params.InputProps,
                                type: 'search',
                            }}
                        />
                    )}
                />
            </Stack>
        </Box>
    )
}