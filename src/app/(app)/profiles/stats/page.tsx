import { Suspense } from "react";

import Loading from "@/app/loading";
import { getProfiles } from "@/lib/api/profiles/queries";

import { checkAuth } from "@/lib/auth/utils";
import { ProfileStats } from "@/components/profiles/ProfileStats";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";

export const revalidate = 0;

export default async function ProfilesStatsPage() {
    return (
        <main>
            <div className="relative">
                <Link href={"/profiles"}>
                    <Button variant={"outline"}>
                        <ChevronLeftIcon />
                    </Button>
                </Link>
                <div className="flex justify-between">
                    <h1 className="font-semibold text-2xl my-2">Estadisticas</h1>
                </div>
                <Profiles />
            </div>
        </main>
    );
}

const Profiles = async () => {
    await checkAuth();

    const { profiles } = await getProfiles();

    return (
        <Suspense fallback={<Loading />}>
            <ProfileStats profiles={profiles} />
        </Suspense>
    );
};
