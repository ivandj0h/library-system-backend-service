declare module "mock-fs" {
  function mock(config?: any): void;
  namespace mock {
    function restore(): void;
  }
  export default mock;
}
