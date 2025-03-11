import MapComponent from '../MapComponent'
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';



const DialogMap = () => {



    return (
        <Box>
            <Typography gutterBottom>Add location:</Typography>
            <MapComponent
                style={{ width: "100%", height: "150px" }}
                center={ [-118.2437, 34.0522]}
                zoom={15}
                mode="user"
                // onLocationSelect={handleLocationSelect}
            />
        </Box>

    )
}

export default DialogMap