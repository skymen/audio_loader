export default function (parentClass) {
  return class extends parentClass {
    constructor(iRuntime) {
      super(iRuntime);

      this.AddRuntimeMessageHandlers([
        ["load", (config) => this.PreInit(config)],
        [
          "unload",
          ([path, preload, nonBlocking, name, url]) =>
            this.PreInitLoadBank(path, preload, nonBlocking, name, url),
        ],
      ]);
    }
  };
}
