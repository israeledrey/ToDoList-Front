import MapComponent from '../MapComponent'
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';



const Map = ({onLocationSelect}) => {

    return (
        <Box>
            <Typography gutterBottom>Add location:</Typography>
            <MapComponent
                style={{ width: "100%", height: "150px" }}
                center={ [-118.2437, 34.0522]}
                zoom={15}
                mode="user"
                onLocationSelect={onLocationSelect}
            />
        </Box>

    )
}

export default Map