import  { useRef, useState, DragEvent } from "react";
import "./upload-file.component.css";
import { uploadFile } from "../../../app/api/services/files-service";
import { usePageTranslations } from "../../hooks/usePageTranslations";

interface FileUploadProps {
    label?: string;
    onFileSelect: (fileId: string | null) => void;
    accept?: string[];
    multiple?: boolean;
    t:ReturnType<typeof usePageTranslations>;
}

export const FileUploadComponent: React.FC<FileUploadProps> = ({
    label,
    onFileSelect,
    accept = ["image/*"],
    multiple = false,
    t
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isDragOver, setIsDragOver] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);

    label= t.uploadImage || t.uploadFile;

    const clearFile = () => {
        setPreview(null);
        onFileSelect(null);
        if (inputRef.current) inputRef.current.value = "";
    };

    const handleFiles = async (files: FileList | null) => {
        if (!files || files.length === 0) {
            clearFile();
            return;
        }
        const file = files[0];
        setUploading(true);
        const reader = new FileReader();
        reader.onload = () => setPreview(reader.result as string);
        reader.readAsDataURL(file);
        try {
            const res = await uploadFile(file);
            onFileSelect(res.id);
        } finally {
            setUploading(false);
        }
    };

    const openDialog = () => inputRef.current?.click();
    const onDragOver = (e: DragEvent) => { e.preventDefault(); setIsDragOver(true); };
    const onDragLeave = (e: DragEvent) => { e.preventDefault(); setIsDragOver(false); };
    const onDrop = (e: DragEvent) => { e.preventDefault(); setIsDragOver(false); handleFiles(e.dataTransfer.files); };

    return (
        <div
            className={`file-upload ${isDragOver ? "file-upload_drag" : ""} ${uploading ? "file-upload_disabled" : ""}`}
            onClick={openDialog}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
        >
            <input
                ref={inputRef}
                type="file"
                accept={accept.join(",")}
                multiple={multiple}
                style={{ display: "none" }}
                disabled={uploading}
                onChange={(e) => handleFiles(e.target.files)}
            />

            {preview ? (
                <div className="file-upload__preview-wrapper" onClick={(e) => e.stopPropagation()}>
                    <img src={preview} className="file-upload__preview" alt="preview" />
                    <button type="button" className="file-upload__remove" onClick={clearFile}>✕</button>
                </div>
            ) : (
                <div className="file-upload__text-block">
                    <div className="file-upload__icon">
                        <img src="/assets/svg/file/black/File_Img.svg" alt="" />
                    </div>
                    <div className="p1 file-upload__label">{uploading ? "Загрузка..." : label}</div>
                </div>
            )}
        </div>
    );
};
