
import * as React from "react";


interface ImageUploadProps {
    selectedFile: File | undefined;
    setSelectedFile: (file: File | undefined) => void;
    previewImage: string | undefined;
    setPreviewImage: (url: string | undefined) => void;
}

export const ImageUpload = ({
                                setSelectedFile,
                                previewImage,
                                setPreviewImage,
                            }: ImageUploadProps) => {

    const selectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const MAX_SIZE_MB = 1;
        if (file.size > MAX_SIZE_MB * 1024 * 1024) {
            alert("Image must be 1MB or less");
            event.target.value = "";
            return;
        }

        setSelectedFile(file);
        setPreviewImage(URL.createObjectURL(file));
    };

    return (
        <div>
            <label className="border-2 shadow-md bg-[#3185FC] text-white p-0.5 m-2 cursor-pointer rounded-full w-32 text-center">
                Select Image
                <input
                    type="file"
                    accept="image/png"
                    onChange={selectImage}
                    style={{ display: "none" }}
                />
            </label>

            {previewImage && (
                <div className="max-h-32 max-w-32 m-1 mb-5">
                    <label>Preview:
                        <img
                            src={previewImage}
                            alt="Preview"
                            className="object-contain max-h-32 max-w-32"
                        />
                    </label>
                </div>
            )}
        </div>
    );
};
