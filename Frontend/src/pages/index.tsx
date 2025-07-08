import { useRouter } from "next/navigation";

export default function Index() {
    const router = useRouter();

    router.replace("homepage");
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