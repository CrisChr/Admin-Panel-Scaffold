import { RequestMethod, ResponseError } from 'umi-request';
import { notification } from 'antd';

let logout: () => void;

export const errorHandler = async (error: ResponseError) => {
  const { response } = error;

  let rst: any;
  if (response && response.status) {
    const { status } = response;
    try {
      rst = await response.json();
    } catch {
      rst = null;
      console.log('non-json response');
    }

    if (status === 401) {
      logout();
    }
  }
  rst?.error === 'record not found'
    ? notification.error({
        message: rst?.error,
      })
    : rst?.status !== 403 &&
      notification.error({
        message: rst?.message || rst?.msg || 'No response from server.',
      });

  throw rst;
};

type UploadMethod = (
  dataSource: string,
  file: File,
  enableApiAuth: boolean,
  onProgress: (e: ProgressEvent) => void,
) => {
  resend: () => void;
  abort: () => void;
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
  logoutProp: () => void,
) => {
  request = requestProp;
  upload = uploadProp;
  logout = logoutProp;
};
