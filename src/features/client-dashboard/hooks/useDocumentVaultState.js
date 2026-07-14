import { useCallback, useState } from "react";
import { INITIAL_DOCUMENTS } from "../mock/mockDocuments";
import { readState, writeState } from "../utils/storage";

const STORAGE_KEY = "pathToMexico.clientDashboard.documents.v1";
const STORAGE_VERSION = 1;

function fileSizeLabel(bytes) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function fileTypeLabel(fileName) {
  const parts = fileName.split(".");
  if (parts.length < 2) return "FILE";
  return parts[parts.length - 1].toUpperCase();
}

// Mock storage only, per scope: uploading/replacing a document never reads
// or persists real file bytes, only the metadata a real upload endpoint
// would hand back (name, type, size, timestamp).
export function useDocumentVaultState() {
  const [documents, setDocuments] = useState(() => readState(STORAGE_KEY, STORAGE_VERSION, INITIAL_DOCUMENTS));

  const persist = useCallback((next) => {
    setDocuments(next);
    writeState(STORAGE_KEY, STORAGE_VERSION, next);
  }, []);

  const uploadDocument = useCallback(
    (documentId, file) => {
      if (!file) return;
      persist(
        documents.map((doc) =>
          doc.id === documentId
            ? {
                ...doc,
                name: file.name,
                status: "uploaded",
                uploadedDate: new Date().toISOString().slice(0, 10),
                fileType: fileTypeLabel(file.name),
                fileSizeLabel: fileSizeLabel(file.size),
              }
            : doc
        )
      );
    },
    [documents, persist]
  );

  return { documents, uploadDocument };
}
