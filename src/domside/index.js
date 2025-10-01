export default function (parentClass) {
  return class extends parentClass {
    constructor(iRuntime) {
      super(iRuntime);
      const audioLoaderDomInstance = this;
      this.AddRuntimeMessageHandlers([
        ["load", (config) => this.PreInit(config)],
        [
          "unload",
          ([path, preload, nonBlocking, name, url]) =>
            this.PreInitLoadBank(path, preload, nonBlocking, name, url),
        ],
      ]);
      self.C3Html5AudioBuffer = class extends self.C3Html5AudioBuffer {
        constructor(...args) {
          super(...args);
        }
        Load() {
          return super.Load().then(() => {
            audioLoaderDomInstance.PostToRuntime("update-audio-loaded-status", [
              this.GetOriginalUrl(),
              true,
            ]);
          });
        }

        Release() {
          super.Release();
          audioLoaderDomInstance.PostToRuntime("update-audio-loaded-status", [
            this.GetOriginalUrl(),
            false,
          ]);
        }
      };

      self.C3WebAudioBuffer = class extends self.C3WebAudioBuffer {
        constructor(...args) {
          super(...args);
        }
        Load() {
          return super.Load().then(() => {
            audioLoaderDomInstance.PostToRuntime("update-audio-loaded-status", [
              this.GetOriginalUrl(),
              true,
            ]);
          });
        }

        Release() {
          super.Release();
          audioLoaderDomInstance.PostToRuntime("update-audio-loaded-status", [
            this.GetOriginalUrl(),
            false,
          ]);
        }
      };
    }
  };
}
