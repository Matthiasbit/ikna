import { Height } from "@mui/icons-material"

export default function Header({text}) {
    return (
        <div style={{ width: '100%', height: '10vh', backgroundColor: 'red', left: 0 }}>
            {text}
        </div>
    );
}