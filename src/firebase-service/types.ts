export type Provider = 'gcs';

export type Track = {
    name: string,
    provider: Provider,
    address: string
};

export type User = {
    id: string,
    name: string
    playlist: Array<Track> | null,
};

