"use client";
import { useCallback, useState } from "react";
import { Upload, Download, FileText, X, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import Papa from "papaparse";
import { useDropzone } from "react-dropzone";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const TEN_MEGA_BYTES = 10485760;

function DownloadTemplateButton() {
  const downloadTemplate = () => {
    const csvContent =
      "name,email,phone,type\nJohn Doe,john@example.com,+1234567890,email\nJane Smith,jane@example.com,+0987654321,sms\nMike Johnson,mike@example.com,+1122334455,email";
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "contacts_template.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <Button
      variant="outline"
      onClick={downloadTemplate}
      size="sm"
      className="gap-2"
    >
      <Download className="h-4 w-4" />
      Download Template
    </Button>
  );
}

interface UploadedFileProps {
  file: File;
  onRemoveFile: () => void;
}

function UploadedFile({ file, onRemoveFile }: UploadedFileProps) {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <Card className="border-green-200 bg-green-50/50">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-full">
              <CheckCircle className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <p className="font-medium text-green-900">{file.name}</p>
              <p className="text-sm text-green-700">
                {formatFileSize(file.size)} • Ready to import
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onRemoveFile}
            className="text-green-700 hover:text-green-900 hover:bg-green-100"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function BulkImportContactForm() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [pasrsedContacts, setParsedContacts] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    if (rejectedFiles.length > 0) {
      const rejection = rejectedFiles[0];

      if (rejection.errors.some((e: any) => e.code === "file-too-large")) {
        toast.error("File is too large");
      } else if (
        rejection.errors.some((e: any) => e.code === "file-invalid-type")
      ) {
        toast.error("Invalid file type");
      } else {
        toast.error("Upload failed");
      }
      return;
    }

    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setUploadedFile(file);

      Papa.parse<File>(file, {
        header: true,
        skipEmptyLines: true,
        transformHeader: (header: string) => header.trim().toLowerCase(),
        transform: (value: string) => value.trim(),
        complete: (results) => {
          const errors = results.errors;
          const data = results.data;

          if (errors.length > 0) {
            errors.forEach((err) => {
              toast.error(`CSV Parsing Error`, {
                description: `Row ${err.row}: ${err.message}`,
              });
            });
          }

          if (data.length > 0) {
            setParsedContacts(data);
          }
        },
      });
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
      "application/vnd.ms-excel": [".csv"],
    },
    maxFiles: 1,
    maxSize: TEN_MEGA_BYTES,
  });

  const removeFile = () => {
    setUploadedFile(null);
  };

  const resetForm = () => {
    removeFile();
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Bulk Import Contacts
          </CardTitle>
          <CardDescription>
            Upload a CSV file to import multiple contacts at once. Download our
            template to get started.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {!uploadedFile ? (
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 cursor-pointer
                ${
                  isDragActive
                    ? "border-primary bg-primary/5 scale-[1.02]"
                    : "border-muted-foreground/25 hover:border-muted-foreground/50 hover:bg-muted/20"
                }`}
            >
              <div className="flex flex-col items-center gap-4">
                <div
                  className={`p-4 rounded-full transition-colors ${
                    isDragActive ? "bg-primary/10" : "bg-muted"
                  }`}
                >
                  <FileText
                    className={`h-8 w-8 ${
                      isDragActive ? "text-primary" : "text-muted-foreground"
                    }`}
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-lg font-medium">
                    {isDragActive
                      ? "Drop your CSV file here"
                      : "Drop your CSV file here"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    or click to browse files (max 10MB)
                  </p>
                </div>
                <Input
                  {...getInputProps()}
                  id="csv-upload"
                  type="file"
                  accept=".csv"
                  className="sr-only"
                />
                <Button variant="outline" type="button" size="sm">
                  Browse Files
                </Button>
              </div>
            </div>
          ) : (
            <UploadedFile file={uploadedFile} onRemoveFile={removeFile} />
          )}

          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
            <div>
              <p className="font-medium">Need a template?</p>
              <p className="text-sm text-muted-foreground">
                Download our CSV template with the correct format
              </p>
            </div>

            <DownloadTemplateButton />
          </div>
        </CardContent>{" "}
      </Card>

      <div className="flex justify-end space-x-3">
        <Button type="button" variant="outline" onClick={resetForm}>
          Reset
        </Button>
        <Button disabled={!uploadedFile} className="gap-2 min-w-[140px]">
          <Upload className="h-4 w-4" />
          Import Contacts
        </Button>
      </div>
    </div>
  );
}

export { BulkImportContactForm };
