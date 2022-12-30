import { getStorage, ref, uploadBytes, type UploadResult, getDownloadURL, deleteObject } from 'firebase/storage';
import fireBaseApp from '../index';
import * as Uuid from 'uuid';
import type { GCSUploadResult } from '../types';

const storage = getStorage(fireBaseApp);
const audioRef = ref(storage, 'audio/');

async function uploadAudio(file: File): Promise<GCSUploadResult> {
    const fileUniqueName: string = Uuid.v4();
    await uploadBytes(ref(audioRef, fileUniqueName), file);
    const srcUrl = await downloadAudioURL(fileUniqueName);
    return {
        address: fileUniqueName,
        srcUrl: srcUrl
    };
}

async function deleteAudio(address: string) {
    await deleteObject(ref(audioRef, address));
}

async function downloadAudioURL(address: string): Promise<string> {
    return await getDownloadURL(ref(audioRef, address));
}

export default {
    uploadAudio,
    downloadAudioURL,
    deleteAudio
}
