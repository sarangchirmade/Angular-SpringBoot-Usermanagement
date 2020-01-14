export const GlobalConstant = {
  USER_URL: 'users',
  ROLE_URL: 'role'
};

export class GlobalFunction {
  static getHeader() {
    return {
      headers: { 'Content-Type': 'application/json' }
    };
  }
}
