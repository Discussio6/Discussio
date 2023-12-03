import React from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";

interface DropzoneProps {
	onDrop: (acceptedFiles: File[]) => void;
	dropzoneOptions?: DropzoneOptions;
	idleText?: string;
	dragActiveText?: string;
}

function Dropzone({
	onDrop,
	dropzoneOptions,
	idleText,
	dragActiveText,
}: DropzoneProps) {
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		...dropzoneOptions,
		onDrop,
	});

	return (
		<div {...getRootProps()}>
			<input {...getInputProps()} />
			<div
				className={`flex flex-col gap-2 justify-center items-center transition-all duration-150 min-h-[200px] border-2 border-dashed cursor-pointer text-slate-500 rounded-lg ${
					isDragActive ? "bg-blue-100" : ""
				}`}
			>
				{isDragActive ? (
					<p>{dragActiveText ?? "Drop the files here"}</p>
				) : (
					<p>
						{idleText ??
							"Drag 'n' drop some files here, or click to select files"}
					</p>
				)}
			</div>
		</div>
	);
}

export default Dropzone;
