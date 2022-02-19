import { AdminUpload } from 'iglooform';
import { AdminUploadProps } from 'iglooform/es/admin-upload';
import { request, upload } from '@/utils/request';
import { FC } from 'react';
import { useModel } from 'umi';

export type FileImportProps = Omit<
  AdminUploadProps,
  'requestMethod' | 'uploadMethod'
>;

const FileImport: FC<FileImportProps> = (props) => {
  const { requestMethod } = useModel('@@qiankunStateFromMaster');
  return (
    <AdminUpload
      {...props}
      requestMethod={requestMethod}
      uploadMethod={upload}
    />
  );
};

export default FileImport;
