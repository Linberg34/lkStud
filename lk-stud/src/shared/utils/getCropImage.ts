export async function getCroppedImg(
    imageSrc: string,
    pixelCrop: { x: number; y: number; width: number; height: number }
): Promise<Blob> {
    const image = await new Promise<HTMLImageElement>((res, rej) => {
        const img = new Image()
        img.src = imageSrc
        img.onload = () => res(img)
        img.onerror = rej
    })
    const canvas = document.createElement("canvas")
    canvas.width = pixelCrop.width
    canvas.height = pixelCrop.height
    const ctx = canvas.getContext("2d")!
    ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
    )
    return await new Promise<Blob>((res) =>
        canvas.toBlob((b) => b && res(b), "image/jpeg")
    )
}
