import { getStorage, ref, uploadBytes, type UploadResult, getDownloadURL } from 'firebase/storage';
import fireBaseApp from '../index';
import * as Uuid from 'uuid';

const storage = getStorage(fireBaseApp);
const audioRef = ref(storage, 'audio/');

async function uploadAudio(file: File): Promise<string> {
    const fileUniqueName: string = Uuid.v4();
    await uploadBytes(ref(audioRef, fileUniqueName), file);
    return fileUniqueName;
}

async function downloadAudioURL(address: string): Promise<string> {
    return await getDownloadURL(ref(audioRef, address));
}

export default {
    uploadAudio,
    downloadAudioURL
}
