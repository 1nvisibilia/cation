export type Provider = 'gcs';

export type Track = {
    name: string,
    provider: Provider,
    address: string,
    srcUrl: string | null,
    snapshotHash: string
};

export type User = {
    id: string,
    name: string
    playlist: Array<Track> | null,
};

export type GCSUploadResult = {
    address: string,
    srcUrl: string | null
};

export type AuthData = {
    id: string,
    name: string | null,
    avatarURL: string | null
};
