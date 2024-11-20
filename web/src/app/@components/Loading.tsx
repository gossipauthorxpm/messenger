import {LinearProgress} from "@mui/material";

export default function Loading() {
    return <div style={{
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
        height: "256px"
    }}>
        <LinearProgress />
    </div>
}