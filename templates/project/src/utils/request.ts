import { RequestMethod } from 'umi-request';

type UploadMethod = (
  dataSource: string,
  file: File,
  enableApiAuth: boolean,
  onProgess: (e: ProgressEvent) => any,
) => {
  resend: () => any;
  abort: () => any;
  result: Promise<{
    success: boolean;
    errorMessage?: string;
  }>;
};

export let request: RequestMethod;

export let upload: UploadMethod = () => ({
  resend: () => Promise.resolve(''),
  abort: () => Promise.resolve(''),
  result: Promise.resolve({
    success: true,
  }),
});

export const updateRequest = (
  requestProp: RequestMethod,
  uploadProp: UploadMethod,
) => {
  request = requestProp;
  upload = uploadProp;
};
