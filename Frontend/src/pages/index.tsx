import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Index() {
    const router = useRouter();

    useEffect(() => {
        if (router) {
            router.replace("homepage");
        }
    }, [router]);
    return (
        <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                width: '100vw'
            }}>
            Weiterleitung...
        </div>
    );
}