export default function UploadPdf({
  selectingFile,
  handleFileUpload,
  errorMessage,
  messageSuccess,
  fileList,
  handleFileDelete, 
}) {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl mb-4">Upload PDF</h2>
      <input
        type="file"
        accept="application/pdf"
        onChange={selectingFile}
        className="mb-4"
      />
      <button
        onClick={handleFileUpload}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Upload
      </button>

      {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
      {messageSuccess && (
        <p className="text-green-500 mt-4">{messageSuccess}</p>
      )}

      <div className="mt-6">
        {fileList.length > 0 ? (
          <ul className="list-disc list-inside">
            {fileList.map((file, index) => (
              <li
                key={index}
                className="flex items-center justify-between"
              ></li>
            ))}
          </ul>
        ) : (
          <p>No files uploaded yet.</p>
        )}
      </div>
    </div>
  );
}
