import { httpClient } from '@/libs/config/httpClient';
import { SignInCredentials, SignUpCredentials } from '@/libs/utils/types';

class AuthService {
  private static _instance: AuthService;

  constructor() {
    if (AuthService._instance) {
      throw new Error('Error: unable to created instance of AuthService because it exists already!');
    }
  }

  static get getInstance() {
    if (!AuthService._instance) {
      AuthService._instance = new AuthService();
    }

    return AuthService._instance;
  }

  public signIn = async (credentials: SignInCredentials) => {
    const { data } = await httpClient.post('/auth/sign-in', credentials);
    return data;
  };

  public signUp = async (credentials: SignUpCredentials) => {
    const { data } = await httpClient.post('/auth/sign-up', credentials);
    return data;
  };

  public fetchMe = async () => {
    const { data } = await httpClient.get('/auth/me');
    return data;
  };
}

export const authService = AuthService.getInstance;
