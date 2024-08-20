import Link from 'next/link'
import { Button } from "@/components/ui/button";


export default function NotFound() {
    return (
        <div className="flex items-center justify-center h-screen text-center">
            <div>
                <h1 className="text-4xl font-bold mb-4">404 - Página no encontrada</h1>
                <Button>
                    <Link href="/">Return Home</Link>
                </Button>
            </div>
        </div>
    )
}