import React, { useRef, useState, DragEvent } from "react";
import "./upload-file.component.css";

interface FileUploadProps {
    label?: string;
    onFileSelect: (file: File | null) => void;
    accept?: string[];
    multiple?: boolean;
}

export const FileUploadComponent: React.FC<FileUploadProps> = ({
    label = "Загрузить изображение",
    onFileSelect,
    accept = ["image/*"],
    multiple = false,
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isDragOver, setIsDragOver] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);

    const openDialog = () => inputRef.current?.click();

    const handleFiles = (files: FileList | null) => {
        if (!files || files.length === 0) return onFileSelect(null);
        const file = multiple ? files[0] : files[0]; 
        onFileSelect(file);
        if (file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = () => setPreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const onDragOver = (e: DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    };
    const onDragLeave = (e: DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
    };
    const onDrop = (e: DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        handleFiles(e.dataTransfer.files);
    };

    return (
        <div
            className={`file-upload ${isDragOver ? "file-upload_drag" : ""}`}
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
                onChange={(e) => handleFiles(e.target.files)}
            />

            {preview ? (
                <img src={preview} className="file-upload__preview"  />
            ) : (
                <div className="file-upload__text-block">
                    <div className="file-upload__icon">
                        <img src="/assets/svg/file/black/File_Img.svg" />
                    </div>
                    <div className="p1 file-upload__label">{label}</div>
                </div>
            )}
        </div>
    );
};
