'use client';
import { AuthorLink } from "@/components/AuthorLink";
import { LatestPrompts } from "@/components/LatestPrompts";
import { RecentHistory } from "@/components/RecentHistory";
import { RegisteredOnStory } from "@/components/RegisteredOnStory";
import { RemixBox } from "@/components/RemixBox";
import { ShareButton } from "@/components/ShareButton";
import { TypographyH2, TypographyH3 } from "@/components/ui/typography";
import { Cast } from "@/lib/types/cast.interface";
import { convertSupabaseDateToHumanReadable } from "@/lib/utils";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

export default function CastPage({ castId }: any) {
    const [cast, setCast] = useState<Cast | null>(null)
    const [castImage, setCastImage] = useState('');

    async function loadData(castId: number) {
        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + `/api/casts/` + castId);
        const result = await response.json();
        setCast(result.cast);
        setCastImage(result.castImage)
    }

    useEffect(() => {
        loadData(castId);
    }, [])

    if (cast) {
        return (
            <div className="p-4">
                <div className="p-8 pt-6 flex-1">
                    <TypographyH2>Artcast #{cast.id} <span className="text-gray-500">by {cast.farcaster_id} </span></TypographyH2>
                    <div className="mt-6">
                        <div className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 space-y-4">
                            <div className="flex gap-8 items-center">
                                <img className="w-[25%] max-w-[300px] h-auto rounded-md" src={castImage} alt="cast" />
                                <div>
                                    <TypographyH3>{cast.name}</TypographyH3>
                                    <p className="text-sm text-muted-foreground">Artcast #{cast.id} by <AuthorLink farcasterId={cast.farcaster_id} /></p>
                                    <p className="text-sm text-muted-foreground">Created on {convertSupabaseDateToHumanReadable(cast.created_at)}</p>

                                    <RegisteredOnStory storyExplorerUrl={cast.story_explorer_url} />

                                    <br />

                                    <ShareButton castId={cast.id}>
                                        <ArrowTopRightIcon className="w-6 me-2" /> Share on Farcaster
                                    </ShareButton>
                                </div>
                            </div>
                            <div className="grid gap-4 md:grd-cols-2 lg:grid-cols-4">
                                <div className="rounded-xl border bg-card text-card-foreground shadow">
                                    <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                                        <h3 className="tracking-tight text-sm font-medium">Prompt</h3>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="h-4 w-4 text-muted-foreground">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                                        </svg>
                                    </div>
                                    <div className="p-6 pt-0">
                                        {/* <div className="text-2xl font-bold">{cast.latest_prompts.length ? cast.latest_prompts[0].prompt_input : 'None!'}</div> */}
                                        <div className="text-lg leading-tight italic font-semibold">{cast.prompt_input ? cast.prompt_input : 'None!'}</div>
                                    </div>
                                </div>
                                <div className="rounded-xl border bg-card text-card-foreground shadow">
                                    <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                                        <h3 className="tracking-tight text-sm font-medium">Total Remixes</h3>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="h-4 w-4 text-muted-foreground">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
                                        </svg>
                                    </div>
                                    <div className="p-6 pt-0">
                                        <div className="text-2xl font-bold">{cast.num_total_derivatives}</div>
                                    </div>
                                </div>
                                <div className="rounded-xl border bg-card text-card-foreground shadow">
                                    <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                                        <h3 className="tracking-tight text-sm font-medium">Direct Remixes</h3>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="h-4 w-4 text-muted-foreground">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                        </svg>
                                    </div>
                                    <div className="p-6 pt-0">
                                        <div className="text-2xl font-bold">{cast.num_derivatives}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
                                <RecentHistory versions={cast.version_history}></RecentHistory>
                                <LatestPrompts versions={cast.latest_prompts}></LatestPrompts>
                            </div>
                            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
                                <RemixBox cast={cast} />
                                <img src="/helpful-diagram.png" alt="helpful diagram" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}