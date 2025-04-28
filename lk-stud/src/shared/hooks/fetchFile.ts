import { useState, useEffect } from 'react';
import { getFileBlob } from '../../app/api/services/files-service';

export function useFileBlob(
    fileId: string
): { blobUrl: string | null; loading: boolean; error: Error | null } {
    const [blobUrl, setBlobUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!fileId) {
            setBlobUrl(null);
            return;
        }

        let isCancelled = false;

        async function fetchBlob() {
            setLoading(true);
            setError(null);
            try {
                const blob = await getFileBlob(fileId);
                const url = URL.createObjectURL(blob);
                if (!isCancelled) {
                    setBlobUrl(url);
                } else {
                    URL.revokeObjectURL(url);
                }
            } catch (err) {
                if (!isCancelled) {
                    setError(err as Error);
                }
            } finally {
                if (!isCancelled) {
                    setLoading(false);
                }
            }
        }

        fetchBlob();

        return () => {
            isCancelled = true;
            if (blobUrl) {
                URL.revokeObjectURL(blobUrl);
            }
        };
    }, [fileId]);

    return { blobUrl, loading, error };
}