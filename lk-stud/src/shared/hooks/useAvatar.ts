import { useEffect, useState, useRef } from "react"
import { useDispatch } from "react-redux"
import { getFileBlob } from "../../app/api/services/files-service"
import { setAvatarUrl } from "../../store/slices/profileSlice"
import type { AppDispatch } from "../../store/store"

interface CacheEntry {
    blob: Blob
    timestamp: number
}
const avatarCache: Record<string, CacheEntry> = {}
const CACHE_EXPIRY = 1000 * 60 * 15

interface UseAvatarUrlResult {
    url: string | undefined
    loading: boolean
    error: Error | null
}

export function useAvatarUrl(fileId?: string): UseAvatarUrlResult {
    const dispatch = useDispatch<AppDispatch>()
    const [state, setState] = useState<UseAvatarUrlResult>({
        url: undefined,
        loading: false,
        error: null
    })
    const objectUrlRef = useRef<string | undefined>(undefined)

    useEffect(() => {
        if (!fileId) {
            setState({ url: undefined, loading: false, error: null })
            dispatch(setAvatarUrl(null))
            return
        }

        const cached = avatarCache[fileId]
        if (cached && Date.now() - cached.timestamp < CACHE_EXPIRY) {
            const url = URL.createObjectURL(cached.blob)
            objectUrlRef.current = url
            setState({ url, loading: false, error: null })
            dispatch(setAvatarUrl(url))
            return
        }

        let isActive = true
        setState(s => ({ ...s, loading: true, error: null }))

        getFileBlob(fileId)
            .then(blob => {
                if (!isActive) return

                if (objectUrlRef.current) {
                    URL.revokeObjectURL(objectUrlRef.current)
                }

                avatarCache[fileId] = {
                    blob,
                    timestamp: Date.now()
                }

                const url = URL.createObjectURL(blob)
                objectUrlRef.current = url

                setState({ url, loading: false, error: null })
                dispatch(setAvatarUrl(url))
            })
            .catch(error => {
                if (!isActive) return
                console.error("Failed to load avatar:", error)
                setState({ url: undefined, loading: false, error })
                dispatch(setAvatarUrl(null))
            })

        return () => {
            isActive = false
            if (objectUrlRef.current) {
                URL.revokeObjectURL(objectUrlRef.current)
                objectUrlRef.current = undefined
            }
        }
    }, [fileId, dispatch])

    return state
}
