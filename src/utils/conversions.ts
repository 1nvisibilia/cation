import type { Track } from "@/firebase-service/types";

export function nameObjectToFlatArray(tracks: Track[]): Track[] {
    for (const key in tracks) {
        tracks[key].snapshotHash = key;
    }
    return Object.values(tracks);
}
