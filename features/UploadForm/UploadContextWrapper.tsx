interface UploadContextWrapperProps {
  children: JSX.Element | JSX.Element[];
}

export function UploadContextWrapper({
  children,
}: UploadContextWrapperProps): JSX.Element {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [refreshCallbacks, setRefreshCallbacks] = useState<Array<() => void>>(
    []
  );
  const [needsRefreshing, setNeedsRefreshing] = useState<boolean>(false);

  const generateUID = useMemo(getNewUIDGenerator, []);

  return (
    <UploadContext.Provider value={uploadManager}>
      <UploadFilesContext.Provider value={files}>
        {children}
      </UploadFilesContext.Provider>
    </UploadContext.Provider>
  );
}
