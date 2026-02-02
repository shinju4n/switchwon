import { renderHook, waitFor, act } from '@testing-library/react';
import { useLogin } from './useLogin';
import { requestLoginApi } from '../_api/login.api';
import { toast } from 'sonner';
import { createWrapper } from '@/__tests__/utils/test-utils';
import { createLoginResponse, TEST_EMAIL } from '@/__tests__/utils/mock-data';

jest.mock('../_api/login.api');
jest.mock('sonner', () => ({
  toast: { success: jest.fn(), error: jest.fn() },
}));

const mockReplace = jest.fn();
const mockGet = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    replace: mockReplace,
    push: jest.fn(),
  }),
  useSearchParams: () => ({
    get: mockGet,
  }),
}));

const mockRequestLoginApi = requestLoginApi as jest.MockedFunction<
  typeof requestLoginApi
>;

/**
 * 로그인 테스트 헬퍼: 이메일 설정 + 로그인 요청
 */
const performLogin = async (result: {
  current: ReturnType<typeof useLogin>;
}) => {
  await act(async () => {
    result.current.loginForm.setValue('email', TEST_EMAIL);
  });
  await act(async () => {
    await result.current.requestLogin();
  });
};

describe('useLogin', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGet.mockReturnValue(null);
  });

  it('loginForm이 초기화됨', () => {
    const { Wrapper } = createWrapper();
    const { result } = renderHook(() => useLogin(), { wrapper: Wrapper });

    expect(result.current.loginForm).toBeDefined();
    expect(result.current.isPending).toBe(false);
  });

  it('로그인 성공 시 성공 토스트 표시', async () => {
    mockRequestLoginApi.mockResolvedValue(createLoginResponse());

    const { Wrapper } = createWrapper();
    const { result } = renderHook(() => useLogin(), { wrapper: Wrapper });

    await performLogin(result);

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('로그인 성공');
    });
  });

  it('로그인 성공 시 기본 경로로 리다이렉트', async () => {
    mockRequestLoginApi.mockResolvedValue(createLoginResponse());

    const { Wrapper } = createWrapper();
    const { result } = renderHook(() => useLogin(), { wrapper: Wrapper });

    await performLogin(result);

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith('/exchange');
    });
  });

  it('redirect 파라미터가 있으면 해당 경로로 리다이렉트', async () => {
    mockGet.mockReturnValue('/exchange-history');
    mockRequestLoginApi.mockResolvedValue(createLoginResponse());

    const { Wrapper } = createWrapper();
    const { result } = renderHook(() => useLogin(), { wrapper: Wrapper });

    await performLogin(result);

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith('/exchange-history');
    });
  });

  it('외부 URL redirect는 기본 경로로 대체됨 (Open Redirect 방지)', async () => {
    mockGet.mockReturnValue('https://malicious.com');
    mockRequestLoginApi.mockResolvedValue(createLoginResponse());

    const { Wrapper } = createWrapper();
    const { result } = renderHook(() => useLogin(), { wrapper: Wrapper });

    await performLogin(result);

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith('/exchange');
    });
  });

  it('// 로 시작하는 protocol-relative URL도 차단됨', async () => {
    mockGet.mockReturnValue('//malicious.com');
    mockRequestLoginApi.mockResolvedValue(createLoginResponse());

    const { Wrapper } = createWrapper();
    const { result } = renderHook(() => useLogin(), { wrapper: Wrapper });

    await performLogin(result);

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith('/exchange');
    });
  });

  it('로그인 실패 시 에러 토스트 표시', async () => {
    mockRequestLoginApi.mockRejectedValue(
      new Error('이메일을 찾을 수 없습니다')
    );

    const { Wrapper } = createWrapper();
    const { result } = renderHook(() => useLogin(), { wrapper: Wrapper });

    await act(async () => {
      result.current.loginForm.setValue('email', TEST_EMAIL);
    });

    await act(async () => {
      try {
        await result.current.requestLogin();
      } catch {
        // 에러 무시
      }
    });

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('이메일을 찾을 수 없습니다');
    });
  });
});
