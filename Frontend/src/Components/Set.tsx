import { Sets } from "@/api/getSets";

type SetProps = {
    data: Sets;
}

export default function Set({data}: SetProps) {
    return (<span>{data.name}<br /><br /><br /><br /><br /><br /><br /><br /></span>);
}